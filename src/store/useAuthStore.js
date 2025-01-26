import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  access: "full",
  setAuthenticated: () =>
    set({
      isAuthenticated: true,
      access: "full",
    }),
  logout: () => set({ isAuthenticated: false, access: "full" }),
  setAccessLimited: () => set({ access: "limited" }),
  setAccessFull: () => set({ access: "full" }),
}));
