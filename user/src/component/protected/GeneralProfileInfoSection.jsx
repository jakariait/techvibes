import React, { useEffect, useState } from "react";
import { User, X } from "lucide-react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import useAuthUserStore from "../../store/AuthUserStore.jsx";
import LoadingLottie from "../public/LoadingLottie.jsx";

const apiURL = import.meta.env.VITE_API_URL;

const GeneralProfileInfoSection = ({ slug }) => {
  const { user, token } = useAuthUserStore();

  const isMainAdmin = user?.isMainAdmin;
  const isCorporate = user?.role === "corporate";
  const isNormal = user?.role === "normal";

  const [profileData, setProfileData] = useState(null);

  const [fields, setFields] = useState({
    prefix: "",
    suffix: "",
    designation: "",
    companyName: "",
    department: "",
    idNumber: "",
    bio: "",
    portfolio: "",
    cvUrl: "",
    bloodGroup: "",
    youtubeUrl: "",
    skills: [],
    profilePhotoShape: "without-cover-photo",
    qrCodeIsActive: true,
    themeAccessLevel: "dark",
    businessHours: { start: "", end: "" },
    businessDay: { start: "", end: "" },
    businessTimeZone: "BST",
    editDesignationCompany: false,
  });

  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const showSnackbar = (message, type = "success") => {
    setSnackbar({ open: true, message, type });
  };

  const closeSnackbar = () =>
    setSnackbar({ open: false, message: "", type: "success" });

  useEffect(() => {
    if (!slug || !token) return;
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiURL}/userbyslug/${slug}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(res.data);
        const profile = res.data?.profile || {};
        setFields((prev) => ({
          ...prev,
          ...profile,
        }));
      } catch (err) {
        console.error("Failed to fetch profile info", err);
        showSnackbar("Failed to load profile data", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, token]);

  const handleFieldChange = (field, value) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedFieldChange = (section, key, value) => {
    setFields((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleAddSkill = () => {
    const skill = newSkill.trim();
    if (!skill || fields.skills.includes(skill)) return;
    setFields((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
    setNewSkill("");
  };

  const handleRemoveSkill = (index) => {
    setFields((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.patch(`${apiURL}/profilebyslug/${slug}`, fields, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showSnackbar("Profile updated successfully");
    } catch (err) {
      console.error("Save error", err);
      showSnackbar("Failed to save", "error");
    } finally {
      setLoading(false);
    }
  };

  const properLabel = (str) =>
    str
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (s) => s.toUpperCase())
      .trim();

  // Designation and ID visibility logic works only for KlothStudio
  const shouldHideForCompany = user?.company === "691b46700f3b99a078f08b46";

  const showDesignationField =
    (isNormal ||
      isMainAdmin ||
      (isCorporate && fields.editDesignationCompany)) &&
    !shouldHideForCompany;

  const alwaysFields = ["prefix", "suffix", "bloodGroup"];

  const corporateFields = shouldHideForCompany
    ? ["department"]
    : ["department", "idNumber"];

  const normalUserFields = ["companyName"];

  const themeOptions = [
    { value: "dark", label: "Dark" },
    { value: "light", label: "Light" },
    { value: "magenta", label: "Magenta" },
    { value: "teal", label: "Teal" },
    { value: "royalBlue", label: "Royal Blue" },
    { value: "purpleHaze", label: "Purple Haze" },
    { value: "yellow", label: "Yellow" },
    { value: "cream", label: "Cream" },
    { value: "marrsGreen", label: "Marrs Green" },
    { value: "green", label: "Green" },
    { value: "black", label: "Black" },
    { value: "red", label: "Red" },
    { value: "gray", label: "Gray" },
  ];

  const availableThemeOptions = isMainAdmin
    ? themeOptions
    : themeOptions.filter(
        (theme) =>
          theme.value === "dark" ||
          theme.value === "light" ||
          user?.themePermission?.includes(theme.value),
      );

  if (loading) return <LoadingLottie />;

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl mb-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-4 justify-center">
        <User className="w-5 h-5 text-green-400" />
        <h2 className="text-base font-medium text-green-400">
          General Profile Info
        </h2>
      </div>

      {/* Designation (no toggle!) */}
      {showDesignationField && (
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
          <label className="text-white md:w-[180px] shrink-0">
            Designation:
          </label>
          <input
            type="text"
            placeholder="Enter Designation"
            value={fields.designation || ""}
            onChange={(e) => handleFieldChange("designation", e.target.value)}
            className="bg-[#212F35] text-white p-2 rounded border border-gray-600 flex-1 focus:outline-none"
          />
        </div>
      )}

      {/* Dynamic text fields (excluding designation) */}
      {[
        ...new Set([
          ...alwaysFields,
          ...(isCorporate || isMainAdmin ? corporateFields : []),
          ...(isNormal || isMainAdmin ? normalUserFields : []),
        ]),
      ].map((field) => (
        <div
          key={field}
          className="flex flex-col md:flex-row md:items-center gap-2 mb-3"
        >
          <label className="text-white md:w-[180px] shrink-0">
            {properLabel(field)}:
          </label>
          <input
            type="text"
            placeholder={`Enter ${properLabel(field)}`}
            value={fields[field] || ""}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            className="bg-[#212F35] text-white p-2 rounded border border-gray-600 flex-1 focus:outline-none"
          />
        </div>
      ))}

      {/* Bio */}
      <div className="flex flex-col md:flex-row md:items-start gap-2 mb-3">
        <label className="text-white md:w-[180px] pt-2">Bio:</label>
        <textarea
          rows={4}
          placeholder="Write your bio"
          value={fields.bio}
          onChange={(e) => handleFieldChange("bio", e.target.value)}
          className="bg-[#212F35] text-white p-2 rounded border border-gray-600 resize-y flex-1 focus:outline-none"
        />
      </div>

      {/* Corporate-only: Profile Photo Shape */}
      {(isCorporate || isMainAdmin) && (
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
          <label className="text-white md:w-[180px]">
            Profile Photo Shape:
          </label>
          <select
            value={fields.profilePhotoShape}
            onChange={(e) =>
              handleFieldChange("profilePhotoShape", e.target.value)
            }
            className="bg-[#212F35] text-white p-2 rounded border border-gray-600 flex-1 focus:outline-none"
          >
            <option value="square">Square</option>
            <option value="circle">Circle</option>
            <option value="without-cover-photo">Without Cover Photo</option>
          </select>
        </div>
      )}

      {/* Theme Access Level */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
        <label className="text-white md:w-[180px]">Theme Access:</label>
        <select
          value={fields.themeAccessLevel}
          onChange={(e) =>
            handleFieldChange("themeAccessLevel", e.target.value)
          }
          className="bg-[#212F35] text-white p-2 rounded border border-gray-600 flex-1 focus:outline-none"
        >
          {availableThemeOptions.map((theme) => (
            <option key={theme.value} value={theme.value}>
              {theme.label}
            </option>
          ))}
        </select>
      </div>

      {/* QR Code Toggle */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
        <label className="text-white md:w-[180px]">QR Code Active:</label>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={fields.qrCodeIsActive}
            onChange={(e) =>
              handleFieldChange("qrCodeIsActive", e.target.checked)
            }
          />
          <span className="text-white">
            {fields.qrCodeIsActive ? "Enabled" : "Disabled"}
          </span>
        </div>
      </div>

      {/* Corporate-only: Skills */}
      {(isCorporate || isMainAdmin) && (
        <>
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
            <label className="text-white md:w-[180px]">Skills:</label>
            <input
              type="text"
              placeholder="Add new skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="bg-[#212F35] text-white p-2 rounded border border-gray-600 flex-1 focus:outline-none"
            />
            <button
              onClick={handleAddSkill}
              className="border border-white text-white px-3 py-1 rounded cursor-pointer"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 ml-2 md:ml-[185px] mb-4">
            {fields.skills.map((skill, index) => (
              <div
                key={index}
                className="inner-glow text-white px-2 py-1 rounded flex items-center gap-1"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(index)}
                  className="text-red-500 p-1 rounded cursor-pointer"
                  aria-label={`Remove skill ${skill}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Corporate-only: Business Hours/Days */}
      {(isCorporate || isMainAdmin) && (
        <>
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
            <label className="text-white md:w-[180px]">Business Hours:</label>
            <input
              type="text"
              placeholder="Start (e.g. 09:00 AM)"
              value={fields.businessHours?.start || ""}
              onChange={(e) =>
                handleNestedFieldChange(
                  "businessHours",
                  "start",
                  e.target.value,
                )
              }
              className="bg-[#212F35] text-white p-2 rounded border border-gray-600 focus:outline-none"
            />
            <input
              type="text"
              placeholder="End (e.g. 06:00 PM)"
              value={fields.businessHours?.end || ""}
              onChange={(e) =>
                handleNestedFieldChange("businessHours", "end", e.target.value)
              }
              className="bg-[#212F35] text-white p-2 rounded border border-gray-600 focus:outline-none"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
            <label className="text-white md:w-[180px]">Business Days:</label>
            <input
              type="text"
              placeholder="Start Day (e.g. Saturday)"
              value={fields.businessDay?.start || ""}
              onChange={(e) =>
                handleNestedFieldChange("businessDay", "start", e.target.value)
              }
              className="bg-[#212F35] text-white p-2 rounded border border-gray-600 focus:outline-none"
            />
            <input
              type="text"
              placeholder="End Day (e.g. Thursday)"
              value={fields.businessDay?.end || ""}
              onChange={(e) =>
                handleNestedFieldChange("businessDay", "end", e.target.value)
              }
              className="bg-[#212F35] text-white p-2 rounded border border-gray-600 focus:outline-none"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
            <label className="text-white md:w-[180px]">
              Business Time Zone:
            </label>
            <input
              type="text"
              placeholder="e.g. BST"
              value={fields.businessTimeZone}
              onChange={(e) =>
                handleFieldChange("businessTimeZone", e.target.value)
              }
              className="bg-[#212F35] text-white p-2 rounded border border-gray-600 flex-1 focus:outline-none"
            />
          </div>
        </>
      )}

      {/* Bottom fields */}
      <div className="mt-6">
        {["portfolio", "cvUrl", "youtubeUrl"].map((field) => (
          <div
            key={field}
            className="flex flex-col md:flex-row md:items-center gap-2 mb-3"
          >
            <label className="text-white md:w-[180px] shrink-0">
              {properLabel(field)}:
            </label>
            <input
              type="text"
              placeholder={`Enter ${properLabel(field)}`}
              value={fields[field] || ""}
              onChange={(e) => handleFieldChange(field, e.target.value)}
              className="bg-[#212F35] text-white p-2 rounded border border-gray-600 flex-1 focus:outline-none"
            />
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleSave}
          disabled={loading}
          className="border-2 border-white text-white px-4 py-2 rounded cursor-pointer"
        >
          {loading ? "Saving..." : <>Save</>}
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

export default GeneralProfileInfoSection;
