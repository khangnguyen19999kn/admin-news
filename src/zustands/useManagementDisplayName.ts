import { create } from "zustand";

type TManagementDisplayName = {
  displayName: string;
  setDisplayName: (displayName: string) => void;
};

export const useManagementDisplayName = create<TManagementDisplayName>(set => ({
  displayName: "",
  setDisplayName: (displayName: string) => set({ displayName }),
}));
