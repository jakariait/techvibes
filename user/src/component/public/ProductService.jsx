import React from "react";
import { Package, ExternalLink } from "lucide-react";
import {useTheme} from "../../context/ThemeContext.jsx";

const ProductService = ({ profile }) => {

  const { theme } = useTheme();

  const services = profile?.productAndServices || [];

  return Array.isArray(services) && services.length > 0 ? (
    <div
      className={`${theme.connectFormBg} inner-glow p-4 rounded-xl overflow-hidden h-full`}
    >
      {/* Header */}
      <div className={`flex items-center gap-2 mb-4`}>
        <Package className={`w-5 h-5 ${theme.iconColor}`} />
        <h2 className={`text-base font-medium ${theme.iconColor}`}>Service</h2>
      </div>

      {/* Services List */}
      <div className={`${theme.text} flex flex-col gap-2`}>
        {services?.map((item, index) => {
          const label = typeof item === "string" ? item : item.label;
          const value = typeof item === "object" && item.value;

          return (
            <div
              key={item._id || index}
              className={`flex items-start justify-between gap-2`}
            >
              <div className={`flex items-start gap-2`}>
                <span className={`${theme.text} text-lg leading-none`}>•</span>
                <span className={`text-sm`}>{label}</span>
              </div>

              {value && (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${theme.externalLinkColor} transition-colors`}
                >
                  <ExternalLink className={`w-5 h-5`} />
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default ProductService;
