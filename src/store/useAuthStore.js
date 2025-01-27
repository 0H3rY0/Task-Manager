import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  access: "limited",
  user: null,

  setAuthenticated: (token) => {
    try {
      const decoded = jwtDecode(token);
      localStorage.setItem("authToken", token);
      set({
        isAuthenticated: true,
        access: "full",
        user: decoded,
      });
    } catch (error) {
      console.error("Error decoding token:", error);
      set({ isAuthenticated: false, access: "limited", user: null });
    }
  },

  logout: () => {
    localStorage.removeItem("authToken");
    set({ isAuthenticated: false, access: "full", user: null });
  },

  initializeAuth: () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp && decoded.exp < currentTime) {
          console.warn("Token has expired.");
          localStorage.removeItem("authToken");
          set({ isAuthenticated: false, access: "limited", user: null });
        } else {
          set({
            isAuthenticated: true,
            access: "full",
            user: decoded,
          });
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("authToken");
        set({ isAuthenticated: false, access: "limited", user: null });
      }
    }
  },

  setAccessLimited: () => set({ access: "limited" }),
  setAccessFull: () => set({ access: "full" }),
}));
