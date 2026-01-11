import React from "react";
import author from "../../assets/blog/download (55).jpg";
import blog1 from "../../assets/blog/Frame 2147229274.png";

const BlogSingle = () => {
  return (
    <div className=" text-white p-4">
      <div className="xl:container xl:mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6">
            <h1 className="text-[#4E52FB] text-3xl md:text-4xl  ">
              NFC Tags At Home
            </h1>
            <div className="text-[#F0F0F0] text-lg md:text-xl  break-word leading-relaxed space-y-4">
              <p>
                Our mission is simple — to eliminate paper business cards and
                the waste and pollution they create.
              </p>
              <p>
                With our smart digital business cards, we empower seamless and
                meaningful business connections all over the world.
              </p>
              <p>
                At the same time, we give you the opportunity to contribute to a
                greener, more sustainable planet.
              </p>
              <p>
                Every digital share means less waste, fewer trees cut down, and
                a smarter future for everyone.
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <img
                className="w-10 h-10 rounded-full"
                src={author}
                alt="Author"
              />
              <div className="text-gray-400 text-sm  break-word">
                Jonathan Wills &middot; 19 Jan 2025
              </div>
            </div>
          </div>

          {/* Image/Video Content */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden group cursor-pointer">
            <img
              src={blog1}
              alt="Blog post video"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSingle;
