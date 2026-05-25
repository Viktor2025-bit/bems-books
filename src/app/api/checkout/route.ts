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

    const amount = cart.items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

    // Paystack expects amount in kobo/pesewas (amount * 100)
    // We return the amount and email to the frontend to initialize the payment
    return NextResponse.json({ 
      amount: Math.round(amount * 100),
      email: session.user.email,
      reference: `BEMS-${Date.now()}`
    });
  } catch (error) {
    console.error("Paystack Checkout Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
