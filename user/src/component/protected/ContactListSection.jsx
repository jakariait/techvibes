// import React, { useState } from "react";
// import { Mail, Trash2, Phone, MessageCircle, MapPin } from "lucide-react";
//
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
//
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";
//
// const ContactListSection = ({
//   title,
//   type,
//   initialItems = [],
//   onSave,
//   user,
// }) => {
//   const [items, setItems] = useState(initialItems);
//   const [newItem, setNewItem] = useState({ label: "", value: "" });
//   const [loading, setLoading] = useState(false);
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
//   // Update existing item label or value
//   const handleChange = (index, field, value) => {
//     setItems((prev) => {
//       const updated = [...prev];
//       updated[index] = { ...updated[index], [field]: value };
//       return updated;
//     });
//   };
//
//   // Add new item and reset newItem inputs
//   const handleAdd = () => {
//     if (!newItem.label || !newItem.value) {
//       showSnackbar("Please fill both label and value", "error");
//       return;
//     }
//     setItems((prev) => [...prev, newItem]);
//     setNewItem({ label: "", value: "" });
//     showSnackbar(`${type} added successfully`, "success");
//   };
//
//   // Remove item by index
//   const handleRemove = (index) => {
//     setItems((prev) => prev.filter((_, i) => i !== index));
//     showSnackbar(`${type} removed`, "success");
//   };
//
//   const isLimitReached = (() => {
//     if (user?.role !== "normal") return false;
//
//     const count = items.filter((item) => item?.value?.trim()).length;
//
//     const limits = {
//       email: 2,
//       phone: 2,
//       locations: 2,
//       whatsapp: 1,
//     };
//
//     const max = limits[type] ?? Infinity;
//     return count >= max;
//   })();
//
//   // Save all items via onSave prop
//   const handleSave = async () => {
//     if (items.some((item) => !item.label || !item.value)) {
//       showSnackbar("All items must have both label and value", "error");
//       return;
//     }
//
//     try {
//       setLoading(true);
//       await onSave(items);
//       showSnackbar(`${title} saved successfully`, "success");
//     } catch (error) {
//       showSnackbar("Failed to save. Check console.", "error");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div className="bg-[#212F35] inner-glow p-4 rounded-xl mb-6">
//       {/* Header with icon */}
//       <div className={"flex flex-col items-center justify-center mb-2"}>
//         <div className="flex items-center justify-start gap-2 ">
//           {type === "email" && <Mail className="w-5 h-5 text-green-400" />}
//           {type === "phone" && <Phone className="w-5 h-5 text-green-400" />}
//           {type === "whatsapp" && (
//             <MessageCircle className="w-5 h-5 text-green-400" />
//           )}
//           {type === "locations" && (
//             <MapPin className="w-5 h-5 text-green-400" />
//           )}
//
//           <h2 className="text-base font-medium text-green-400">{title}</h2>
//         </div>
//       </div>
//
//       {/* Existing items */}
//       {items.length === 0 && (
//         <p className="text-white text-sm mb-2">No {type} added yet.</p>
//       )}
//
//       {items.map((item, index) => (
//         <div
//           key={index}
//           className="flex items-center gap-2 mb-2 p-2 rounded inner-glow"
//         >
//           {/* Label input */}
//           <input
//             type="text"
//             placeholder="Label"
//             value={item.label}
//             onChange={(e) => handleChange(index, "label", e.target.value)}
//             className="bg-[#212F35] text-white p-2 rounded min-w-[50px] focus:outline-none border border-gray-600"
//           />
//           <div className="text-white">:</div>
//
//           {/* Value input */}
//           {type === "phone" || type === "whatsapp" ? (
//             <PhoneInput
//               international
//               withCountryCallingCode
//               defaultCountry="BD"
//               placeholder="Enter phone number"
//               value={item.value}
//               onChange={(phone) => handleChange(index, "value", phone)}
//               className="text-white bg-[#212F35] p-2 rounded border border-gray-600 w-full focus:outline-none"
//             />
//           ) : (
//             <input
//               type={type === "email" ? "email" : "text"}
//               placeholder="Value"
//               value={item.value}
//               onChange={(e) => handleChange(index, "value", e.target.value)}
//               className="text-white flex-1 p-2 rounded focus:outline-none min-w-[150px] bg-[#212F35] border border-gray-600"
//             />
//           )}
//
//           {/* Remove button */}
//           <button
//             onClick={() => handleRemove(index)}
//             className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 cursor-pointer"
//             title="Remove"
//           >
//             <Trash2 className="w-5 h-5" />
//           </button>
//         </div>
//       ))}
//
//       {/* Add new item */}
//       {!isLimitReached && (
//         <div className="flex items-center gap-2 mb-4 p-2 inner-glow rounded bg-[#212F35]">
//           <input
//             type="text"
//             placeholder="Label"
//             value={newItem.label}
//             onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
//             className="bg-[#212F35] text-white p-2 rounded min-w-[50px] focus:outline-none border border-gray-600"
//           />
//           <div className="text-white">:</div>
//
//           {type === "phone" || type === "whatsapp" ? (
//             <PhoneInput
//               international
//               withCountryCallingCode
//               defaultCountry="BD"
//               placeholder="Enter phone number"
//               value={newItem.value}
//               onChange={(phone) => setNewItem({ ...newItem, value: phone })}
//               className="text-white bg-[#212F35] p-2 rounded border border-gray-600 w-full focus:outline-none"
//             />
//           ) : (
//             <input
//               type={type === "email" ? "email" : "text"}
//               placeholder="Value"
//               value={newItem.value}
//               onChange={(e) =>
//                 setNewItem({ ...newItem, value: e.target.value })
//               }
//               className="text-white flex-1 p-2 rounded focus:outline-none min-w-[150px] bg-[#212F35] border border-gray-600"
//             />
//           )}
//
//           <button
//             onClick={handleAdd}
//             className="border-2 border-white text-white px-3 py-1 rounded cursor-pointer hover:bg-white hover:text-[#212F35] transition-colors"
//           >
//             Add
//           </button>
//         </div>
//       )}
//
//       {/* Save button */}
//       <div className="flex justify-center">
//         <button
//           onClick={handleSave}
//           disabled={loading}
//           className="border-2 border-white text-white px-4 py-2 rounded cursor-pointer"
//         >
//           {loading ? "Saving..." : "Save"}
//         </button>
//       </div>
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
// export default ContactListSection;

import React, { useEffect, useState } from "react";
import { Mail, Trash2, Phone, MessageCircle, MapPin } from "lucide-react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";
import LoadingLottie from "../public/LoadingLottie.jsx";
import useAuthUserStore from "../../store/AuthUserStore.jsx";

const apiURL = import.meta.env.VITE_API_URL;

const ContactListSection = ({ title, type, fieldKey }) => {
  const { user, token } = useAuthUserStore();

  const apiSlug = user?.slug;
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ label: "", value: "" });
  const [loading, setLoading] = useState(true);
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

  // Fetch profile data
  useEffect(() => {
    if (!apiSlug || !fieldKey || !token) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiURL}/userbyslug/${apiSlug}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fieldData = res.data?.profile?.[fieldKey] || [];
        setItems(fieldData);
      } catch (error) {
        console.error("Failed to fetch data", error);
        showSnackbar("Failed to load data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiSlug, fieldKey, token]);

  const handleChange = (index, field, value) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAdd = () => {
    if (!newItem.label || !newItem.value) {
      showSnackbar("Please fill both label and value", "error");
      return;
    }
    setItems((prev) => [...prev, newItem]);
    setNewItem({ label: "", value: "" });
    showSnackbar(`${type} added successfully`, "success");
  };

  const handleRemove = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
    showSnackbar(`${type} removed`, "success");
  };

  const isLimitReached = (() => {
    if (user?.role !== "normal") return false;

    const count = items.filter((item) => item?.value?.trim()).length;
    const limits = {
      email: 2,
      phone: 2,
      locations: 2,
      whatsapp: 1,
    };

    return count >= (limits[type] ?? Infinity);
  })();

  const handleSave = async () => {
    if (items.some((item) => !item.label || !item.value)) {
      showSnackbar("All items must have both label and value", "error");
      return;
    }

    try {
      setLoading(true);
      await axios.patch(
        `${apiURL}/profilebyslug/${apiSlug}`,
        { [fieldKey]: items },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      showSnackbar(`${title} saved successfully`, "success");
    } catch (error) {
      showSnackbar("Failed to save. Check console.", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingLottie />;

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl mb-6">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {type === "email" && <Mail className="w-5 h-5 text-green-400" />}
        {type === "phone" && <Phone className="w-5 h-5 text-green-400" />}
        {type === "whatsapp" && (
          <MessageCircle className="w-5 h-5 text-green-400" />
        )}
        {type === "locations" && <MapPin className="w-5 h-5 text-green-400" />}
        <h2 className="text-base font-medium text-green-400">{title}</h2>
      </div>

      {items.length === 0 && (
        <p className="text-white text-sm mb-2">No {type} added yet.</p>
      )}

      {/* Items */}
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2 mb-2 p-2 rounded inner-glow"
        >
          <input
            type="text"
            placeholder="Label"
            value={item.label}
            onChange={(e) => handleChange(index, "label", e.target.value)}
            className="bg-[#212F35] text-white p-2 rounded min-w-[50px] focus:outline-none border border-gray-600"
          />
          <div className="text-white">:</div>

          {type === "phone" || type === "whatsapp" ? (
            <PhoneInput
              international
              withCountryCallingCode
              defaultCountry="BD"
              placeholder="Enter phone number"
              value={item.value}
              onChange={(phone) => handleChange(index, "value", phone)}
              className="text-white bg-[#212F35] p-2 rounded border border-gray-600 w-52 md:w-full focus:outline-none"
            />
          ) : (
            <input
              type={type === "email" ? "email" : "text"}
              placeholder="Value"
              value={item.value}
              onChange={(e) => handleChange(index, "value", e.target.value)}
              className="text-white flex-1 p-2 rounded focus:outline-none min-w-[150px] bg-[#212F35] border border-gray-600"
            />
          )}

          <button
            onClick={() => handleRemove(index)}
            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 cursor-pointer"
            title="Remove"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}

      {/* Add New Item */}
      {!isLimitReached && (
        <div className="flex items-center gap-2 mb-4 p-2 inner-glow rounded bg-[#212F35]">
          <input
            type="text"
            placeholder="Label"
            value={newItem.label}
            onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
            className="bg-[#212F35] text-white p-2 rounded min-w-[50px] focus:outline-none border border-gray-600"
          />
          <div className="text-white">:</div>

          {type === "phone" || type === "whatsapp" ? (
            <PhoneInput
              international
              withCountryCallingCode
              defaultCountry="BD"
              placeholder="Enter phone number"
              value={newItem.value}
              onChange={(phone) => setNewItem({ ...newItem, value: phone })}
              className="text-white bg-[#212F35] p-2 rounded border border-gray-600 w-44 md:w-full focus:outline-none"
            />
          ) : (
            <input
              type={type === "email" ? "email" : "text"}
              placeholder="Value"
              value={newItem.value}
              onChange={(e) =>
                setNewItem({ ...newItem, value: e.target.value })
              }
              className="text-white flex-1 p-2 rounded focus:outline-none min-w-[120px] bg-[#212F35] border border-gray-600"
            />
          )}

          <button
            onClick={handleAdd}
            className="border-2 border-white text-white px-3 py-1 rounded cursor-pointer hover:bg-white hover:text-[#212F35] transition-colors"
          >
            Add
          </button>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSave}
          disabled={loading}
          className="border-2 border-white text-white px-4 py-2 rounded cursor-pointer"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

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

export default ContactListSection;
