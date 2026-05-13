import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number; // current quantity in cart
  availableQuantity: number; // max quantity from farmer
  image?: string;
  region: string;
  category: string;
}

interface CartState {
  items: CartItem[];
  addItem: (product: any) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);
        
        if (existingItem) {
          set({
            items: items.map((item) => 
              item.id === product.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            )
          });
        } else {
          set({
            items: [...items, { 
              id: product.id,
              title: product.title,
              price: product.price,
              quantity: 1,
              availableQuantity: product.quantity,
              image: product.image,
              region: product.region,
              category: product.category
            }]
          });
        }
      },
      
      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId)
        });
      },
      
      updateQuantity: (productId, quantity) => {
        set({
          items: get().items.map((item) => 
            item.id === productId ? { ...item, quantity } : item
          )
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
