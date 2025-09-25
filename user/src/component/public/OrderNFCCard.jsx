import React from "react";
import { CreditCard, Hand } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx"; // decorative icon

const OrderNFCCard = () => {
  const { theme } = useTheme();

  return (
    <a
      href="https://techvibesbd.com/"
      target="_blank"
      rel="noopener noreferrer"
      className={`${theme.connectFormBg} relative flex items-center justify-center inner-glow p-3 rounded-xl w-full mx-auto text-center  cursor-pointer`}
    >
      {/* Centered icon + text */}
      <div className="flex items-center gap-3">
        <CreditCard size={32} className={theme.iconColor} />
        <h1 className={`text-lg font-bold ${theme.text}`}>
          Order Your Own NFC Card
        </h1>
        <Hand size={30} className={`  ${theme.iconColor}`} />
      </div>

      {/* Hand icon on the right */}
    </a>
  );
};

export default OrderNFCCard;
