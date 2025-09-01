import React, { useState } from "react";
import { Download, MessageCircle } from "lucide-react";
import ConnectForm from "./ConnectForm.jsx";
import ImageComponent from "./ImageComponent.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

const apiURL = import.meta.env.VITE_API_URL;

const CustomDialog = ({ open, onClose, children, theme }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
      <div
        className={`${theme.connectFormBg} ${theme.text} rounded-lg shadow-lg p-6 w-full max-w-sm relative`}
      >
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-2 right-2 text-red-500 hover:text-red-700"
          aria-label="close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

const SaveContactConnect = ({ profile, user, company }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  const handleSaveContact = async () => {
    try {
      if (!user?.fullName) {
        return;
      }

      // Simple and reliable base64 conversion with resizing
      const convertImageToBase64 = (url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous";

          img.onload = () => {
            setTimeout(() => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");

              const maxSize = 128;
              let width = img.width;
              let height = img.height;

              if (width > maxSize || height > maxSize) {
                if (width > height) {
                  height = (height * maxSize) / width;
                  width = maxSize;
                } else {
                  width = (width * maxSize) / height;
                  height = maxSize;
                }
              }

              canvas.width = width;
              canvas.height = height;
              ctx.fillStyle = "#FFFFFF";
              ctx.fillRect(0, 0, width, height);
              ctx.drawImage(img, 0, 0, width, height);

              const dataUrl = canvas.toDataURL("image/png");
              const base64 = dataUrl.split(",")[1];
              resolve(base64);
            }, 50); // slight delay to ensure image is fully decoded/rendered
          };

          img.onerror = (error) => reject(new Error("Failed to load image"));
          img.src = url; // ✅ Load directly via URL (NOT blob)
        });
      };

      let photoData = "";

      if (profile?.profilePhoto) {
        const imageUrl = `${apiURL.replace("/api", "")}/uploads/${profile.profilePhoto}`;

        try {
          const base64 = await convertImageToBase64(imageUrl);

          // Determine file type
          const fileExtension = profile.profilePhoto
            .split(".")
            .pop()
            .toLowerCase();
          const imageType = fileExtension === "png" ? "PNG" : "JPEG";

          // Use simple base64 encoding (no line wrapping for now)
          photoData = `PHOTO;ENCODING=b;TYPE=${imageType}:${base64}`;
        } catch (err) {
          // Fallback: try with photo URL instead of embedded
          photoData = `PHOTO;VALUE=URL:${imageUrl}`;
        }
      }

      // Build vCard fields
      const companyName =
        user?.role === "corporate"
          ? company?.companyName
          : profile?.companyName;

      const emailLines = (profile?.emails || [])
        .filter((e) => e?.value)
        .map(
          (e) => `EMAIL;TYPE=${(e.label || "WORK").toUpperCase()}:${e.value}`,
        )
        .join("\r\n");

      const phoneLines = (profile?.phones || [])
        .filter((p) => p?.value)
        .map(
          (p) => `TEL;TYPE=${(p.label || "MOBILE").toUpperCase()}:${p.value}`,
        )
        .join("\r\n");

      // Handle locations: Use company.locations if role is corporate, else profile.locations
      // Handle both array and single object cases
      let locationsToUse = [];

      if (user?.role === "corporate" && company?.locations) {
        if (Array.isArray(company.locations)) {
          locationsToUse = company.locations;
        } else if (
          typeof company.locations === "object" &&
          company.locations !== null
        ) {
          locationsToUse = [company.locations];
        }
      } else if (profile?.locations) {
        if (Array.isArray(profile.locations)) {
          locationsToUse = profile.locations;
        } else if (
          typeof profile.locations === "object" &&
          profile.locations !== null
        ) {
          locationsToUse = [profile.locations];
        }
      }

      const locationLines = locationsToUse
        .filter((l) => l?.value)
        .map(
          (l) =>
            `ADR;TYPE=${(l.label || "WORK").toUpperCase()}:;;${l.value};;;;`,
        )
        .join("\r\n");

      const socialLinks = (profile?.socialMedia || [])
        .filter((s) => s?.url)
        .map(
          (s) => `URL;TYPE=${(s.platform || "SOCIAL").toUpperCase()}:${s.url}`,
        )
        .join("\r\n");

      // Create vCard 3.0 (most compatible)
      let vcard = `BEGIN:VCARD\r\nVERSION:3.0\r\nFN:${user.fullName}\r\nN:${user.fullName};;;;`;

      if (photoData) {
        vcard += `\r\n${photoData}`;
      }

      if (companyName) vcard += `\r\nORG:${companyName}`;
      if (profile?.designation) vcard += `\r\nTITLE:${profile.designation}`;
      if (emailLines) vcard += `\r\n${emailLines}`;
      if (phoneLines) vcard += `\r\n${phoneLines}`;
      if (locationLines) vcard += `\r\n${locationLines}`;
      if (socialLinks) vcard += `\r\n${socialLinks}`;
      if (profile?.bio) vcard += `\r\nNOTE:${profile.bio}`;
      if (profile?.bloodGroup)
        vcard += `\r\nNOTE:Blood Group: ${profile.bloodGroup}`;
      vcard += `\r\nEND:VCARD`;

      // Download the file
      const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
      const fileName = `${user.fullName.replace(/\s+/g, "_")}_contact.vcf`;

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.style.display = "none";

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {}
  };

  const { theme } = useTheme();
  return (
    <div className={"flex items-center justify-center gap-5 mt-5 mb-5"}>
      <button
        onClick={handleSaveContact}
        className={`${theme.background} ${theme.text} font-semibold py-2 px-5 rounded-lg inner-glow flex justify-center items-center gap-4 cursor-pointer`}
      >
        <Download />
        Save Contact
      </button>
      <button
        onClick={handleOpen}
        className={`${theme.background} ${theme.text} font-semibold py-2 px-5 rounded-lg inner-glow flex justify-center items-center gap-4 cursor-pointer`}
      >
        <MessageCircle />
        Connect
      </button>

      <CustomDialog open={openDialog} onClose={handleClose} theme={theme}>
        <div className="flex flex-col gap-2 items-center justify-center">
          <ImageComponent
            imageName={profile?.profilePhoto}
            className="h-40 w-40 object-cover rounded-full"
          />
          <p>Connect with {user.fullName}</p>
        </div>

        <div className="border-t border-gray-500 mt-4 pt-4">
          <ConnectForm userId={user._id} onSuccess={handleClose} />
        </div>
      </CustomDialog>
    </div>
  );
};

export default SaveContactConnect;
