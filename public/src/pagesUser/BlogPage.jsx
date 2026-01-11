import React from "react";
import Layout from "../component/componentGeneral/Layout.jsx";
import AddressGrid from "../component/componentGeneral/AddressGrid.jsx";
import imgProperty1Default from "../assets/eclipse.png";
import AllBlog from "../component/componentGeneral/AllBlog.jsx";
import BlogSingle from "../component/componentGeneral/BlogSingle.jsx";
import TestingCode from "../component/TestingCode.jsx";

function Ellipse({ className }) {
  return (
    <div data-node-id="1:2555" className={className}>
      <div className="absolute inset-[-4.19%]">
        <img
          className="block max-w-none size-full"
          alt=""
          height="1560.6"
          src={imgProperty1Default}
          width="1560.6"
        />
      </div>
    </div>
  );
}

const BlogPage = () => {
  return (
    <Layout>
      <div className="relative overflow-hidden">

        <TestingCode/>
        <AllBlog />
        <BlogSingle />
        <Ellipse className="absolute  left-0 size-[1440px] globe-bg" />

        <div className={"pt-20"}>
          <AddressGrid isBackground={false} />
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
