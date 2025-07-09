import { create } from "zustand";

const useUserProfileStore = create((set) => ({
  user: null,
  profile:null,
  loading: false,
  error: null,

  fetchUserBySlug: async (slug) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`http://localhost:5050/api/userbyslug/${slug}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch user");
      }

      set({ user: data.user, loading: false });
      set({ profile: data.profile, loading: false });

    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useUserProfileStore;
