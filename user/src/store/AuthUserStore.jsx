// import { create } from "zustand";
// import axios from "axios";
//
// const apiUrl = import.meta.env.VITE_API_URL;
//
// const useAuthUserStore = create((set, get) => ({
//   user: null,
//   token: localStorage.getItem("user_token") || null,
//   error: null,
//   loading: false,
//
//   // Login
//   login: async (emailOrPhone, password) => {
//     set({ loading: true, error: null });
//
//     try {
//       const res = await axios.post(`${apiUrl}/login`, {
//         emailOrPhone,
//         password,
//       });
//
//       const { user } = res.data;
//
//       // Save token and user
//       localStorage.setItem("user_token", user.token);
//       set({ user, token: user.token, loading: false });
//     } catch (error) {
//       console.error("Login error:", error.response || error);
//       set({
//         error: error?.response?.data?.message || "Login failed",
//         loading: false,
//       });
//     }
//   },
//
//   // Initialize
//   initialize: async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) return set({ loading: false });
//
//     set({ loading: true });
//
//     try {
//       const res = await axios.get(`${apiUrl}/getLoggedInUser`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//
//       set({ user: res.data.user, token, loading: false });
//     } catch (error) {
//       console.error("Initialization error:", error.response || error);
//       localStorage.removeItem("user_token");
//
//       set({
//         user: null,
//         token: null,
//         error: error?.response?.data?.message || "Failed to fetch profile",
//         loading: false,
//       });
//     }
//   },
//
//   // Logout
//   logout: () => {
//     localStorage.removeItem("user_token");
//     set({ user: null, token: null });
//   },
// }));
//
// export default useAuthUserStore;
//


import { create } from "zustand";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const useAuthUserStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem("user_token") || null,
  error: null,
  loading: false,
  isAdmin: false, // <-- new

  // Login
  login: async (emailOrPhone, password) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.post(`${apiUrl}/login`, {
        emailOrPhone,
        password,
      });

      const { user } = res.data;

      // Save token and user
      localStorage.setItem("user_token", user.token);
      set({ user, token: user.token, loading: false });
    } catch (error) {
      console.error("Login error:", error.response || error);
      set({
        error: error?.response?.data?.message || "Login failed",
        loading: false,
      });
    }
  },

  // Initialize
  initialize: async () => {
    const token = localStorage.getItem("user_token");
    if (!token) return set({ loading: false, isAdmin: false });

    set({ loading: true });

    try {
      // Get logged in user
      const res = await axios.get(`${apiUrl}/getLoggedInUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = res.data.user;
      set({ user, token, loading: false });

      // Now fetch company admins to check if user is admin
      if (user && user.company) {
        try {
          const companyRes = await axios.get(`${apiUrl}/company/${user.company}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const admins = Array.isArray(companyRes.data.admins)
            ? companyRes.data.admins
            : [];

          const isAdmin = admins.includes(user._id);
          set({ isAdmin });
        } catch (companyErr) {
          console.error("Failed to fetch company admins", companyErr);
          set({ isAdmin: false });
        }
      } else {
        set({ isAdmin: false });
      }
    } catch (error) {
      console.error("Initialization error:", error.response || error);
      localStorage.removeItem("user_token");

      set({
        user: null,
        token: null,
        error: error?.response?.data?.message || "Failed to fetch profile",
        loading: false,
        isAdmin: false,
      });
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("user_token");
    set({ user: null, token: null, isAdmin: false });
  },
}));

export default useAuthUserStore;
