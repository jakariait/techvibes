import React from "react";
import imgProperty1Default from "../../assets/eclipse.png";


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

const TheGoal = () => {
  return (
    <div className={"relative overflow-hidden"}>
      <Ellipse className="absolute  left-0 size-360 top-16" />

      <div className={"md:w-2/3 mx-auto text-center p-4 py-40 relative z-20"}>
        <h1 className="bg-[linear-gradient(90deg,#4E52FB_32.39%,#20ACF7_68.01%)] bg-clip-text text-transparent text-[64px]  ">
          The Goal
        </h1>
        <div className="text-[24px] text-[#F0F0F0] flex flex-col gap-4">
          <p>
            Our mission is simple — to eliminate paper business cards and the
            waste and pollution they create. With our smart digital business
            cards, we empower seamless and meaningful business connections all
            over the world.
          </p>
          <p>
            At the same time, we give you the opportunity to contribute to a
            greener, more sustainable planet. Every digital share means less
            waste, fewer trees cut down, and a smarter future for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TheGoal;
