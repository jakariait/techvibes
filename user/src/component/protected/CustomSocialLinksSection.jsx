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

// Sortable item
const SortableCustomItem = ({ id, link, handleChange, handleRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 mb-2 p-2 rounded inner-glow"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-move p-1 text-gray-500 hover:text-gray-700"
        title="Drag to reorder"
      >
        ⋮⋮
      </div>

      <input
        type="text"
        value={link.platform || ""}
        onChange={(e) => handleChange(id, "platform", e.target.value)}
        placeholder="Platform"
        className="bg-[#212F35] text-white p-2 rounded w-[120px] focus:outline-none border border-gray-600"
      />
      <input
        type="text"
        value={link.url || ""}
        onChange={(e) => handleChange(id, "url", e.target.value)}
        placeholder="Enter URL"
        className="text-white focus:outline-none rounded flex-1 min-w-[80px] border border-gray-600 p-2"
      />
      <button
        onClick={() => handleRemove(id)}
        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
        title="Remove"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

const CustomSocialLinksSection = ({slug}) => {
  const {  token } = useAuthUserStore();

  const [links, setLinks] = useState([]);
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
  const closeSnackbar = () => setSnackbar({ open: false });

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
        const fetchedLinks = (data?.profile?.customSocialMedia || []).map(
          (link, index) => ({
            ...link,
            order: typeof link.order === "number" ? link.order : index,
            id: link.id || `custom-link-${Date.now()}-${index}`,
          }),
        );
        setLinks(fetchedLinks);
      } catch (err) {
        showSnackbar("Failed to fetch custom social links", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [slug]);

  const handleAdd = () => {
    const newEntry = {
      id: `custom-link-${Date.now()}-${Math.random()}`,
      platform: "",
      url: "",
      order: links.length,
    };
    setLinks((prev) => [...prev, newEntry]);
    showSnackbar("New row added");
  };


  const handleChange = (id, field, value) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, [field]: value } : link)),
    );
  };

  const handleRemove = (id) => {
    setLinks((prev) =>
      prev.filter((link) => link.id !== id).map((l, i) => ({ ...l, order: i })),
    );
    showSnackbar("Custom link removed!");
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setLinks((prev) => {
      const oldIndex = prev.findIndex((link) => link.id === active.id);
      const newIndex = prev.findIndex((link) => link.id === over.id);
      return arrayMove(prev, oldIndex, newIndex).map((link, i) => ({
        ...link,
        order: i,
      }));
    });
  };

  const handleSave = async () => {
    const invalid = links.some((link) => !link.platform || !link.url);
    if (invalid) {
      return showSnackbar("All fields are required", "error");
    }

    try {
      setLoading(true);
      await axios.patch(
        `${apiURL}/profilebyslug/${slug}`,
        { customSocialMedia: links },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      showSnackbar("Custom social links saved!");
    } catch (err) {
      showSnackbar(err.response?.data?.message || "Failed to save", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingLottie />;

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden ">
      <div className="flex flex-col items-center justify-center mb-2">
        <div className="flex items-center justify-start gap-2">
          <Link2 className="w-5 h-5 text-green-400" />
          <h2 className="text-base font-medium text-green-400">
            Custom Social Media Links
          </h2>
        </div>
        <span className="text-sm text-gray-500">
          Drag and drop to rearrange
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
              <SortableCustomItem
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
        <p className="text-white mb-4">No custom links added yet.</p>
      )}

      <div className="flex justify-center mb-4">
        <button
          onClick={handleAdd}
          className="border-2 border-white text-white px-4 py-2 rounded cursor-pointer "
        >
          + Add Custom Link
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

export default CustomSocialLinksSection;
