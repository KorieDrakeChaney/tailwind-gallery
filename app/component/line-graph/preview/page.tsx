import { LineGraph } from "@/components";
import { Metadata } from "next";
const Page = () => {
  let data = [];
  let dataPrev = [];
  let maxValue = 100;
  for (let i = 0; i < 10; i++) {
    data.push(Math.random() * maxValue);
    dataPrev.push(Math.random() * maxValue);
  }

  return (
    <LineGraph
      maxValue={maxValue}
      yLabel={"Money"}
      xLabel={"Time"}
      dataPoints={data}
      dataPointsPrev={dataPrev}
    />
  );
};

export default Page;

export const metadata: Metadata = {
  title: "Line Graph preview",
};
