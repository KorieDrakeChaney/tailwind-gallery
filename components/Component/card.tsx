import React from "react";
import Image from "next/image";
import Link from "next/link";
interface ComponentCardProps {
  title: string;
  img: string;
}

const ComponentCard = ({ title, img }: ComponentCardProps) => {
  return (
    <Link
      href={`/component/${img.slice(0, img.length - 4)}`}
      className="relative flex h-1/3 flex-col overflow-hidden rounded-md border-2 border-secondary shadow-md hover:shadow-lg active:border-primary"
    >
      <div className="board shadow-sm">
        <Image src={img} alt={title} width={480} height={360} />
      </div>
      <span className="flex justify-center font-semibold text-txt">
        {title}
      </span>
      <div className="absolute left-0 top-0 h-full w-full opacity-10 hover:bg-txt dark:hover:bg-white"></div>
    </Link>
  );
};

export default ComponentCard;
