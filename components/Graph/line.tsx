"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { useTheme } from "@/contexts";
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

interface CircleGroupProps {
  point: { x: number; y: number | null };
  index: number;
}

const CircleGroup = memo(({ point, index }: CircleGroupProps) => {
  return (
    <g
      key={`${point.x}-${point.y}`}
      className="fill-txt peer-hover:fill-yellow-400"
    >
      {point.y !== null && (
        <circle
          key={point.y}
          cx={point.x}
          cy={point.y}
          r={3.5}
          className="h-full w-full transition-colors"
        />
      )}
    </g>
  );
});

CircleGroup.displayName = "CircleGroup";

const getPath = (data: { x: number; y: number | null }[]) => {
  let first_y: number;
  let tempPath = "M";
  let prev_y = 0;
  let prev_x = 0;
  data.forEach((point) => {
    prev_x = point.x;
    if (point.y !== null) {
      if (first_y === undefined) {
        first_y = point.y;
      }
      prev_y = point.y;
      tempPath += point.x + "," + prev_y + "L";
    }
  });
  tempPath += prev_x + 20 + "," + prev_y;
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
  const [widthOffset, setWidthOffset] = useState(height - 90);
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
          x:
            index * (width / dataPointsPast.length) +
            width / dataPointsPast.length / 2 +
            20,
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
            viewBox={`0 0 ${width - width / dataPointsPast.length + 20} ${
              heightOffset + 10
            }`}
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
                  x={
                    index == 0
                      ? 20
                      : index * (width / dataPoints.length) -
                        width / dataPoints.length / 2 +
                        20
                  }
                  y={0}
                  width={
                    index == 0 || index == dataPoints.length - 1
                      ? width / dataPoints.length / 2
                      : width / dataPoints.length
                  }
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
                <g key={index} className="peer ">
                  <g className="peer">
                    <rect
                      x={
                        index == 0
                          ? 20
                          : index * (width / dataPoints.length) -
                            width / dataPoints.length / 2 +
                            20
                      }
                      y={0}
                      width={
                        index == 0 || index == dataPoints.length - 1
                          ? width / dataPoints.length / 2
                          : width / dataPoints.length
                      }
                      height={heightOffset}
                      stroke="transparent"
                      fillOpacity={0}
                      className="peer"
                    />
                    {[
                      ...Array(Object.entries(dataPoints[0].ylabel).length),
                    ].map((_, i) => {
                      const point = data[i][index];
                      return (
                        <CircleGroup key={i} point={point} index={index} />
                      );
                    })}
                  </g>
                  {index != 0 && index != dataPoints.length - 1 && (
                    <text
                      x={index * (width / dataPoints.length) + 20}
                      y={heightOffset - 7.5}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="pointer-events-none invisible fill-txt stroke-none text-xs sm:visible"
                    >
                      {`${time[0]}:${time[1]} ${locale[2]}`}
                    </text>
                  )}
                  <text
                    x={
                      index != 0
                        ? index != dataPoints.length - 1
                          ? x + 20
                          : index * (width / dataPoints.length) -
                            width / dataPoints.length / 2 +
                            20
                        : x + width / dataPoints.length / 2
                    }
                    y={mouseY - 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="sm:text-md pointer-events-none invisible  fill-txt stroke-none text-xs font-medium peer-hover:visible lg:text-xl"
                  >
                    {renderCurrTooltip(index)}
                  </text>
                  <text
                    x={
                      index != 0
                        ? index != dataPoints.length - 1
                          ? x + 20
                          : index * (width / dataPoints.length) -
                            width / dataPoints.length / 2 +
                            20
                        : x + width / dataPoints.length / 2
                    }
                    y={mouseY + 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="sm:text-md pointer-events-none invisible  fill-txt stroke-none text-xs font-medium peer-hover:visible lg:text-xl"
                  >
                    {renderPastTooltip(index)}
                  </text>
                </g>
              );
            })}

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
