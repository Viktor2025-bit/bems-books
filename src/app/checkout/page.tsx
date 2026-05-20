"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShieldCheck, ChevronLeft } from "lucide-react";
import { useCart } from "@/store/useCart";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function CheckoutPage() {
  const { items, getCartTotal } = useCart();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const total = getCartTotal();
  const tax = total * 0.08; // 8% mock tax
  const finalTotal = total + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Mock Stripe processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="pt-32 pb-20 min-h-screen container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-highlight/20 text-highlight rounded-full flex items-center justify-center mb-6">
          <Check className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold font-jost mb-4">Payment Successful!</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-lg">
          Thank you for your purchase. We are securely generating your e-book download links and emailing them to you right now.
        </p>
        <Link href="/catalog">
          <Button size="lg" className="rounded-full">Continue Browsing</Button>
        </Link>
      </div>
    );
  }

  return (
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
            
            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              {/* Contact Info */}
              <section>
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email address *</label>
                    <Input type="email" placeholder="Where should we send your e-books?" required />
                  </div>
                </div>
              </section>

              {/* Payment Info */}
              <section className="pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold mb-4">Payment Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Information *</label>
                    {/* Placeholder for Stripe Element */}
                    <div className="w-full h-10 rounded-md border border-gray-300 bg-gray-50 flex items-center px-3 text-gray-400 text-sm">
                      Stripe Card Element will load here
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <Input type="text" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                      <Input type="text" placeholder="123" />
                    </div>
                  </div>
                </div>
              </section>

              <Button
                type="submit"
                size="lg"
                className="w-full text-lg rounded-full shadow-lg"
                isLoading={isProcessing}
                disabled={items.length === 0}
              >
                {isProcessing ? "Processing..." : `Pay $${finalTotal.toFixed(2)}`}
              </Button>
              
              <p className="flex items-center justify-center text-sm text-gray-500 mt-4 gap-2">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                Payments are securely processed by Stripe.
              </p>
            </form>
          </div>

          {/* Order Summary */}
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
                        <Image src={item.cover} alt={item.title} fill className="object-cover" />
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
