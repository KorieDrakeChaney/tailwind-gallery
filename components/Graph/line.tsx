"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/contexts";
import { Button } from "@/components";
import { animated } from "react-spring";
import useResizeObserver from "use-resize-observer";

interface LineGraphProps {
  xLabel: number;
  yLabel: number;
  maxValue: number;
  dataPoints: number[];
  yRangeStart: number;
  yRangeEnd: number;
  graphHeight: number;
}

const createGrid = (yRangeStart: number, yRangeEnd: number) => {
  //todo!
};

const LineGraph = ({ graphHeight, maxValue, dataPoints }: LineGraphProps) => {
  const { isDark } = useTheme();
  const [path, setPath] = useState("");
  const [data, setData] = useState<{ x: number; y: number; time: string }[]>(
    [],
  );
  const ref = useRef(null);
  const { width = 1, height = 1 } = useResizeObserver({ ref });

  useEffect(() => {
    setData(
      dataPoints.map((point, index) => {
        return {
          x: index * (width / dataPoints.length),
          y: (point / maxValue) * graphHeight,
          time: `${index + 1}:00 PM`,
        };
      }),
    );
  }, [graphHeight, maxValue, dataPoints, width]);

  useEffect(() => {
    let tempPath = "M0," + graphHeight + "L";
    data.forEach((point) => {
      tempPath += point.x + "," + point.y + "L";
    });

    setPath(tempPath);
  }, [data, graphHeight]);

  const randomizeData = () => {
    let dataPoints = [];

    for (let i = 0; i < 5; i++) {
      dataPoints.push(Math.floor(Math.random() * 100));
    }

    setData(
      dataPoints.map((point, index) => {
        return {
          x: index * (width / dataPoints.length),
          y: (point / maxValue) * graphHeight,
          time: `${index + 1}:00 PM`,
        };
      }),
    );
  };

  return (
    <div
      ref={ref}
      className="flex w-[90vw] flex-col justify-between rounded-sm lg:w-3/4"
    >
      <div className="h-full w-full border-b-2 border-txt border-opacity-20 bg-bkg px-2 py-2 transition-colors duration-75">
        <svg className="w-full p-4 transition-all">
          <animated.path
            d={path}
            width={width}
            stroke="purple"
            fill="transparent"
            fillOpacity={0.3}
          />
          {data.map((point, index) =>
            index !== 0 ? (
              <>
                <animated.circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r={2.5}
                  fill={isDark ? "gray" : "black"}
                />
                {data.map((point, index) => (
                  <text
                    key={index}
                    x={point.x}
                    y={140}
                    fill={isDark ? "white" : "black"}
                  >
                    {point.time}
                  </text>
                ))}
              </>
            ) : null,
          )}
        </svg>
      </div>

      <Button onClick={randomizeData} color="secondary" type="button">
        Random Points
      </Button>
    </div>
  );
};

export default LineGraph;
