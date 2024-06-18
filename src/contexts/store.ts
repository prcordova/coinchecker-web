// src/store/store.ts
import { create } from "zustand";

interface StoreState {
  isPremium: boolean;
  setIsPremium: (status: boolean) => void;
  subscriptionId: string | null;
  setSubscriptionId: (id: string | null) => void;
}

const useStore = create<StoreState>((set) => ({
  isPremium: false,
  setIsPremium: (status: boolean) => set({ isPremium: status }),
  subscriptionId: null,
  setSubscriptionId: (id: string | null) => set({ subscriptionId: id }),
}));

export default useStore;
