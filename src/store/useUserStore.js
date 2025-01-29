import { create } from "zustand";
import axios from "axios";

export const useUserStore = create((set) => ({
  user: {
    id: "",
    username: "",
    email: "",
    imageUrl: "",
    receiveUpdatesEmails: false,
    receiveProgressEmails: false,
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

  setUserEmailSettings: (name, newValue, userId) => {
    set((state) => ({
      user: {
        ...state.user,
        [name]: newValue,
      },
    }));

    const payload = {
      id: userId,
      [name]: newValue ? 1 : 0,
    };

    axios
      .put("http://localhost:3000/user/update", payload)
      .then((response) => console.log("Server response:", response.data))
      .catch((error) => {
        console.error("Error updating user settings:", error);
      });
  },

  resetUser: () =>
    set({
      user: { id: "", username: "", email: "", imageUrl: "" },
    }),
}));
