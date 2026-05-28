"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Loader2 } from "lucide-react";
import Link from "next/link";

import { newVerification } from "@/lib/actions/new-verification";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";

export default function NewVerificationPage() {
 const [error, setError] = useState<string | undefined>();
 const [success, setSuccess] = useState<string | undefined>();

 const searchParams = useSearchParams();
 const token = searchParams.get("token");

 const onSubmit = useCallback(() => {
 if (success || error) return;

 if (!token) {
 setError("Missing token!");
 return;
 }

 newVerification(token)
 .then((data) => {
 setSuccess(data.success);
 setError(data.error);
 })
 .catch(() => {
 setError("Something went wrong!");
 });
 }, [token, success, error]);

 useEffect(() => {
 onSubmit();
 }, [onSubmit]);

 return (
 <div className="min-h-screen pt-24 pb-20 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5 }}
 className="w-full max-w-md mx-4"
 >
 <div className="text-center mb-8">
 <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-2xl mb-4 shadow-lg shadow-primary/20">
 <BookOpen className="w-8 h-8" />
 </div>
 <h1 className="text-3xl font-bold text-primary">Verification</h1>
 <p className="text-gray-500 mt-2">Confirming your email address</p>
 </div>

 <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col items-center justify-center">
 {!success && !error && (
 <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
 )}
 
 <FormSuccess message={success} />
 {!success && <FormError message={error} />}
 
 <div className="mt-8 w-full">
 <Link 
 href="/sign-in" 
 className="block w-full text-center py-3 bg-primary text-white rounded-full font-medium hover:bg-black transition-colors"
 >
 Back to Sign In
 </Link>
 </div>
 </div>
 </motion.div>
 </div>
 );
}
