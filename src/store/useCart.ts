import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Book } from "@/components/catalog/BookCard";

interface CartItem extends Book {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (book: Book) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  getCartTotal: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (book) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === book.id);
        
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
            isOpen: true,
          });
        } else {
          set({ items: [...items, { ...book, quantity: 1 }], isOpen: true });
        }
      },
      removeItem: (bookId) => {
        set({ items: get().items.filter((item) => item.id !== bookId) });
      },
      updateQuantity: (bookId, quantity) => {
        set({
          items: get().items.map((item) =>
            item.id === bookId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      setIsOpen: (isOpen) => set({ isOpen }),
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: "bems-books-cart",
      partialize: (state) => ({ items: state.items }), // Only persist items, not UI state
    }
  )
);
