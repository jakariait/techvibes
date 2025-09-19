import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, ArrowUp, ArrowDown } from "lucide-react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useAuthUserStore from "../../store/AuthUserStore.jsx";

const apiURL = import.meta.env.VITE_API_URL;

// Define your available sections with readable labels
const allSections = [
  { key: "designations", label: "Designations" },
  { key: "skills", label: "Skills" },
  { key: "productAndServices", label: "Products & Services" },
  { key: "emails", label: "Emails" },
  { key: "phones", label: "Phone Numbers" },
  { key: "whatsapp", label: "WhatsApp Numbers" },
  { key: "locations", label: "Address" },
  { key: "sisterConcerns", label: "Sister Concerns" },
  { key: "businessHours", label: "Business Hours" },
  { key: "portfolio", label: "Portfolio & CV" },
  { key: "youtube", label: "YouTube Video" },
];

const SortableItem = ({ id, label, index, onMove, isFirst, isLast }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between bg-[#1a2a30] text-white p-3 rounded-lg shadow"
    >
      <span
        className="flex flex-1 items-center gap-3 cursor-grab"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-5 h-5 text-gray-400" />
        <span className="font-medium">{label}</span>
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onMove(index, "up")}
          disabled={isFirst}
          className="p-1.5 rounded-full text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Move up"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
        <button
          onClick={() => onMove(index, "down")}
          disabled={isLast}
          className="p-1.5 rounded-full text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Move down"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>
    </li>
  );
};

const SectionOrderEditor = ({ slug, user }) => {
  const isCorporate = user?.role === "corporate";

  const AVAILABLE_SECTIONS = React.useMemo(() => {
    return isCorporate
      ? allSections
      : allSections.filter(
          (section) =>
            !["skills", "sisterConcerns", "businessHours"].includes(
              section.key,
            ),
        );
  }, [isCorporate]);

  const { token } = useAuthUserStore();
  const [sectionOrder, setSectionOrder] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  // Mobile + desktop drag support
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }),
  );

  const showSnackbar = (message, type = "success") => {
    setSnackbar({ open: true, message, type });
  };

  const closeSnackbar = () => {
    setSnackbar({ open: false, message: "", type: "success" });
  };

  useEffect(() => {
    const fetchSectionOrder = async () => {
      try {
        const res = await axios.get(`${apiURL}/userbyslug/${slug}`);
        const fetchedOrder =
          res.data.profile.sectionOrder || AVAILABLE_SECTIONS.map((s) => s.key);
        setSectionOrder(fetchedOrder);
      } catch (err) {
        // showSnackbar("Failed to load section order", "error");
      }
    };
    fetchSectionOrder();
  }, [slug, AVAILABLE_SECTIONS]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sectionOrder.indexOf(active.id);
    const newIndex = sectionOrder.indexOf(over.id);
    const newOrder = arrayMove(sectionOrder, oldIndex, newIndex);
    setSectionOrder(newOrder);
  };

  const moveSection = (index, direction) => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sectionOrder.length) {
      return;
    }
    const newOrder = arrayMove(sectionOrder, index, newIndex);
    setSectionOrder(newOrder);
  };

  const handleSave = async () => {
    try {
      await axios.patch(
        `${apiURL}/profilebyslug/${slug}`,
        { sectionOrder },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      showSnackbar("Section order saved successfully!");
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to save section order", "error");
    }
  };

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl max-w-7xl mx-auto">
      <div className="flex flex-col items-center justify-center mb-4">
        <div className="flex items-center justify-start gap-2">
          <GripVertical className="w-5 h-5 text-yellow-400" />
          <h2 className="text-lg font-semibold text-yellow-400">
            Reorder Profile Sections
          </h2>
        </div>
        <span className="text-sm text-gray-400 mt-1">
          Drag and drop or use arrows to rearrange
        </span>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sectionOrder}
          strategy={verticalListSortingStrategy}
        >
          <ul className="space-y-2">
            {sectionOrder.map((key, index) => {
              const section = AVAILABLE_SECTIONS.find((s) => s.key === key);
              return section ? (
                <SortableItem
                  key={key}
                  id={key}
                  label={section.label}
                  index={index}
                  onMove={moveSection}
                  isFirst={index === 0}
                  isLast={index === sectionOrder.length - 1}
                />
              ) : null;
            })}
          </ul>
        </SortableContext>
      </DndContext>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleSave}
          className="border-2 border-white text-white cursor-pointer px-4 py-2 rounded transition-colors"
        >
          Save Order
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

export default SectionOrderEditor;
