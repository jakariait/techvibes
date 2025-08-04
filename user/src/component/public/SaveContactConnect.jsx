
import React, { useState } from "react";
import { Download, MessageCircle } from "lucide-react";
import ConnectForm from "./ConnectForm.jsx";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ImageComponent from "./ImageComponent.jsx";

const apiURL = import.meta.env.VITE_API_URL;

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
      const convertImageToBase64 = async (url) => {
        try {
          const response = await fetch(url);
          const blob = await response.blob();

          return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";

            img.onload = () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");

              // Resize to reasonable size (max 128px)
              const maxSize = 128;
              let { width, height } = img;
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

              // Fill white background
              ctx.fillStyle = "#FFFFFF";
              ctx.fillRect(0, 0, width, height);
              ctx.drawImage(img, 0, 0, width, height);

              // Use PNG format
              const dataUrl = canvas.toDataURL("image/png");
              const base64 = dataUrl.split(",")[1];

              resolve(base64);
            };

            img.onerror = (error) => {
              reject(new Error(`Failed to load image: ${error.message}`));
            };

            img.src = URL.createObjectURL(blob);
          });
        } catch (error) {
          throw new Error(`Failed to convert image: ${error.message}`);
        }
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
        } else if (typeof company.locations === 'object' && company.locations !== null) {
          locationsToUse = [company.locations];
        }
      } else if (profile?.locations) {
        if (Array.isArray(profile.locations)) {
          locationsToUse = profile.locations;
        } else if (typeof profile.locations === 'object' && profile.locations !== null) {
          locationsToUse = [profile.locations];
        }
      }

      const locationLines = locationsToUse
        .filter((l) => l?.value)
        .map((l) => `ADR;TYPE=${(l.label || "WORK").toUpperCase()}:;;${l.value};;;;`)
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

    } catch (error) {
    }
  };


  return (
    <div className={"flex items-center justify-center gap-5 mt-5 mb-5"}>
      <button
        onClick={handleSaveContact}
        className="bg-[#4E4E4E] text-white font-semibold py-2 px-5 rounded-lg inner-glow flex justify-center items-center gap-4 cursor-pointer"
      >
        <Download />
        Save Contact
      </button>
      <button
        onClick={handleOpen}
        className="bg-[#4E4E4E] text-white font-semibold py-2 px-5 rounded-lg inner-glow flex justify-center items-center gap-4 cursor-pointer"
      >
        <MessageCircle />
        Connect
      </button>

      {/* MUI Dialog with ConnectForm */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#212F35",
          },
        }}
      >
        <DialogTitle className="relative text-white px-6 pt-6 pb-4">
          <IconButton
            onClick={handleClose}
            className="!absolute top-2 right-2"
            aria-label="close"
          >
            <CloseIcon sx={{ color: "#fff" }} />
          </IconButton>

          <div className="flex flex-col gap-2 items-center justify-center">
            <ImageComponent
              imageName={profile?.profilePhoto}
              className="h-40 w-40 object-cover rounded-full"
            />
            <p>Connect with {user.fullName}</p>
          </div>
        </DialogTitle>

        <DialogContent dividers>
          <ConnectForm userId={user._id} onSuccess={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SaveContactConnect;

