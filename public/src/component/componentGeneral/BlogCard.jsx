import React from "react";

const BlogCard = ({
  title,
  image,
  authorImage,
  authorName,
  date,
  description,
}) => {
  return (
    <div className="w-full sm:max-w-sm flex flex-col gap-6 transform transition-transform duration-300 hover:-translate-y-2">
      <div className="group relative self-stretch h-72 rounded-lg bg-cover bg-center flex items-center justify-center cursor-pointer overflow-hidden">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <h3 className="text-gray-100 text-2xl font-['Bruno_Ace'] break-word">
          {title}
        </h3>
        <div className="flex flex-col gap-4">
          <p className="text-gray-300 text-xs font-['Bruno_Ace'] break-word h-12">
            {description}
          </p>
          <div className="flex items-center gap-3">
            <img
              className="w-8 h-8 rounded-full"
              src={authorImage}
              alt={authorName}
            />
            <div className="text-gray-400 text-[10px] font-['Bruno_Ace'] break-word">
              {authorName} &middot; {date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
