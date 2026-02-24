import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
          isOpen: true,
        };
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
        isOpen: true,
      };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
}));
