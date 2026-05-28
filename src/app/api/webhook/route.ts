import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEbookEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-paystack-signature");
    const secret = process.env.PAYSTACK_SECRET_KEY;

    if (!secret) {
      console.error("PAYSTACK_SECRET_KEY is not defined");
      return NextResponse.json({ error: "Configuration error" }, { status: 500 });
    }

    // 1. Verify Paystack Signature
    const hash = crypto
      .createHmac("sha512", secret)
      .update(body)
      .digest("hex");

    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);

    // 2. Handle 'charge.success' event
    if (event.event === "charge.success") {
      const { reference, customer } = event.data;
      const orderId = reference;

      // 3. Retrieve order and items
      const order = await db.order.findUnique({
        where: { id: orderId },
        include: {
          items: {
            include: { book: true },
          },
        },
      });

      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      if (order.status === "COMPLETED") {
        return NextResponse.json({ message: "Order already processed" }, { status: 200 });
      }

      // 4. Update Order Status
      await db.order.update({
        where: { id: orderId },
        data: { status: "COMPLETED" },
      });

      // 5. Add books to User's Library
      const libraryPromises = order.items.map((item) =>
        db.userBook.upsert({
          where: {
            userId_bookId: {
              userId: order.userId,
              bookId: item.bookId,
            },
          },
          update: {
            lastRead: new Date(),
          },
          create: {
            userId: order.userId,
            bookId: item.bookId,
            progress: 0,
          },
        })
      );

      await Promise.all(libraryPromises);

      // 6. Clear User's Cart
      await db.cart.deleteMany({
        where: { userId: order.userId }
      });

      // 7. Send Fulfillment Email
      const emailItems = order.items.map(item => ({
        id: item.book.id,
        title: item.book.title,
        author: item.book.author,
        price: item.price,
        coverImage: item.book.coverImage
      }));

      await sendEbookEmail(customer.email, order.id, emailItems);

      return NextResponse.json({ received: true, message: "Order fulfilled" }, { status: 200 });
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 400 });
  }
}
