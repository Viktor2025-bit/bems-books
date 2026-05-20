"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingCart, Search, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCart } from "@/store/useCart";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { items, setIsOpen } = useCart();
  
  // Calculate total items in cart
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-xl">
              B
            </div>
            <span className="text-2xl font-bold tracking-tight text-primary">
              Bems Books
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="group relative text-gray-600 hover:text-primary font-medium transition-colors">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/catalog" className="group relative text-gray-600 hover:text-primary font-medium transition-colors">
              Catalog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/bestsellers" className="group relative text-gray-600 hover:text-primary font-medium transition-colors">
              Bestsellers
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/authors" className="group relative text-gray-600 hover:text-primary font-medium transition-colors">
              Authors
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex relative w-64">
              <Input
                type="text"
                placeholder="Search books, authors..."
                className="pl-10 rounded-full bg-gray-50/50"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            
            <Button variant="ghost" size="icon" className="relative hidden sm:flex">
              <User className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(true)}>
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-highlight text-[10px] font-bold text-white rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Global Cart Drawer */}
      <CartDrawer />
    </>
  );
}
