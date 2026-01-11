import React from "react";
import BlogCard from "./BlogCard.jsx";

import blog1 from "../../assets/blog/Frame 2147229274.png";
import blog2 from "../../assets/blog/Frame 2147229277.png";
import blog3 from "../../assets/blog/Frame 2147229278.png";
import author from "../../assets/blog/download (55).jpg";

const AllBlog = () => {
  const blogs = [
    {
      title: "NFC Tags At Home",
      image: blog1,
      description:
        "After returning from a trade show in 2019 with over 90 paper business cards, I knew there had to be a better way.",
      authorImage: author,
      authorName: "Jonathan Wills",
      date: "19 Jan 2025",
    },
    {
      title: "NFC Tags At App",
      image: blog2,
      description:
        "Discover how NFC tags are revolutionizing mobile applications, enabling seamless interactions and creating new user experiences.",
      authorImage: author,
      authorName: "Jane Doe",
      date: "22 Jan 2025",
    },
    {
      title: "NFC Tags At Phone",
      image: blog3,
      description:
        "Your smartphone is more powerful than you think. Learn how to use the built-in NFC capabilities of your phone for automation.",
      authorImage: author,
      authorName: "John Smith",
      date: "25 Jan 2025",
    },
  ];

  return (
    <div className=" text-white">
      <div className="xl:container xl:mx-auto px-4 pt-5 pb-40">
        <h1 className="text-center text-[#4E52FB] text-4xl sm:text-5xl  mb-12 sm:mb-16">
          Recent Blog Posts
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {blogs.map((blog, index) => (
            <BlogCard
              key={index}
              title={blog.title}
              image={blog.image}
              description={blog.description}
              authorImage={blog.authorImage}
              authorName={blog.authorName}
              date={blog.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBlog;
