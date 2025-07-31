import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
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
import LoadingLottie from "../public/LoadingLottie.jsx";
import useAuthUserStore from "../../store/AuthUserStore.jsx";

const apiURL = import.meta.env.VITE_API_URL;

const platforms = [
  "facebook",
  "facebook page",
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
  "freelancer",
  "threads",
  "tinder",
  "x.com",
];

// Sortable item component
const SortableItem = ({ id, link, handleChange, handleRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
      className="flex items-center gap-2 mb-2 p-2 rounded inner-glow"
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
        className="bg-[#212F35] text-white p-2 rounded min-w-[60px] focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <option value="">Select Platform</option>
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
        className="text-white focus:outline-none rounded flex-1 min-w-[80px]"
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

const SocialLinksSection = ({slug}) => {
  const {  token } = useAuthUserStore();


  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
  );

  useEffect(() => {
    const fetchProfile = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const res = await fetch(`${apiURL}/userbyslug/${slug}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch profile");

        const fetchedLinks = (data?.profile?.socialMedia || []).map(
          (link, index) => ({
            ...link,
            order: typeof link.order === "number" ? link.order : index,
            id: link.id || `link-${Date.now()}-${index}`,
          }),
        );

        setLinks(fetchedLinks);
        setError(null);
      } catch (err) {
        setError(err.message || "Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [slug]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setLinks((prevLinks) => {
      const oldIndex = prevLinks.findIndex((link) => link.id === active.id);
      const newIndex = prevLinks.findIndex((link) => link.id === over.id);

      if (oldIndex === -1 || newIndex === -1) return prevLinks;

      return arrayMove(prevLinks, oldIndex, newIndex).map((link, i) => ({
        ...link,
        order: i,
      }));
    });
  };

  const handleAdd = () => {
    const newEmptyLink = {
      id: `link-${Date.now()}-${Math.random()}`,
      platform: "",
      url: "",
      order: links.length,
    };
    setLinks((prev) => [...prev, newEmptyLink]);
    showSnackbar("New social media row added");
  };


  const handleRemove = (id) => {
    setLinks((prev) =>
      prev
        .filter((link) => link.id !== id)
        .map((link, i) => ({ ...link, order: i })),
    );
    showSnackbar("Social media link removed successfully!");
  };

  const handleChange = (id, field, value) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, [field]: value } : link)),
    );
  };

  const handleSave = async () => {
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
      await axios.patch(
        `${apiURL}/profilebyslug/${slug}`,
        { socialMedia: links },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      showSnackbar("Social links updated successfully!");
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

  if (loading) return <LoadingLottie />;

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden ">
      <div className="flex flex-col items-center justify-center mb-2">
        <div className="flex items-center justify-start gap-2">
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
        <p className="text-white mb-4">No social media links added yet.</p>
      )}

      {/* Add Button only */}
      <div className="flex justify-center mb-4">
        <button
          onClick={handleAdd}
          className="border-2 border-white text-white px-4 py-2 rounded cursor-pointer "
        >
          + Add Social Link
        </button>
      </div>


      <div className="flex items-center justify-center">
        <button
          onClick={handleSave}
          disabled={loading}
          className="border-2 border-white text-white cursor-pointer px-4 py-2 rounded transition-colors"
        >
          {loading ? "Saving..." : "Save Links"}
        </button>
      </div>

      {/* Snackbar for notifications */}
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

export default SocialLinksSection;
