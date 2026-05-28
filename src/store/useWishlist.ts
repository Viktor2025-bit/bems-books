import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Book } from "@/components/catalog/BookCard";

interface WishlistStore {
  items: Book[];
  isOpen: boolean;
  toggleItem: (book: Book) => void;
  removeItem: (bookId: string) => void;
  clearWishlist: () => void;
  setIsOpen: (isOpen: boolean) => void;
  isInWishlist: (bookId: string) => boolean;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toggleItem: (book) => {
        const items = get().items;
        const exists = items.some((item) => item.id === book.id);
        if (exists) {
          set({ items: items.filter((item) => item.id !== book.id) });
        } else {
          set({ items: [...items, book] });
        }
      },
      removeItem: (bookId) => {
        set({ items: get().items.filter((item) => item.id !== bookId) });
      },
      clearWishlist: () => set({ items: [] }),
      setIsOpen: (isOpen) => set({ isOpen }),
      isInWishlist: (bookId) => {
        return get().items.some((item) => item.id === bookId);
      },
    }),
    {
      name: "bems-books-wishlist",
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
);
