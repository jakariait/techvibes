import { create } from "zustand";

const apiUrl = import.meta.env.VITE_API_URL;

const useCompanyStore = create((set) => ({
  company: null,
  loading: false,
  error: null,

  fetchCompanyById: async (id) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`${apiUrl}/company/${id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch company");
      }

      set({ company: data, loading: false });

    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useCompanyStore;
