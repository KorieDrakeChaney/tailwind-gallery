import type { Metadata } from "next";
import { LineGraph } from "@/components";
import { ComponentFrame } from "@/components";
export const metadata: Metadata = {
  title: "Line Graph",
  description: "A simple drop down component",
};

const DropDownPage = () => {
  let data = [];
  let dataPrev = [];
  for (let i = 0; i < 100; i++) {
    data.push(Math.random() * 100);
    dataPrev.push(Math.random() * 100);
  }

  return (
    <ComponentFrame code={`Not Available`}>
      <LineGraph
        maxValue={100}
        yLabel={"Money"}
        xLabel={"Time"}
        dataPoints={data}
        dataPointsPrev={dataPrev}
      />
    </ComponentFrame>
  );
};

export default DropDownPage;
