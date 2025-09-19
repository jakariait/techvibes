import React from "react";
import { CreditCard } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx"; // decorative icon

const OrderNFCCard = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`${theme.connectFormBg} inner-glow p-4 rounded-xl w-full mx-auto text-center`}
    >
      <div className="flex justify-center mb-6">
        <CreditCard size={60} className={`animate-bounce ${theme.iconColor}`} />
      </div>
      <h1 className={`text-3xl font-bold  mb-4 ${theme.text}`}>
        Order Your Own NFC Card
      </h1>
      <p className={` mb-6 ${theme.text}`}>
        Get a personalized NFC card with your own design. Perfect for
        networking, business, or personal use. Sleek, modern, and fully
        customizable!
      </p>
    </div>
  );
};

export default OrderNFCCard;
