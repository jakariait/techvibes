// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Users, Loader2, Search, FileDown, Eye } from "lucide-react";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import useAuthUserStore from "../../store/AuthUserStore";
//
// const apiURL = import.meta.env.VITE_API_URL;
//
// const CompanyUserListSection = ({ companyId }) => {
//   const { token } = useAuthUserStore();
//
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const pageSize = 5;
//
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     type: "success",
//   });
//
//   const showSnackbar = (message, type = "success") => {
//     setSnackbar({ open: true, message, type });
//   };
//
//   const closeSnackbar = () => {
//     setSnackbar({ open: false, message: "", type: "success" });
//   };
//
//   const fetchUsers = async () => {
//     if (!companyId || !token) return;
//
//     try {
//       setLoading(true);
//       const res = await axios.get(`${apiURL}/by-company/${companyId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = Array.isArray(res.data.users) ? res.data.users : [];
//       setUsers(data);
//       setFilteredUsers(data);
//     } catch (err) {
//       console.error(err);
//       showSnackbar("Failed to fetch company users", "error");
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   useEffect(() => {
//     fetchUsers();
//   }, [companyId, token]);
//
//   useEffect(() => {
//     const filtered = users.filter(
//       (user) =>
//         user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
//         user.email?.toLowerCase().includes(search.toLowerCase()),
//     );
//     setFilteredUsers(filtered);
//     setPage(1);
//   }, [search, users]);
//
//   const handleExportCSV = () => {
//     const header = ["Full Name", "Email", "Slug"];
//     const rows = filteredUsers.map((u) => [
//       u.fullName || "",
//       u.email || "",
//       u.slug || "",
//     ]);
//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       [header, ...rows]
//         .map((e) => e.map((cell) => `"${cell}"`).join(","))
//         .join("\n");
//
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "company_users.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };
//
//   const totalPages = Math.ceil(filteredUsers.length / pageSize);
//   const currentPageUsers = filteredUsers.slice(
//     (page - 1) * pageSize,
//     page * pageSize,
//   );
//
//   return (
//     <div className="bg-[#212F35] inner-glow p-4 rounded-xl mb-6 max-w-5xl mx-auto">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <Users className="w-5 h-5 text-blue-400" />
//           <h2 className="text-base font-medium text-blue-400">
//             Company Users ({users.length})
//           </h2>
//         </div>
//       </div>
//
//       {/* Search & Export */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-4">
//         <div className="flex items-center gap-2 w-full md:max-w-md">
//           <Search className="text-white w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search by name or email"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full bg-transparent border-b border-gray-500 text-white px-2 py-1 focus:outline-none"
//           />
//         </div>
//         <button
//           onClick={handleExportCSV}
//           className="flex items-center gap-2 px-4 py-1 border border-white text-white cursor-pointer rounded"
//         >
//           <FileDown className="w-4 h-4" /> Export CSV
//         </button>
//       </div>
//
//       {/* User List */}
//       {loading ? (
//         <div className="flex justify-center items-center text-white">
//           <Loader2 className="animate-spin mr-2" /> Loading users...
//         </div>
//       ) : currentPageUsers.length === 0 ? (
//         <p className="text-white text-sm text-center">No users found</p>
//       ) : (
//         <ul className="text-white grid md:grid-cols-2 gap-3">
//           {currentPageUsers.map((user) => (
//             <li
//               key={user._id}
//               className="border border-gray-600 rounded p-3 flex justify-between items-center hover:border-blue-500 transition"
//             >
//               <div>
//                 <p className="font-semibold">{user.fullName}</p>
//                 <p className="text-sm text-gray-300">{user.email}</p>
//               </div>
//               {user.slug && (
//                 <a
//                   href={`/profile/${user.slug}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-400 hover:text-blue-200 text-sm flex items-center gap-1"
//                 >
//                   <Eye className="w-4 h-4" />
//                 </a>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//
//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-4 gap-2">
//           <button
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             disabled={page === 1}
//             className="text-white border px-3 py-1 rounded disabled:opacity-50"
//           >
//             Prev
//           </button>
//           <span className="text-white pt-1 text-sm">
//             Page {page} of {totalPages}
//           </span>
//           <button
//             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//             disabled={page === totalPages}
//             className="text-white border px-3 py-1 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//
//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={closeSnackbar}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert
//           onClose={closeSnackbar}
//           severity={snackbar.type}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };
//
// export default CompanyUserListSection;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, Loader2, Search, FileDown, Eye, Pencil } from "lucide-react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import useAuthUserStore from "../../store/AuthUserStore";
import EditUserDesignationSection from "./EditUserDesignationSection"; // import your component

const apiURL = import.meta.env.VITE_API_URL;

const CompanyUserListSection = ({ companyId }) => {
  const { token } = useAuthUserStore();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Edit dialog state
  const [editUserSlug, setEditUserSlug] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const showSnackbar = (message, type = "success") => {
    setSnackbar({ open: true, message, type });
  };

  const closeSnackbar = () => {
    setSnackbar({ open: false, message: "", type: "success" });
  };

  const fetchUsers = async () => {
    if (!companyId || !token) return;

    try {
      setLoading(true);
      const res = await axios.get(`${apiURL}/by-company/${companyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(res.data.users) ? res.data.users : [];
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to fetch company users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [companyId, token]);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredUsers(filtered);
    setPage(1);
  }, [search, users]);

  const handleExportCSV = () => {
    const header = ["Full Name", "Email", "Slug"];
    const rows = filteredUsers.map((u) => [
      u.fullName || "",
      u.email || "",
      u.slug || "",
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows]
        .map((e) => e.map((cell) => `"${cell}"`).join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "company_users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const currentPageUsers = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl mb-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-400" />
          <h2 className="text-base font-medium text-blue-400">
            Company Users ({users.length})
          </h2>
        </div>
      </div>

      {/* Search & Export */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-4">
        <div className="flex items-center gap-2 w-full md:max-w-md">
          <Search className="text-white w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-b border-gray-500 text-white px-2 py-1 focus:outline-none"
          />
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-1 border border-white text-white cursor-pointer rounded"
        >
          <FileDown className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* User List */}
      {loading ? (
        <div className="flex justify-center items-center text-white">
          <Loader2 className="animate-spin mr-2" /> Loading users...
        </div>
      ) : currentPageUsers.length === 0 ? (
        <p className="text-white text-sm text-center">No users found</p>
      ) : (
        <ul className="text-white grid md:grid-cols-2 gap-3">
          {currentPageUsers.map((user) => (
            <li
              key={user._id}
              className="border border-gray-600 rounded p-3 flex justify-between items-center hover:border-blue-500 transition"
            >
              <div>
                <p className="font-semibold">{user.fullName}</p>
                <p className="text-sm text-gray-300">{user.email}</p>
              </div>
              <div className="flex gap-2 items-center">
                {user.slug && (
                  <a
                    href={`/profile/${user.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-200 text-sm flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={() => setEditUserSlug(user.slug)}
                  className="text-white bg-gray-700  p-1 rounded transition flex items-center gap-1 cursor-pointer"
                  title="Edit Designation"
                >
                  <Pencil className="w-4 h-4" />
                  Edit Designation
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="text-white border px-3 py-1 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-white pt-1 text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="text-white border px-3 py-1 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog
        open={!!editUserSlug}
        onClose={() => setEditUserSlug(null)}
        maxWidth="xs"
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            background: "#212F35", // or "#212F35" to match your theme
            color: "#fff",
          },
        }}
      >
        <DialogTitle sx={{ color: "#fff" }}>Edit Designation</DialogTitle>
        <DialogContent sx={{ color: "#fff" }}>
          {editUserSlug && (
            <EditUserDesignationSection
              slug={editUserSlug}
              onClose={() => setEditUserSlug(null)}
              onSaved={() => {
                setEditUserSlug(null);
                fetchUsers();
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CompanyUserListSection;
