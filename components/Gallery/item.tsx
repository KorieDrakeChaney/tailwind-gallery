"use client";
import { useTheme } from "../../contexts/ThemeContext";
import React, { useState } from "react";
import { FaCode } from "react-icons/fa";

type GalleryItemProps = {
  component: React.ReactNode;
};

const GalleryItem = ({ component }: GalleryItemProps) => {
  const { isDark } = useTheme();
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="relative h-10 w-10 bg-gray-200">
      <div>{component}</div>
      <button
        className="absolute right-0 top-0 opacity-50 hover:opacity-100"
        onClick={() => setShowCode(true)}
      >
        <FaCode size={25} color={isDark ? "white" : "dark"}></FaCode>
      </button>
    </div>
  );
};

export default GalleryItem;
