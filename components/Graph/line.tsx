"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/contexts";
import { Button } from "@/components";
import useResizeObserver from "use-resize-observer";

interface LineGraphProps {
  maxValue: number;
  dataPoints: LineGraphData[];
  dataPointsPast: LineGraphData[];
}

interface LineGraphData {
  xlabel: Date;
  ylabel: number;
}

const getPath = (
  data: { x: number; y: number }[],
  width: number,
  height: number,
) => {
  let tempPath = "M0," + height + "L";
  data.forEach((point) => {
    tempPath += point.x + "," + point.y + "L";
  });
  tempPath += width + "," + 0;
  return tempPath;
};

const LineGraph = ({
  maxValue,
  dataPoints,
  dataPointsPast,
}: LineGraphProps) => {
  const { isDark } = useTheme();
  const [path, setPath] = useState("");
  const [pathPast, setPathPast] = useState("");
  const [data, setData] = useState<{ x: number; y: number; label: string }[]>(
    [],
  );
  const [dataPast, setDataPast] = useState<
    { x: number; y: number; label: string }[]
  >([]);
  const ref = useRef(null);
  const { width = 1, height = 1 } = useResizeObserver({ ref });
  const [heightOffset, setHeightOffset] = useState(height - 90);

  useEffect(() => {
    setHeightOffset(height - 90);
  }, [height]);

  useEffect(() => {
    setData(
      dataPoints.map((data, index) => {
        const point = data.ylabel;
        const locale = data.xlabel.toLocaleString().split(" ");
        const time = locale[1]!.split(":");
        return {
          x: (index + 1) * (width / (dataPoints.length + 1)),
          y: Math.min(
            Math.max(
              heightOffset * Math.min(Math.max(point / maxValue, 0), 1) +
                heightOffset / 20,
              heightOffset / 20,
            ),
            heightOffset - heightOffset / 20,
          ),
          label: `${time[0]}:${time[1]} ${locale[2]}`,
        };
      }),
    );
  }, [heightOffset, dataPoints, width, maxValue]);

  useEffect(() => {
    setDataPast(
      dataPointsPast.map((data, index) => {
        const point = data.ylabel;
        const locale = data.xlabel.toLocaleString().split(" ");
        const time = locale[1]!.split(":");
        return {
          x: (index + 1) * (width / (dataPointsPast.length + 1)),
          y: Math.min(
            Math.max(
              heightOffset * Math.min(Math.max((point ?? 0) / maxValue, 0), 1) +
                heightOffset / 20,
              heightOffset / 20,
            ),
            heightOffset - heightOffset / 20,
          ),
          label: `${time[0]}:${time[1]} ${locale[2]}`,
        };
      }),
    );
  }, [heightOffset, dataPointsPast, width, maxValue]);

  useEffect(() => {
    setPath(getPath(data, width, heightOffset));
  }, [data, heightOffset, width]);

  useEffect(() => {
    setPathPast(getPath(dataPast, width, heightOffset));
  }, [dataPast, heightOffset, width]);

  const randomizeData = () => {
    let dataCurr = [];
    let dataPast = [];
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
      dataCurr.push({
        xlabel: date_array[i],
        ylabel: Math.random() * maxValue,
      });
      dataPast.push({
        xlabel: date_array[i],
        ylabel: Math.random() * maxValue,
      });
    }

    setData(
      dataCurr.map((data, index) => {
        const point = data.ylabel;
        const locale = data.xlabel.toLocaleString().split(" ");
        const time = locale[1]!.split(":");
        return {
          x: (index + 1) * (width / (dataCurr.length + 1)),
          y: Math.min(
            Math.max(
              heightOffset * Math.min(Math.max(point / maxValue, 0), 1) +
                heightOffset / 20,
              heightOffset / 20,
            ),
            heightOffset - heightOffset / 20,
          ),
          label: `${time[0]}:${time[1]} ${locale[2]}`,
        };
      }),
    );
    setDataPast(
      dataPast.map((data, index) => {
        const point = data.ylabel;
        const locale = data.xlabel.toLocaleString().split(" ");
        const time = locale[1]!.split(":");
        return {
          x: (index + 1) * (width / (dataPast.length + 1)),
          y: Math.min(
            Math.max(
              heightOffset * Math.min(Math.max((point ?? 0) / maxValue, 0), 1) +
                heightOffset / 20,
              heightOffset / 20,
            ),
            heightOffset - heightOffset / 20,
          ),
          label: `${time[0]}:${time[1]} ${locale[2]}`,
        };
      }),
    );
  };

  return (
    <div
      ref={ref}
      className="flex h-[70vh] w-[90vw] flex-col justify-between rounded-sm lg:w-3/4"
    >
      <div className="relative h-full w-full border-b-2 border-txt border-opacity-20 bg-bkg px-2 py-2 transition-colors duration-75">
        <svg className=" h-full w-full p-4 transition-all">
          <g>
            <path
              className="line"
              d={path}
              stroke="#293bff"
              fill="transparent"
              fillOpacity={0.3}
              viewBox={`0 0 ${width} ${heightOffset}`}
            />
            <path
              className=" "
              d={pathPast}
              stroke="gray"
              fill="transparent"
              fillOpacity={0.3}
              viewBox={`0 0 ${width} ${heightOffset}`}
              strokeDasharray={"5"}
            />
          </g>
          {[...Array(data.length + 1)].map((_, index) => (
            <g key={index}>
              <rect
                x={index * (width / (data.length + 1))}
                y={0}
                width={width / (data.length + 1)}
                height={heightOffset}
                fill={["#5d635f", "#2c2e2c", "#6a6e6a"][index % 3]}
                fillOpacity={0.125}
              />
            </g>
          ))}
          {data.map((point, index) => (
            <g key={index}>
              <text
                x={
                  index * (width / (data.length + 1)) +
                  width / (data.length + 1)
                }
                y={heightOffset - 7.5}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none invisible fill-txt stroke-none text-xs sm:visible"
              >
                {point.label}
              </text>
              <title>{`(${index}, ${Math.floor(point.y)})`}</title>
              <circle
                cx={point.x}
                cy={point.y}
                r={5}
                fill={isDark ? "white" : "black"}
                className="peer h-full w-full transition-colors hover:fill-yellow-400"
              />
              <text
                x={point.x + 5}
                y={point.y - 10}
                textAnchor="middle"
                dominantBaseline="middle"
                className="sm:text-md pointer-events-none invisible fill-[#f6f6fa] stroke-none text-xs font-medium peer-hover:visible lg:text-xl"
              >
                ({index}, {Math.floor(point.y)})
              </text>
            </g>
          ))}
          <line
            x1="0"
            y1="0"
            x2="0"
            y2={heightOffset}
            stroke={isDark ? "white" : "black"}
          />
          <line
            x1="0"
            y1={heightOffset}
            x2={width}
            y2={heightOffset}
            stroke={isDark ? "white" : "black"}
          />
        </svg>
      </div>

      <Button onClick={randomizeData} color="secondary" type="button">
        Random Points
      </Button>
    </div>
  );
};

export default LineGraph;
