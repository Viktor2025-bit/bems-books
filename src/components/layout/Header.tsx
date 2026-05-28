"use client";

import * as React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ShoppingCart, Search, Menu, User, Heart, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCart } from "@/store/useCart";
import { useWishlist } from "@/store/useWishlist";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WishlistDrawer } from "@/components/wishlist/WishlistDrawer";
import { useTheme } from "next-themes";

export function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [mounted, setMounted] = React.useState(false);
  const { items, setIsOpen } = useCart();
  const { items: wishlistItems, setIsOpen: setWishlistOpen } = useWishlist();
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  React.useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/catalog");
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-bookzen ${
          isScrolled
            ? "bg-background shadow-sm border-b border-border py-3"
            : "bg-background py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl font-bold tracking-tight text-primary">
              Bems Books
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-primary hover:text-brand-primary font-medium transition-colors">
              Home
            </Link>
            <Link href="/catalog" className="text-primary hover:text-brand-primary font-medium transition-colors">
              Catalog
            </Link>
            <Link href="/bestsellers" className="text-primary hover:text-brand-primary font-medium transition-colors">
              Bestsellers
            </Link>
            <Link href="/authors" className="text-primary hover:text-brand-primary font-medium transition-colors">
              Authors
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <form onSubmit={handleSearch} className="hidden lg:flex relative w-72">
              <Input
                type="text"
                placeholder="Search books, authors..."
                className="pl-10 rounded-bookzen bg-bg-secondary text-primary border-none focus-visible:ring-1 focus-visible:ring-brand-primary placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute left-3 top-2.5">
                <Search className="w-5 h-5 text-muted-foreground" />
              </button>
            </form>
            
            {/* Theme Toggle */}
            {mounted && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-primary hover:text-brand-primary hover:bg-transparent" 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            )}
            
            {/* Auth-aware User Button */}
            {session?.user ? (
              <Link href="/dashboard">
                <div className="w-9 h-9 bg-brand-primary rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:bg-opacity-90 transition-bookzen shadow-sm">
                  {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              </Link>
            ) : (
              <Link href="/sign-in">
                <Button variant="ghost" size="icon" className="relative hidden sm:flex text-primary hover:text-brand-primary hover:bg-transparent">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            )}

            {/* Wishlist Button */}
            <Button variant="ghost" size="icon" className="relative text-primary hover:text-brand-primary hover:bg-transparent" onClick={() => setWishlistOpen(true)}>
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-brand-primary text-[10px] font-bold text-white rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Button>

            {/* Cart Button */}
            <Button variant="ghost" size="icon" className="relative text-primary hover:text-brand-primary hover:bg-transparent" onClick={() => setIsOpen(true)}>
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-brand-primary text-[10px] font-bold text-white rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden text-primary hover:text-brand-primary hover:bg-transparent">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Global Drawers */}
      <CartDrawer />
      <WishlistDrawer />
    </>
  );
}
