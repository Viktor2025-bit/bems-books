import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const cart = await db.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: { book: true },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const subtotal = cart.items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const totalAmount = subtotal + tax;

    // 1. Create a PENDING order in the database
    const order = await db.order.create({
      data: {
        userId: session.user.id,
        totalAmount,
        status: "PENDING",
        items: {
          create: cart.items.map((item) => ({
            bookId: item.bookId,
            price: item.book.price,
          })),
        },
      },
    });

    // Paystack expects amount in kobo (amount * 100)
    return NextResponse.json({ 
      amount: Math.round(totalAmount * 100),
      email: session.user.email,
      reference: order.id // Using the Order ID as the Paystack reference
    });
  } catch (error) {
    console.error("Paystack Checkout Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
