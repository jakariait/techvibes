import React, { useEffect, useRef, useState } from "react";
import { QrCode } from "lucide-react";
import { HexColorPicker } from "react-colorful";

const ColorizedQR = ({
  base64Data,
  dotColor: initialDotColor = "#000000",
  backgroundColor: initialBackgroundColor = "#ffffff",
}) => {
  const canvasRef = useRef(null);
  const [dotColor, setDotColor] = useState(initialDotColor);
  const [backgroundColor, setBackgroundColor] = useState(
    initialBackgroundColor,
  );
  const [coloredBase64, setColoredBase64] = useState("");

  useEffect(() => {
    if (!base64Data) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new window.Image();
    img.src = base64Data;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const hexToRgb = (hex) => {
        const bigint = parseInt(hex.replace("#", ""), 16);
        return {
          r: (bigint >> 16) & 255,
          g: (bigint >> 8) & 255,
          b: bigint & 255,
        };
      };

      const { r: dotR, g: dotG, b: dotB } = hexToRgb(dotColor);
      const { r: bgR, g: bgG, b: bgB } = hexToRgb(backgroundColor);

      for (let i = 0; i < data.length; i += 4) {
        const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
        if (r < 128 && g < 128 && b < 128) {
          data[i] = dotR;
          data[i + 1] = dotG;
          data[i + 2] = dotB;
        } else {
          data[i] = bgR;
          data[i + 1] = bgG;
          data[i + 2] = bgB;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      const newBase64 = canvas.toDataURL("image/png");
      setColoredBase64(newBase64);
    };
  }, [base64Data, dotColor, backgroundColor]);

  const handleDownload = () => {
    if (!coloredBase64) return;
    const link = document.createElement("a");
    link.href = coloredBase64;
    link.download = "colorized-qr.png";
    link.click();
  };

  return (
    <div className="bg-[#212F35] inner-glow p-6 rounded-xl max-w-7xl mx-auto flex flex-col items-center space-y-6">
      <div className="flex items-center justify-center gap-2 mb-2">
        <QrCode className="w-5 h-5 text-green-400" />
        <h2 className="text-base font-medium text-green-400">
          Customize QR Code
        </h2>
      </div>

      {/* Color pickers with react-colorful */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center">
          <span className="text-white mb-2">Dot Color</span>
          <HexColorPicker color={dotColor} onChange={setDotColor} />
          <input
            type="text"
            value={dotColor}
            onChange={(e) => setDotColor(e.target.value)}
            className="mt-2 px-2 py-1 rounded bg-gray-100 text-black focus:outline-none"
          />
        </div>

        <div className="flex flex-col items-center">
          <span className="text-white mb-2">Background</span>
          <HexColorPicker
            color={backgroundColor}
            onChange={setBackgroundColor}
          />
          <input
            type="text"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="mt-2 px-2 py-1 rounded bg-gray-100 text-black focus:outline-none"
          />
        </div>
      </div>

      {/* Hidden canvas */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Preview */}
      {coloredBase64 && (
        <img src={coloredBase64} alt="Colored QR Code" className="w-48 h-48" />
      )}

      {/* Download Button */}
      <button
        type="button"
        onClick={handleDownload}
        disabled={!coloredBase64}
        className="border-2 border-white text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50 cursor-pointer"
      >
        Download QR
      </button>
    </div>
  );
};

export default ColorizedQR;
