"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/contexts";
import { Button } from "@/components";
import useResizeObserver from "use-resize-observer";

interface LineGraphProps {
  dataPoints: LineGraphData[];
  dataPointsPast: LineGraphData[];
  yRangeEnd?: number;
  yRangeStart?: number;
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
  let tempPath = "M20," + height + "L";
  data.forEach((point) => {
    tempPath += point.x + "," + point.y + "L";
  });
  tempPath += width + 20 + "," + 0;
  return tempPath;
};

const LineGraph = ({
  dataPoints,
  dataPointsPast,
  yRangeEnd = 100,
  yRangeStart = 0,
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
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (ref.current) {
        setMouseY(
          e.clientY -
            (ref.current as HTMLDivElement).getBoundingClientRect().top -
            35,
        );
      }
    };
    addEventListener("mousemove", handleMouse);
  }, []);

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
          x: (index + 1) * (width / (dataPoints.length + 1)) + 20,
          y: Math.min(
            Math.max(
              heightOffset -
                heightOffset * (point / yRangeEnd) +
                heightOffset / 20,
              heightOffset / 20,
            ),
            heightOffset - heightOffset / 20,
          ),
          label: `${time[0]}:${time[1]} ${locale[2]}`,
        };
      }),
    );
  }, [heightOffset, dataPoints, width, yRangeEnd]);

  useEffect(() => {
    setDataPast(
      dataPointsPast.map((data, index) => {
        const point = data.ylabel;
        const locale = data.xlabel.toLocaleString().split(" ");
        const time = locale[1]!.split(":");
        return {
          x: (index + 1) * (width / (dataPointsPast.length + 1)) + 20,
          y: Math.min(
            Math.max(
              heightOffset -
                heightOffset * (point / yRangeEnd) +
                heightOffset / 20,
              heightOffset / 20,
            ),
            heightOffset - heightOffset / 20,
          ),
          label: `${time[0]}:${time[1]} ${locale[2]}`,
        };
      }),
    );
  }, [heightOffset, dataPointsPast, width, yRangeEnd]);

  useEffect(() => {
    setPath(getPath(data, width, heightOffset));
  }, [data, heightOffset, width]);

  useEffect(() => {
    setPathPast(getPath(dataPast, width, heightOffset));
  }, [dataPast, heightOffset, width]);

  const randomizeData = () => {
    dataPoints = [];
    dataPointsPast = [];
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
      dataPoints.push({
        xlabel: date_array[i],
        ylabel: Math.random() * yRangeEnd,
      });
      dataPointsPast.push({
        xlabel: date_array[i],
        ylabel: Math.random() * yRangeEnd,
      });
    }

    setData(
      dataPoints.map((data, index) => {
        const point = data.ylabel;
        const locale = data.xlabel.toLocaleString().split(" ");
        const time = locale[1]!.split(":");
        return {
          x: (index + 1) * (width / (dataPoints.length + 1)) + 20,
          y: Math.min(
            Math.max(
              heightOffset -
                heightOffset * (point / yRangeEnd) +
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
      dataPointsPast.map((data, index) => {
        const point = data.ylabel;
        const locale = data.xlabel.toLocaleString().split(" ");
        const time = locale[1]!.split(":");
        return {
          x: (index + 1) * (width / (dataPointsPast.length + 1)) + 20,
          y: Math.min(
            Math.max(
              heightOffset -
                heightOffset * (point / yRangeEnd) +
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
        {heightOffset > 100 && (
          <svg
            className="h-full w-full p-4 transition-all"
            viewBox={`0 0 ${width + 20} ${heightOffset + 10}`}
          >
            <g>
              <path
                d={path}
                stroke="#293bff"
                fill="transparent"
                fillOpacity={0.3}
              />
              <path
                className=" "
                d={pathPast}
                stroke="gray"
                fill="transparent"
                fillOpacity={0.3}
                strokeDasharray={"5"}
              />
            </g>
            {[...Array(data.length + 1)].map((_, index) => (
              <g key={index}>
                <rect
                  x={index * (width / (data.length + 1)) + 20}
                  y={0}
                  width={width / (data.length + 1)}
                  height={heightOffset}
                  fill={["#5d635f", "#2c2e2c"][index % 2]}
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
                <rect
                  x={point.x - (width / (dataPoints.length + 1) + 20) / 2}
                  y={0}
                  width={width / (dataPoints.length + 1) + 20}
                  height={heightOffset}
                  stroke="transparent"
                  fillOpacity={0}
                  className="peer"
                />
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={3.5}
                  fill={isDark ? "white" : "gray"}
                  className="h-full w-full transition-colors peer-hover:fill-yellow-400"
                />
                <text
                  x={point.x + 5}
                  y={mouseY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="sm:text-md pointer-events-none invisible  fill-[#f6f6fa] stroke-none text-xs font-medium peer-hover:visible lg:text-xl"
                >
                  ({index}, {Math.floor(dataPoints[index].ylabel)}) ({index},{" "}
                  {Math.floor(dataPointsPast[index].ylabel)})
                </text>
              </g>
            ))}
            <line
              x1="20"
              y1="0"
              x2="20"
              y2={heightOffset}
              stroke={isDark ? "white" : "black"}
            />
            <line
              x1="20"
              y1={heightOffset}
              x2={width + 20}
              y2={heightOffset}
              stroke={isDark ? "white" : "black"}
            />
            <line
              x1="20"
              y1={heightOffset / 20}
              x2={width + 20}
              y2={heightOffset / 20}
              stroke="white"
              fill="transparent"
              fillOpacity={0.3}
              strokeDasharray={"5"}
            />
            <g>
              <text
                x={0}
                y={heightOffset + 17.5}
                textAnchor="start"
                className="sm:text-md pointer-events-none fill-txt text-sm"
              >
                {yRangeStart}
              </text>
              <text
                x={0}
                y={heightOffset / 20}
                textAnchor="start"
                className="sm:text-md pointer-events-none fill-txt text-sm"
              >
                {yRangeEnd}
              </text>
            </g>
          </svg>
        )}
      </div>

      <Button onClick={randomizeData} color="secondary" type="button">
        Random Points
      </Button>
    </div>
  );
};

export default LineGraph;
