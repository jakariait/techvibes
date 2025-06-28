import React from "react";
import { Download, Share2 } from "lucide-react";

const QrCodeSection = () => {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
        <QrCodeSection className="w-4 h-4" /> QR Code
      </h3>
      <div className="bg-white rounded-lg p-6 text-center border border-gray-100 shadow-sm">
        <div className="w-32 h-32 bg-gray-100 border-2 border-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
          <QrCodeSection className="w-16 h-16 text-gray-400" />
        </div>
        <div className="flex gap-2">
          <button className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4" /> Download
          </button>
          <button
            // onClick={handleShare}
            className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrCodeSection;
