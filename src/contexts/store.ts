import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  isPremium: boolean;
  setIsPremium: (status: boolean) => void;
  subscriptionId: string | null;
  setSubscriptionId: (id: string | null) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      isPremium: false,
      setIsPremium: (status: boolean) => set({ isPremium: status }),
      subscriptionId: null,
      setSubscriptionId: (id: string | null) => set({ subscriptionId: id }),
    }),
    {
      name: "user-subscription-storage", // Nome do item no localStorage
    }
  )
);

export default useStore;
