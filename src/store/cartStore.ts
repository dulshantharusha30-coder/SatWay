import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product { id: string; name: string; price: number; image_url: string | null; stock: number; }
export interface CartItem { product: Product; quantity: number; }
interface CartState {
  items: CartItem[]; addToCart: (product: Product) => void; removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void; clearCart: () => void;
}
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (product) => set((state) => {
        const existingItem = state.items.find((item) => item.product.id === product.id);
        if (existingItem) {
          const newQuantity = existingItem.quantity + 1;
          if (newQuantity > product.stock) return state;
          return { items: state.items.map((item) => item.product.id === product.id ? { ...item, quantity: newQuantity } : item) };
        }
        if (product.stock < 1) return state;
        return { items: [...state.items, { product, quantity: 1 }] };
      }),
      removeFromCart: (productId) => set((state) => ({ items: state.items.filter((item) => item.product.id !== productId) })),
      updateQuantity: (productId, quantity) => set((state) => ({ items: state.items.map((item) => item.product.id === productId ? { ...item, quantity } : item).filter(item => item.quantity > 0) })),
      clearCart: () => set({ items: [] }),
    }), { name: 'satway-cart-storage' }
  )
);
