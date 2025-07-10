import React from "react";
import { Package } from "lucide-react";

const ProductService = ({ profile }) => {
  const services = profile.productAndServices;

  return Array.isArray(services) && services.length > 0 ? (

      <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden h-full">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5 text-white" />
          <h2 className="text-base font-medium text-white">
            Product & Service
          </h2>
        </div>
        {/* Services List */}
        <div className="text-white flex flex-col gap-2">
          {services.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-white text-lg leading-none">•</span>
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
  ) : null;
};

export default ProductService;
