import React from "react";
import { FolderOpen, FileText, ExternalLink } from "lucide-react";

const PortfolioAndCV = ({ profile }) => {
  if (!profile?.portfolio && !profile?.cvUrl) return null;

  const items = [
    {
      label: "Portfolio",
      icon: <FolderOpen className="w-5 h-5" />,
      url: profile.portfolio,
    },
    {
      label: "Curriculum Vitae (CV)",
      icon: <FileText className="w-5 h-5" />,
      url: profile.cvUrl,
    },
  ];

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl h-full text-white">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <FolderOpen className="w-5 h-5 text-white" />
        <h2 className="text-base font-medium text-white">Portfolio & CV</h2>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-3">
        {items
          .filter((item) => item.url)
          .map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between pb-2"
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PortfolioAndCV;
