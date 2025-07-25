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
        alert("Missing user info");
        return;
      }

      console.log("⏳ Saving contact...");

      // Convert any image URL to base64 PNG (with canvas)
      const getBase64AsPNG = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous";

          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Resize image to reasonable size for vCard (max 128px for iOS)
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

            const pngDataUrl = canvas.toDataURL("image/png");
            const base64 = pngDataUrl.split(",")[1];

            resolve({ base64, extension: "png" });
            URL.revokeObjectURL(img.src);
          };

          img.onerror = (error) => {
            console.error("Image load error:", error);
            reject(new Error("Failed to load image for conversion"));
          };

          img.src = URL.createObjectURL(blob);
        });
      };

      // Helper function to wrap base64 data at 75 characters per line (no leading space)
      const wrapBase64 = (base64String) => {
        const chunks = [];
        for (let i = 0; i < base64String.length; i += 75) {
          chunks.push(base64String.substring(i, i + 75));
        }
        return chunks.join("\r\n");
      };

      let base64 = "";
      let photoData = "";

      if (profile?.profilePhoto) {
        const imageUrl = `${apiURL.replace("/api", "")}/uploads/${
          profile.profilePhoto
        }`;
        console.log("🖼️ Processing image:", imageUrl);

        try {
          const imageData = await getBase64AsPNG(imageUrl);
          base64 = imageData.base64;

          // Format photo data for vCard 3.0 (PNG)
          const wrappedBase64 = wrapBase64(base64);
          photoData = `PHOTO;ENCODING=BASE64;TYPE=PNG:${wrappedBase64}`;

          console.log("✅ Image converted to PNG base64, size:", base64.length);
        } catch (err) {
          console.warn("⚠️ Image conversion failed:", err.message);
          photoData = "";
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

      const locationLines = (profile?.locations || [])
        .filter((l) => l?.value)
        .map(
          (l) => `ADR;TYPE=${(l.label || "WORK").toUpperCase()}:;;${l.value}`,
        )
        .join("\r\n");

      const socialLinks = (profile?.socialMedia || [])
        .filter((s) => s?.url)
        .map(
          (s) => `URL;TYPE=${(s.platform || "SOCIAL").toUpperCase()}:${s.url}`,
        )
        .join("\r\n");

      // Compose vCard with proper formatting for iOS (PHOTO after FN, no extra spaces)
      let vcard = `BEGIN:VCARD\r\nVERSION:3.0\r\nN:${user.fullName}\r\nFN:${user.fullName}`;

      if (photoData) {
        vcard += `\r\n${photoData}`;
        console.log("📸 Photo added to vCard");
      }
      if (companyName) vcard += `\r\nORG:${companyName}`;
      if (profile?.designation) vcard += `\r\nTITLE:${profile.designation}`;
      if (emailLines) vcard += `\r\n${emailLines}`;
      if (phoneLines) vcard += `\r\n${phoneLines}`;
      if (locationLines) vcard += `\r\n${locationLines}`;
      if (socialLinks) vcard += `\r\n${socialLinks}`;
      if (profile?.bio) vcard += `\r\nNOTE:${profile.bio}`;
      vcard += `\r\nEND:VCARD`;

      console.log("📄 vCard created, length:", vcard.length);

      // Trigger file download
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

      const photoStatus = photoData ? "with photo" : "without photo";
      console.log(`✅ Contact saved ${photoStatus}`);
    } catch (error) {
      console.error("❌ Error saving contact:", error);
      alert("Something went wrong while saving contact.");
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
            backgroundColor: "#212F35", // light cyan
          },
        }}
      >
				<DialogTitle className="relative text-white px-6 pt-6 pb-4">
					{/* Close button absolutely positioned in top right */}
					<IconButton
						onClick={handleClose}
						className="!absolute top-2 right-2"
						aria-label="close"
					>
						<CloseIcon sx={{ color: "#fff" }} />
					</IconButton>

					{/* Centered content */}
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
