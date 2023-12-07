import { LineGraph } from "@/components";
import { Metadata } from "next";
const Page = () => {
  let dataPoints = [];

  for (let i = 0; i < 5; i++) {
    dataPoints.push(Math.random() * 100);
  }

  return (
    <LineGraph
      maxValue={100}
      graphHeight={100}
      yLabel={100}
      xLabel={Date.now()}
      yRangeEnd={19}
      yRangeStart={1}
      dataPoints={dataPoints}
    />
  );
};

export default Page;

export const metadata: Metadata = {
  title: "Line Graph preview",
};
