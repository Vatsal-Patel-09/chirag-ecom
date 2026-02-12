import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OrderHistoryItem {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  totalAmount: number;
  status: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
    size: string;
  }[];
  createdAt: string;
}

interface OrderHistoryState {
  orders: OrderHistoryItem[];
  addOrder: (order: OrderHistoryItem) => void;
  clearHistory: () => void;
}

export const useOrderHistoryStore = create<OrderHistoryState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),
      clearHistory: () => set({ orders: [] }),
    }),
    {
      name: 'order-history-storage',
    }
  )
);
