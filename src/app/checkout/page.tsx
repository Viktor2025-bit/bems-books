"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShieldCheck, ChevronLeft } from "lucide-react";
import { useCart } from "@/store/useCart";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useSession } from "next-auth/react";
import { processDemoPurchase } from "@/lib/actions/checkout";
import { useRouter } from "next/navigation";
import PaystackPop from "@paystack/inline-js";

export default function CheckoutPage() {
  const { data: session } = useSession();
  const { items, getCartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState("");
  const router = useRouter();

  const total = getCartTotal();
  const tax = total * 0.08; // 8% mock tax
  const finalTotal = total + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      setError("Please sign in to complete your purchase.");
      router.push("/sign-in?callbackUrl=/checkout");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      // 1. Get payment details from our backend
      const response = await fetch("/api/checkout", { method: "POST" });
      const { amount, email, reference } = await response.json();

      // 2. Initialize Paystack
      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
        amount,
        email,
        reference,
        onSuccess: async (transaction: any) => {
          // 3. Process the successful purchase in our database
          const result = await processDemoPurchase(items);
          if (result.error) {
            setError(result.error);
            setIsProcessing(false);
          } else {
            setIsSuccess(true);
            clearCart();
          }
        },
        onCancel: () => {
          setIsProcessing(false);
          setError("Payment cancelled.");
        },
      });

    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      // ... (success UI remains the same)
      <div className="pt-32 pb-20 min-h-screen container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-highlight/20 text-highlight rounded-full flex items-center justify-center mb-6">
          <Check className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold font-jost mb-4">Payment Successful!</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-lg">
          Thank you for your purchase. Your e-books have been added to your library and are ready to read.
        </p>
        <div className="flex gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="rounded-full">Go to My Library</Button>
          </Link>
          <Link href="/catalog">
            <Button variant="outline" size="lg" className="rounded-full">Continue Browsing</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    // ... (form structure)
    <div className="pt-32 pb-20 min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/catalog" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Shopping
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl font-bold font-jost mb-8">Secure Checkout</h1>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              {/* Contact Info */}
              <section>
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email address *</label>
                    <Input 
                      type="email" 
                      placeholder="Where should we send your e-books?" 
                      defaultValue={session?.user?.email || ""}
                      disabled={!!session}
                      required 
                    />
                  </div>
                </div>
              </section>

              <Button
                type="submit"
                size="lg"
                className="w-full text-lg rounded-full shadow-lg"
                isLoading={isProcessing}
                disabled={items.length === 0 || isProcessing}
              >
                {isProcessing ? "Processing..." : `Complete Purchase - $${finalTotal.toFixed(2)}`}
              </Button>
              
              <p className="flex items-center justify-center text-sm text-gray-500 mt-4 gap-2">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                Payments are securely processed by Paystack.
              </p>
            </form>
          </div>
          {/* ... (Order Summary) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-32">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-6 mb-6 max-h-96 overflow-y-auto pr-2">
                {items.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-16 h-24 rounded shadow-sm overflow-hidden flex-shrink-0">
                        <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                        <p className="text-sm text-gray-500 mb-1">{item.author}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="pt-6 border-t border-gray-100 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-100 text-primary">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
