"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../contexts";
import { FaCode } from "react-icons/fa6";
import { FaRegClipboard } from "react-icons/fa";
import { MdOutlineOpenInNew } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { Button, ButtonLink } from "@/components/";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark as dark,
  oneLight as light,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { usePathname } from "next/navigation";
interface ToolBarProps {
  code: string;
}

const ToolBar = ({ code }: ToolBarProps) => {
  const { isDark } = useTheme();
  const [isHidden, setIsHidden] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isClicked) {
      setTimeout(() => {
        setIsClicked(false);
      }, 1000);
    }
  }, [isClicked]);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const copyToClipboard = async () => {
    setIsClicked(true);
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.log("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-full border-b-2 border-txt border-opacity-20 bg-bkg px-2 py-2">
        <div className="flex w-full justify-center sm:justify-end">
          <ButtonLink
            href={`${pathname}/preview`}
            target="_blank"
            color="secondary"
          >
            <MdOutlineOpenInNew size={20} color={isDark ? "white" : "black"} />
            <span className="xs:inline mx-2 hidden">Full screen Preview</span>
          </ButtonLink>
          <Button onClick={toggleHidden} type="button" color="secondary">
            <FaCode size={20} color={isDark ? "white" : "black"} />
            <span className="xs:inline mx-2 hidden">
              {isHidden ? "Show Code" : "Hide Code"}
            </span>
          </Button>
          <Button onClick={copyToClipboard} type="button" color="secondary">
            {isClicked ? (
              <FaCheck size={20} color={isDark ? "white" : "black"} />
            ) : (
              <FaRegClipboard size={20} color={isDark ? "white" : "black"} />
            )}
          </Button>
        </div>
      </div>
      {!isHidden && (
        <SyntaxHighlighter language="html" style={isDark ? dark : light}>
          {code}
        </SyntaxHighlighter>
      )}
    </div>
  );
};

export default ToolBar;
