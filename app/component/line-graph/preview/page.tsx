import { LineGraph } from "@/components";
import { Metadata } from "next";
const Page = () => {
  let data = [];
  let dataPrev = [];
  let maxValue = 100;
  let date_array = [
    new Date("1995-12-17T03:24:00"),
    new Date("1995-12-17T04:24:00"),
    new Date("1995-12-17T05:24:00"),
    new Date("1995-12-17T06:24:00"),
    new Date("1995-12-17T07:24:00"),
    new Date("1995-12-17T08:24:00"),
    new Date("1995-12-17T09:24:00"),
    new Date("1995-12-17T10:24:00"),
    new Date("1995-12-17T11:24:00"),
    new Date("1995-12-17T12:24:00"),
  ];
  for (let i = 0; i < 10; i++) {
    data.push({ xlabel: date_array[i], ylabel: Math.random() * maxValue });
    dataPrev.push({ xlabel: date_array[i], ylabel: Math.random() * maxValue });
  }

  return (
    <LineGraph
      maxValue={maxValue}
      dataPoints={data}
      dataPointsPast={dataPrev}
    />
  );
};

export default Page;

export const metadata: Metadata = {
  title: "Line Graph preview",
};
