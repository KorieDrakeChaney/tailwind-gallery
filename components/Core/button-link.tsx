import React from "react";
import Link from "next/link";
type ButtonLinkProps = {
  color:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "info"
    | "light"
    | "dark";
  children?: React.ReactNode;
  href: string;
  target?: string;
};

const ButtonLink = ({ color, children, href, target }: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      target={target}
      className={`btn bg-${color} mx-1 flex items-center rounded-md bg-secondary px-4 py-2 text-txt hover:bg-txt hover:bg-opacity-10 active:ring-2 active:ring-primary`}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
