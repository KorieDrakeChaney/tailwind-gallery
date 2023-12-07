import React from "react";

import ToolBar from "./toolbar";

interface ComponentFrameProps {
  code: string;
  children: React.ReactNode;
}

const ComponentFrame = ({ code, children }: ComponentFrameProps) => {
  return (
    <div className="flex w-[90vw] flex-col justify-between rounded-sm border-2 lg:w-3/4">
      <ToolBar code={code} />
      <div className="z-10 flex h-[40vh] items-center justify-center overflow-auto bg-bkg">
        {children}
      </div>
    </div>
  );
};

export default ComponentFrame;
