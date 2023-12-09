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
  ylabel: { [key: string]: number | null };
}

const getPath = (data: { x: number; y: number | null }[]) => {
  let tempPath = "M";
  let prev_path = "0";
  data.forEach((point, index) => {
    if (point.y !== null) {
      prev_path = point.x + "," + point.y;
      tempPath += prev_path;
      if (index !== data.length - 1) {
        tempPath += "L";
      }
    } else if (index === data.length - 1) {
      tempPath += prev_path;
    }
  });
  return tempPath;
};

const LineGraph = ({
  dataPoints,
  dataPointsPast,
  yRangeEnd = 100,
  yRangeStart = 0,
}: LineGraphProps) => {
  const { isDark } = useTheme();
  const [path, setPath] = useState<string[]>([]);
  const [pathPast, setPathPast] = useState<string[]>([]);
  const [data, setData] = useState<{ x: number; y: number | null }[][]>([]);
  const [dataPast, setDataPast] = useState<{ x: number; y: number | null }[][]>(
    [],
  );
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
    let new_data: { x: number; y: number | null }[][] = Array(
      Object.entries(dataPoints[0].ylabel).length,
    )
      .fill(null)
      .map(() => []);

    dataPoints.map((data, index) => {
      let num = 0;
      for (const [_, point] of Object.entries(data.ylabel)) {
        new_data[num][index] = {
          x: index * (width / dataPoints.length) + 20,
          y:
            point == null
              ? null
              : Math.min(
                  Math.max(
                    heightOffset -
                      heightOffset * (point / yRangeEnd) +
                      heightOffset / 20,
                    heightOffset / 20,
                  ),
                  heightOffset - heightOffset / 20,
                ),
        };
        num++;
      }
    });
    setData(new_data);
  }, [heightOffset, dataPoints, width, yRangeEnd]);

  useEffect(() => {
    let new_data: { x: number; y: number | null }[][] = Array(
      Object.entries(dataPointsPast[0].ylabel).length,
    )
      .fill(null)
      .map(() => []);

    dataPointsPast.map((data, index) => {
      let num = 0;
      for (const [_, point] of Object.entries(data.ylabel)) {
        new_data[num][index] = {
          x: index * (width / dataPointsPast.length) + 20,
          y:
            point == null
              ? null
              : Math.min(
                  Math.max(
                    heightOffset -
                      heightOffset * (point / yRangeEnd) +
                      heightOffset / 20,
                    heightOffset / 20,
                  ),
                  heightOffset - heightOffset / 20,
                ),
        };
        num++;
      }
    });
    setDataPast(new_data);
  }, [heightOffset, dataPointsPast, width, yRangeEnd]);

  useEffect(() => {
    const new_path = data.map((data) => getPath(data));
    setPath(new_path);
  }, [data]);

  useEffect(() => {
    const new_path = dataPast.map((data) => getPath(data));
    console.log(new_path);
    setPathPast(new_path);
  }, [dataPast]);

  const renderCurrTooltip = (index: number) => {
    let tooltip = "";
    for (const [_, point] of Object.entries(dataPoints[index].ylabel)) {
      if (point !== null) {
        tooltip += `${Math.floor(point)} `;
      }
    }
    return tooltip;
  };

  const renderPastTooltip = (index: number) => {
    let tooltip = "";
    for (const [_, point] of Object.entries(dataPointsPast[index].ylabel)) {
      if (point !== null) {
        tooltip += `${Math.floor(point)} `;
      }
    }
    return tooltip;
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
              {path.map((d, index) => (
                <path
                  key={index}
                  d={d}
                  stroke={
                    ["#293bff", "#ff3b3b", "#62466B", "#8C93A8", "#B5C2B7"][
                      index % 5
                    ]
                  }
                  fill="transparent"
                  fillOpacity={0.4 - index * 0.1}
                />
              ))}
              {pathPast.map((d, index) => (
                <path
                  key={index}
                  className="opacity-[0.5]"
                  d={d}
                  stroke={
                    ["#293bff", "#ff3b3b", "#62466B", "#8C93A8", "#B5C2B7"][
                      index % 5
                    ]
                  }
                  fill="transparent"
                  strokeDasharray={"5"}
                />
              ))}
            </g>
            {[...Array(dataPoints.length - 1)].map((_, index) => (
              <g key={index}>
                <rect
                  x={index * (width / dataPointsPast.length) + 20}
                  y={0}
                  width={width / dataPoints.length}
                  height={heightOffset}
                  fill={["#5d635f", "#2c2e2c"][index % 2]}
                  fillOpacity={0.125}
                />
              </g>
            ))}
            {dataPoints.map((point_data, index) => {
              const locale = point_data.xlabel.toLocaleString().split(" ");
              const time = locale[1]!.split(":");
              const x = index * (width / dataPointsPast.length);
              return (
                <g key={index}>
                  <rect
                    x={x + 20}
                    y={0}
                    width={width / dataPoints.length}
                    height={heightOffset}
                    stroke="transparent"
                    fillOpacity={0}
                    className="peer"
                  />
                  <text
                    x={x + width / dataPoints.length / 2 + 20}
                    y={heightOffset - 7.5}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="pointer-events-none invisible fill-txt stroke-none text-xs sm:visible"
                  >
                    {`${time[0]}:${time[1]} ${locale[2]}`}
                  </text>
                  <text
                    x={x + width / dataPoints.length / 2 + 20}
                    y={mouseY - 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="sm:text-md pointer-events-none invisible  fill-[#f6f6fa] stroke-none text-xs font-medium peer-hover:visible lg:text-xl"
                  >
                    {renderCurrTooltip(index)}
                  </text>
                  <text
                    x={x + width / dataPoints.length / 2 + 20}
                    y={mouseY + 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="sm:text-md pointer-events-none invisible  fill-[#f6f6fa] stroke-none text-xs font-medium peer-hover:visible lg:text-xl"
                  >
                    {renderPastTooltip(index)}
                  </text>
                </g>
              );
            })}
            {data.map((point_data, index) => (
              <g key={index}>
                {point_data.map((point, index) => (
                  <g key={index}>
                    {point.y !== null && (
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r={3.5}
                        fill={isDark ? "white" : "gray"}
                        className="h-full w-full transition-colors peer-hover:fill-yellow-400"
                      />
                    )}
                  </g>
                ))}
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
              x2={width}
              y2={heightOffset}
              stroke={isDark ? "white" : "black"}
            />

            <g>
              <text
                x={0}
                y={heightOffset}
                textAnchor="start"
                className="sm:text-md pointer-events-none fill-txt text-sm"
              >
                {yRangeStart}
              </text>
              <text
                x={0}
                y={0}
                textAnchor="start"
                className="sm:text-md pointer-events-none fill-txt text-sm"
              >
                {yRangeEnd}
              </text>
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};

export default LineGraph;
