import { NextResponse } from "next/server";
import { sendEbookEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    // In a real app, this would be a webhook payload from Stripe
    // We would use stripe.webhooks.constructEvent to verify the signature
    const payload = await req.json();
    
    // Mock handling of the 'checkout.session.completed' event
    if (payload.type === "checkout.session.completed") {
      const { email, orderId, items } = payload.data;
      
      // Send the e-books via email
      await sendEbookEmail(email, orderId, items);

      return NextResponse.json({ received: true, message: "E-books dispatched" }, { status: 200 });
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 400 });
  }
}
