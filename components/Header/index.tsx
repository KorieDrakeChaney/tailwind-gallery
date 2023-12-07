"use client";

import { useEffect } from "react";
import Link from "next/link";

type HeaderProps = {};

import { FaRegMoon, FaRegSun, FaGithub } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";

const Header = ({}: HeaderProps) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="sticky top-0 border-b-2 bg-bkg bg-opacity-0 p-4 backdrop-blur-sm">
      <div className="absolute left-0 top-0 flex  h-full w-full cursor-pointer items-center justify-center bg-bkg bg-opacity-50 text-center font-sans text-xl font-bold text-txt">
        <Link href="/">Tailwind Gallery</Link>
      </div>
      <div className="xs:justify-end flex justify-between">
        <button className="relative mx-1 p-2" onClick={toggleTheme}>
          {isDark ? (
            <FaRegSun size={25} color="white" />
          ) : (
            <FaRegMoon size={25} color="black" />
          )}
          <div className="absolute left-0 top-0 h-full w-full rounded-2xl opacity-20 hover:bg-gray-600 dark:hover:bg-white"></div>
        </button>
        <Link
          className="relative mx-1 p-2"
          href="https://github.com/KorieDrakeChaney/tailwind-gallery"
          target="_blank"
        >
          <FaGithub size={25} color={isDark ? "white" : "black"} />
          <div className="absolute left-0 top-0 h-full w-full rounded-2xl opacity-20 hover:bg-gray-600 dark:hover:bg-white "></div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
