import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  access: "limited",
  setAuthenticated: () =>
    set({
      isAuthenticated: true,
      access: "full",
    }),
  logout: () => set({ isAuthenticated: false, access: "limited" }),
}));
