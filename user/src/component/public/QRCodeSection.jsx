import React, { useState, useEffect } from "react";
import { Download, Share2 } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

const QRCodeSection = ({ user, profile }) => {
  const { theme } = useTheme();

  const [isVisible, setIsVisible] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState("");
  const [shareStatus, setShareStatus] = useState("");

  const qrCodeUrl = user?.qrCode;

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const downloadQR = async () => {
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);

      setDownloadStatus("Downloaded!");
      setTimeout(() => setDownloadStatus(""), 2000);
    } catch {
      setDownloadStatus("Error!");
      setTimeout(() => setDownloadStatus(""), 2000);
    }
  };

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "QR Code",
          text: "Scan this code to connect",
          url: qrCodeUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(qrCodeUrl);
        setShareStatus("Copied!");
        setTimeout(() => setShareStatus(""), 2000);
      } catch {
        setShareStatus("Error!");
        setTimeout(() => setShareStatus(""), 2000);
      }
    }
  };

  // Only Show If Users Wants To Default True
  if (!profile?.qrCodeIsActive) return null;

  return (
    <div
      className={`${theme.connectFormBg} inner-glow p-6 rounded-xl overflow-hidden transition-all duration-500 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div
        className={`flex flex-col items-center justify-center text-center space-y-6`}
      >
        {/* QR Image */}
        <div className={`bg-white rounded-2xl p-4 shadow`}>
          {qrCodeUrl ? (
            <img
              src={qrCodeUrl}
              alt="User QR Code"
              loading="lazy"
              className={`w-48 h-48`}
            />
          ) : (
            <div
              className={`w-48 h-48 bg-gray-200 animate-pulse rounded flex items-center justify-center`}
            >
              <span className={`text-gray-500 text-sm`}>No QR Code</span>
            </div>
          )}
        </div>

        {/* Tagline */}
        <div
          className={`${theme.text} text-sm font-light tracking-widest uppercase`}
        >
          Scan • Save • Connect
        </div>

        {/* Buttons */}
        <div className={`flex gap-4 justify-center items-center`}>
          <button
            onClick={downloadQR}
            className={`${theme.skillBgColor} ${theme.text} font-semibold py-2 px-5 rounded-lg inner-glow flex justify-center items-center gap-4 cursor-pointer`}
          >
            <Download className={`w-5 h-5`} />
            {downloadStatus || "Download"}
          </button>

          <button
            onClick={shareQR}
            className={`${theme.skillBgColor} ${theme.text} font-semibold py-2 px-5 rounded-lg inner-glow flex justify-center items-center gap-4 cursor-pointer`}
          >
            <Share2 className={`w-5 h-5`} />
            {shareStatus || "Share"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeSection;
