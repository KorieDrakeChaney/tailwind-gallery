"use client";

import React, { useState } from "react";

import { FaChevronDown } from "react-icons/fa6";
import { Button } from "@/components/";
import { useTheme } from "@/contexts";

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const { isDark } = useTheme();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!hasClicked) {
      setHasClicked(true);
    }
  };
  return (
    <div className="relative inline-block flex flex-col justify-between text-left">
      <Button onClick={toggleOpen} type="button" color="secondary">
        <span className="mx-2 text-txt">Options</span>
        <FaChevronDown size={20} color={isDark ? "white" : "black"} />
      </Button>
      <div
        key={isOpen.toString()}
        className={
          isOpen
            ? `animate-fade-down ease-out animate-normal animate-duration-100`
            : hasClicked
              ? `pointer-events-none animate-fade-down ease-out animate-reverse animate-duration-100`
              : "invisible"
        }
      >
        <div className="absolute right-0 z-10 mt-2 flex w-56 origin-top-right flex-col justify-between  rounded-md bg-secondary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <a className="cursor-pointer bg-secondary px-4 py-2 text-txt hover:bg-txt hover:bg-opacity-10 active:bg-txt active:bg-opacity-30">
            Edit
          </a>
          <a className="cursor-pointer bg-secondary px-4 py-2 text-txt hover:bg-txt hover:bg-opacity-10 active:bg-txt active:bg-opacity-30">
            Duplicate
          </a>
          <a className="cursor-pointer bg-secondary px-4 py-2 text-txt hover:bg-txt hover:bg-opacity-10 active:bg-txt active:bg-opacity-30">
            Archive
          </a>
          <a className="cursor-pointer bg-secondary px-4 py-2 text-txt hover:bg-txt hover:bg-opacity-10 active:bg-txt active:bg-opacity-30">
            Move
          </a>
          <a className="cursor-pointer bg-secondary px-4 py-2 text-txt hover:bg-txt hover:bg-opacity-10 active:bg-txt active:bg-opacity-30">
            Share
          </a>
          <a className="cursor-pointer bg-secondary px-4 py-2 text-txt hover:bg-txt hover:bg-opacity-10 active:bg-txt active:bg-opacity-30">
            Add to favorites
          </a>
          <a className="cursor-pointer bg-secondary px-4 py-2 text-txt hover:bg-txt hover:bg-opacity-10 active:bg-txt active:bg-opacity-30">
            Delete
          </a>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
