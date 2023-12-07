import type { Metadata } from "next";
import { LineGraph } from "@/components";
import { ComponentFrame } from "@/components";
export const metadata: Metadata = {
  title: "Line Graph",
  description: "A simple drop down component",
};

const DropDownPage = () => {
  let dataPoints = [];

  for (let i = 0; i < 5; i++) {
    dataPoints.push(Math.floor(Math.random() * 100));
  }

  return (
    <ComponentFrame code={`Not Available`}>
      <LineGraph
        maxValue={100}
        graphHeight={100}
        yLabel={100}
        xLabel={Date.now()}
        yRangeEnd={19}
        yRangeStart={1}
        dataPoints={dataPoints}
      />
    </ComponentFrame>
  );
};

export default DropDownPage;
