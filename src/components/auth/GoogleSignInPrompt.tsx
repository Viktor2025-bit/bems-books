"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export function GoogleSignInPrompt() {
  const { data: session, status } = useSession();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Show prompt after a short delay if user is not logged in
    if (status === "unauthenticated") {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSignIn = () => {
    signIn("google", { callbackUrl: window.location.href });
  };

  if (status !== "unauthenticated") return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: 20 }}
          className="fixed top-24 right-4 z-[60] w-full max-w-sm"
        >
          <div className="bg-white dark:bg-slate-900 border border-border shadow-2xl rounded-2xl p-5 relative overflow-hidden group">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />
            
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 border border-border">
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                  />
                </svg>
              </div>
              
              <div className="flex-1 pr-6">
                <h3 className="font-bold text-lg text-primary mb-1">Sign in with Google</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Quickly sign in to save your books, wishlist, and track your reading progress.
                </p>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSignIn}
                    className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                  >
                    Continue
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsVisible(false)}
                    className="rounded-full"
                  >
                    Maybe later
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
