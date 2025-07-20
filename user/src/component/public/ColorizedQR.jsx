import React, { useEffect, useRef, useState } from "react";

const ColorizedQR = ({
  base64Data,
  dotColor = "#000000",
  backgroundColor = "#ffffff",
}) => {
  const canvasRef = useRef(null);
  const [coloredBase64, setColoredBase64] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
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

      // Loop through each pixel
      for (let i = 0; i < data.length; i += 4) {
        const [r, g, b] = [data[i], data[i + 1], data[i + 2]];

        // Check if the pixel is dark (dot)
        if (r < 128 && g < 128 && b < 128) {
          data[i] = dotR;
          data[i + 1] = dotG;
          data[i + 2] = dotB;
        } else {
          // Otherwise treat as background
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

  return (
    <div className="flex flex-col items-center space-y-4">
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {coloredBase64 && (
        <img src={coloredBase64} alt="Colored QR Code" className="w-48 h-48" />
      )}
    </div>
  );
};

export default ColorizedQR;
