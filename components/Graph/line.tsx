"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/contexts";
import { Button } from "@/components";
import useResizeObserver from "use-resize-observer";

interface LineGraphProps {
  xLabel: string;
  yLabel: string;
  maxValue: number;
  dataPoints: number[];
  dataPointsPrev: number[];
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
  dataPointsPrev,
  xLabel,
  yLabel,
}: LineGraphProps) => {
  const { isDark } = useTheme();
  const [path, setPath] = useState("");
  const [pathPrev, setPathPrev] = useState("");
  const [data, setData] = useState<{ x: number; y: number }[]>([]);
  const [dataPrev, setDataPrev] = useState<{ x: number; y: number }[]>([]);
  const ref = useRef(null);
  const { width = 1, height = 1 } = useResizeObserver({ ref });
  const [heightOffset, setHeightOffset] = useState(height - 90);

  useEffect(() => {
    setHeightOffset(height - 90);
  }, [height]);

  useEffect(() => {
    console.log(width / dataPoints.length);

    setData(
      dataPoints.map((point, index) => {
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
        };
      }),
    );
  }, [heightOffset, dataPoints, width, maxValue]);

  useEffect(() => {
    setDataPrev(
      dataPointsPrev.map((point, index) => {
        return {
          x: (index + 1) * (width / (dataPointsPrev.length + 1)),
          y: Math.min(
            Math.max(
              heightOffset * Math.min(Math.max(point / maxValue, 0), 1) +
                heightOffset / 20,
              heightOffset / 20,
            ),
            heightOffset - heightOffset / 20,
          ),
        };
      }),
    );
  }, [heightOffset, dataPointsPrev, width, maxValue]);

  useEffect(() => {
    setPath(getPath(data, width, heightOffset));
  }, [data, heightOffset, width]);

  useEffect(() => {
    setPathPrev(getPath(dataPrev, width, heightOffset));
  }, [dataPrev, heightOffset, width]);

  const randomizeData = () => {
    let data = [];
    let dataPrev = [];
    for (let i = 0; i < 10; i++) {
      data.push(Math.random() * maxValue);
      dataPrev.push(Math.random() * maxValue);
    }

    setData(
      data.map((point, index) => {
        return {
          x: (index + 1) * (width / (data.length + 1)),
          y: Math.min(
            Math.max(
              heightOffset * Math.min(Math.max(point / maxValue, 0), 1) +
                heightOffset / 20,
              heightOffset / 20,
            ),
            heightOffset - heightOffset / 20,
          ),
        };
      }),
    );
    setDataPrev(
      dataPrev.map((point, index) => {
        return {
          x: (index + 1) * (width / (data.length + 1)),
          y: Math.min(
            Math.max(
              heightOffset * Math.min(Math.max(point / maxValue, 0), 1) +
                heightOffset / 20,
              heightOffset / 20,
            ),
            heightOffset - heightOffset / 20,
          ),
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
              stroke="purple"
              fill="transparent"
              fillOpacity={0.3}
              viewBox={`0 0 ${width} ${heightOffset}`}
            />
            <path
              className=" "
              d={pathPrev}
              stroke="gray"
              fill="transparent"
              fillOpacity={0.3}
              viewBox={`0 0 ${width} ${heightOffset}`}
              strokeDasharray={"5"}
            />
          </g>
          {data.map((point, index) => (
            <g key={index}>
              <rect
                x={index * (width / (dataPrev.length + 1))}
                y={0}
                width={width / (dataPrev.length + 1)}
                height={heightOffset}
                fill={["#5d635f", "#2c2e2c", "#6a6e6a"][index % 3]}
                fillOpacity={0.125}
              />
              <title>{`(${index}, ${Math.floor(point.y)})`}</title>
              <circle
                cx={point.x}
                cy={point.y}
                r={5}
                fill={isDark ? "white" : "black"}
                className="peer transition-colors hover:fill-yellow-400"
              />
              <text
                x={point.x + 5}
                y={point.y - 10}
                textAnchor="middle"
                dominantBaseline="middle"
                stroke={isDark ? "white" : "black"}
                className="pointer-events-none invisible peer-hover:visible"
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
          <text
            x="50%"
            y={heightOffset - 2.5}
            textAnchor="middle"
            stroke={isDark ? "white" : "black"}
          >
            {xLabel}
          </text>{" "}
          {/* x-axis label */}
          <g transform={`translate(${5}, ${heightOffset / 2}) rotate(-270)`}>
            <text textAnchor="middle" stroke={isDark ? "white" : "black"}>
              {yLabel}
            </text>
          </g>
        </svg>
      </div>

      <Button onClick={randomizeData} color="secondary" type="button">
        Random Points
      </Button>
    </div>
  );
};

export default LineGraph;
