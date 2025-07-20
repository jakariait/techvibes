import React from 'react';
import {MessagesSquare} from "lucide-react";

const GetInTouch = () => {
  return (
    <div className={"p-2"}>
      <h1
        className={
          "text-white flex gap-2 text-xl font-medium  items-center"
        }
      >
        <MessagesSquare />
        Get In Touch
      </h1>
    </div>
  );
};

export default GetInTouch;