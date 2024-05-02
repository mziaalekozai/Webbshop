import { create } from "zustand";
import { persist } from "zustand/middleware";

const storage = {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : undefined; // Deserialize
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value)); // Serialize
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (item) => {
        set((state) => {
          const existingItem = state.cartItems.find((i) => i.id === item.id);
          if (existingItem) {
            // Increment quantity if item exists
            return {
              cartItems: state.cartItems.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          } else {
            // Add new item with quantity 1 if it does not exist
            return {
              cartItems: [...state.cartItems, { ...item, quantity: 1 }],
            };
          }
        });
      },
      updateQuantity: (id, change) => {
        set((state) => ({
          cartItems: state.cartItems
            .map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity + change }
                : item
            )
            .filter((item) => item.quantity > 0), // Remove item if quantity is zero
        }));
      },
      removeFromCart: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        }));
      },
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage", // name of the storage item under which to save the state
      storage: storage, // using custom storage configuration
    }
  )
);

export default useCartStore;
