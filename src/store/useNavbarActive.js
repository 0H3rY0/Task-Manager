import { create } from "zustand";

export const useNavbarActive = create((set) => ({
  isNavbarActive: false,
  setIsNavbarActive: () =>
    set((state) => ({ isNavbarActive: !state.isNavbarActive })),
  closeNavbar: (value) => set({ isNavbarActive: value }),
}));
