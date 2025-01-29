import { create } from "zustand";
import axios from "axios";

export const useUserStore = create((set) => ({
  user: {
    id: "",
    username: "",
    email: "",
    imageUrl: "",
  },

  fetchUser: async (id) => {
    try {
      const response = await axios.get("http://localhost:3000/user", {
        params: { id },
      });
      set({ user: response.data.user });
    } catch (error) {
      console.error("Błąd podczas pobierania użytkownika:", error);
    }
  },

  setUserImage: (imageUrl) =>
    set((state) => ({
      user: { ...state.user, imageUrl },
    })),

  setUserName: (newValue) =>
    set((state) => ({
      user: {
        ...state.user,
        username: newValue,
      },
    })),

  resetUser: () =>
    set({
      user: { id: "", username: "", email: "", imageUrl: "" },
    }),
}));
