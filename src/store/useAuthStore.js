import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { useUserStore } from "./useUserStore";

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  access: "limited",

  setAuthenticated: (token) => {
    try {
      const decoded = jwtDecode(token);
      localStorage.setItem("authToken", token);
      set({ isAuthenticated: true, access: "full" });

      useUserStore.getState().fetchUser(decoded.id);
    } catch (error) {
      console.error("Error decoding token:", error);
      set({ isAuthenticated: false, access: "limited" });
    }
  },

  logout: () => {
    localStorage.removeItem("authToken");
    set({ isAuthenticated: false, access: "limited" });
    useUserStore.getState().resetUser();
  },

  initializeAuth: async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      set({ isAuthenticated: false, access: "limited" });
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp < currentTime) {
        console.warn("Token has expired.");
        localStorage.removeItem("authToken");
        set({ isAuthenticated: false, access: "limited" });
        return;
      }

      set({ isAuthenticated: true, access: "full" });

      useUserStore.getState().fetchUser(decoded.id);
    } catch (error) {
      console.error("Błąd podczas autoryzacji:", error);
      localStorage.removeItem("authToken");
      set({ isAuthenticated: false, access: "limited" });
    }
  },

  setAccessLimited: () => set({ access: "limited" }),
  setAccessFull: () => set({ access: "full" }),
}));
