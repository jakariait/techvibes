import React, { useState } from "react";
import axios from "axios";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Link2, Trash2 } from "lucide-react";

const apiURL = import.meta.env.VITE_API_URL;

const platforms = [
  "facebook",
  "twitter",
  "instagram",
  "linkedin",
  "youtube",
  "tiktok",
  "pinterest",
  "snapchat",
  "reddit",
  "github",
  "medium",
  "telegram",
  "discord",
  "website",
  "teams",
  "quora",
  "twitch",
  "soundcloud",
  "vimeo",
  "spotify",
  "behance",
  "fiverr",
  "dribbble",
  "upwork",
  "wechat",
  "apple music",
  "podcast",
];

// Sortable item component
const SortableItem = ({ id, link, handleChange, handleRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Separate the drag handlers from input interactions
  const handleSelectChange = (e) => {
    e.stopPropagation();
    handleChange(id, "platform", e.target.value);
  };

  const handleInputChange = (e) => {
    e.stopPropagation();
    handleChange(id, "url", e.target.value);
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    handleRemove(id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 mb-2 p-2  rounded inner-glow  "
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-move p-1 text-gray-500 hover:text-gray-700"
        title="Drag to reorder"
      >
        ⋮⋮
      </div>

      <select
        value={link.platform || ""}
        onChange={handleSelectChange}
        className=" bg-[#212F35]  text-white p-2 rounded min-w-[120px] focus: outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <option value="">Select platform</option>
        {platforms.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={link.url || ""}
        onChange={handleInputChange}
        onClick={(e) => e.stopPropagation()}
        placeholder="Enter URL"
        className="text-white focus: outline-none rounded flex-1"
      />

      <button
        onClick={handleRemoveClick}
        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
        title="Remove link"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

const SocialLinksSection = ({ initialLinks = [], slug, token }) => {
  // Initialize links with unique IDs and order
  const [links, setLinks] = useState(() =>
    initialLinks.map((link, index) => ({
      ...link,
      order: typeof link.order === "number" ? link.order : index,
      id: link.id || `link-${Date.now()}-${index}`, // Ensure unique IDs
    })),
  );

  const [newLink, setNewLink] = useState({ platform: "", url: "" });
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before drag starts
      },
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setLinks((prevLinks) => {
      const oldIndex = prevLinks.findIndex((link) => link.id === active.id);
      const newIndex = prevLinks.findIndex((link) => link.id === over.id);

      if (oldIndex === -1 || newIndex === -1) {
        return prevLinks;
      }

      const reordered = arrayMove(prevLinks, oldIndex, newIndex).map(
        (l, i) => ({
          ...l,
          order: i,
        }),
      );

      return reordered;
    });
  };

  const handleAdd = () => {
    if (newLink.platform && newLink.url) {
      const newLinkWithId = {
        ...newLink,
        order: links.length,
        id: `link-${Date.now()}-${Math.random()}`, // More unique ID
      };

      setLinks((prevLinks) => [...prevLinks, newLinkWithId]);
      setNewLink({ platform: "", url: "" });
      showSnackbar("Social media link added successfully!", "success");
    } else {
      showSnackbar("Please select a platform and enter a URL", "error");
    }
  };

  const handleRemove = (id) => {
    setLinks((prevLinks) => {
      const filtered = prevLinks.filter((link) => link.id !== id);
      // Reorder after removal
      return filtered.map((l, i) => ({ ...l, order: i }));
    });
    showSnackbar("Social media link removed successfully!", "success");
  };

  const handleChange = (id, field, value) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id ? { ...link, [field]: value } : link,
      ),
    );
  };

  const handleSave = async () => {
    // Validate all links before saving
    const invalidLinks = links.filter((link) => !link.platform || !link.url);
    if (invalidLinks.length > 0) {
      showSnackbar(
        "Please fill in all platform and URL fields before saving.",
        "error",
      );
      return;
    }

    setLoading(true);
    try {
      const res = await axios.patch(
        `${apiURL}/profilebyslug/${slug}`,
        { socialMedia: links },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      showSnackbar("Social links updated successfully!", "success");
    } catch (err) {
      console.error("Failed to save social links", err);
      showSnackbar(
        `Failed to save: ${err.response?.data?.message || err.message}`,
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden h-full">
      <div className={"flex flex-col items-center justify-center mb-2"}>
        <div className="flex items-center justify-start gap-2 ">
          <Link2 className="w-5 h-5 text-yellow-400" />
          <h2 className="text-base font-medium text-yellow-400">
            Social Media Links
          </h2>
        </div>
        <span className="text-sm text-gray-500">
          Drag and drop to rearrange the links
        </span>
      </div>

      {links.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={links.map((link) => link.id)}
            strategy={verticalListSortingStrategy}
          >
            {links.map((link) => (
              <SortableItem
                key={link.id}
                id={link.id}
                link={link}
                handleChange={handleChange}
                handleRemove={handleRemove}
              />
            ))}
          </SortableContext>
        </DndContext>
      ) : (
        <p className="text-gray-500 mb-4">No social media links added yet.</p>
      )}

      {/* Add new social media */}
      <div className="flex items-center gap-2 mb-4 p-2 inner-glow rounded">
        <select
          value={newLink.platform}
          onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
          className=" p-2 text-white focus:outline-none rounded min-w-[170px]"
        >
          <option value="">Select platform</option>
          {platforms.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          placeholder="Enter URL"
          className="text-white focus:outline-none p-2 rounded flex-1"
        />
        <button
          onClick={handleAdd}
          className="border-2 border-white text-white px-3 cursor-pointer py-1 rounded transition-colors"
        >
          Add
        </button>
      </div>
      <div className={"flex items-center justify-center"}>
        <button
          onClick={handleSave}
          disabled={loading}
          className="border-2 border-white text-white  cursor-pointer px-4 py-2 rounded transition-colors"
        >
          {loading ? "Saving..." : "Save Links"}
        </button>
      </div>

      {/* MUI Snackbar + Alert for top-right notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.type} // 'success', 'error', 'warning', 'info'
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SocialLinksSection;
