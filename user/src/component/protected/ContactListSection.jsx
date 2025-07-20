import React, { useState } from "react";
import { Trash2, PlusCircle, Link2 } from "lucide-react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ContactListSection = ({ title, type, initialItems = [], onSave }) => {
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState({ label: "", value: "" });
  const [loading, setLoading] = useState(false);
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

  const handleAdd = () => {
    if (newItem.label && newItem.value) {
      setItems([...items, newItem]);
      setNewItem({ label: "", value: "" });
      showSnackbar(`${type} added successfully`, "success");
    } else {
      showSnackbar("Please fill both label and value", "error");
    }
  };

  const handleRemove = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
    showSnackbar(`${type} removed`, "success");
  };

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleSave = async () => {
    if (items.some((item) => !item.label || !item.value)) {
      showSnackbar("All items must have both label and value", "error");
      return;
    }

    try {
      setLoading(true);
      await onSave(items);
      showSnackbar(`${title} saved successfully`, "success");
    } catch (error) {
      showSnackbar("Failed to save. Check console.", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl mb-6">
      <div className={"flex flex-col items-center justify-center mb-2"}>
        <div className="flex items-center justify-start gap-2 ">
          <h2 className="text-base font-medium text-green-400">{title}</h2>
        </div>
      </div>

      {items.length === 0 && (
        <p className="text-white text-sm mb-2">No {type} added yet.</p>
      )}

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
            className="bg-[#212F35] text-white p-2 rounded min-w-[50px] focus:outline-none"
          />
          <div className={"text-white"}>:</div>
          <input
            type="text"
            placeholder="Value"
            value={item.value}
            onChange={(e) => handleChange(index, "value", e.target.value)}
            className="text-white flex-1 p-2 rounded focus:outline-none"
          />
          <button
            onClick={() => handleRemove(index)}
            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
            title="Remove"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}

      {/* Add new */}
      <div className="flex items-center gap-2 mb-4 p-2 inner-glow rounded">
        <input
          type="text"
          placeholder="Label"
          value={newItem.label}
          onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
          className="bg-[#212F35] text-white p-2 rounded min-w-[50px] focus:outline-none"
        />
        <div className={"text-white"}>:</div>
        <input
          type="text"
          placeholder="Value"
          value={newItem.value}
          onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
          className="text-white flex-1 p-2 rounded focus:outline-none min-w-[150px]"
        />
        <button
          onClick={handleAdd}
          className="border-2 border-white text-white px-3 py-1 rounded cursor-pointer"
        >
          Add
        </button>
      </div>

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
