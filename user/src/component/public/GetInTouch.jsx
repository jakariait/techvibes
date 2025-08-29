import React from "react";
import { MessagesSquare } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

const GetInTouch = () => {
  const { theme } = useTheme();

  return (
    <div className={"p-2"}>
      <h1
        className={` ${theme.text} flex gap-2 text-xl font-medium  items-center `}
      >
        <MessagesSquare />
        Get In Touch
      </h1>
    </div>
  );
};

export default GetInTouch;
