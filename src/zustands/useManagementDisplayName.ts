import { create } from "zustand";

type TManagementDisplayName = {
  displayName: string;
  isAdmin: boolean;
  setDisplayName: (displayName: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
};

export const useManagementDisplayName = create<TManagementDisplayName>(set => ({
  displayName: "",
  isAdmin: false,
  setDisplayName: (displayName: string) => set({ displayName }),
  setIsAdmin: (isAdmin: boolean) => set({ isAdmin }),
}));
