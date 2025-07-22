import { create } from "zustand";

const apiUrl = import.meta.env.VITE_API_URL;

const useUserProfileStore = create((set, get) => ({
  user: null,
  profile: null,
  loading: false,
  error: null,

  fetchUserBySlug: async (slug) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`${apiUrl}/userbyslug/${slug}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch user");
      }

      set({
        user: data.user,
        profile: data.profile,
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // New initialize method that takes a slug and fetches user & profile
  initialize: async (slug) => {
    if (!slug) return; // no slug, skip

    await get().fetchUserBySlug(slug);
  },
}));

export default useUserProfileStore;
