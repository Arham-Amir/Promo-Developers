'use client'
import { Chart } from "react-google-charts";
import { BsFillCircleFill } from 'react-icons/bs'
import { Suspense, useState } from 'react';
import { useEffect } from "react";


export function LeftBox(props = {}) {
  const [data, setData] = useState([["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 3],
  ["Watch TV", 2]]);
  const sortedHeadings = Object.keys(props.items).sort((a, b) => props.items[a].order - props.items[b].order);

  const colors = ["#E83A3A", "#39395f", "#FFA900", "#0793EA"]
  // "#07938E"
  const updateData = () => {
    const newData = [
      ["Task", "Hours per Day"]
    ];
    {
      sortedHeadings.forEach((key) => {
        if (props.cost[key]) {
          newData.push([key, props.cost[key]]);
        } else {
          newData.push([key, 2]);
        }
      });
    }
    setData(newData);
  };

  useEffect(() => {
    updateData()
  }, [props.cost]);
  useEffect(() => {
    updateData()
  }, []);

  const options = {
    title: "",
    pieHole: 0.5,
    // is3D: true,
    legend: 'none',
    slices: {
      0: { color: colors[0] },
      1: { color: colors[1] },
      2: { color: colors[2] },
      3: { color: colors[3] },
    },
    chartArea: {
      left: "10%",
      top: "0%",
      width: "80%",
      height: "100%",
    },
    backgroundColor: {
      fill: "",
    },
  };

  return (
    <section className="flex flex-col items-center justify-center gap-10 py-16">
      <h1 className="text-2xl font-heading text-black font-bold text-center">Construction Cost</h1>
      <Suspense fallback={<span className="loading loading-dots loading-lg"></span>}>
        <Chart
          chartType="PieChart"
          width="100%"
          height="100%"
          data={[...data]}
          options={options}
        />
      </Suspense>
      <section className="flex flex-col text-black">
        {data.map((el, i) => {
          if (i == 0) {
            return;
          }
          return <section key={i} className="flex gap-8 items-center">
            <BsFillCircleFill size={12} fill={colors[i-1]} />
            <p>{el[0]}</p>
          </section>
        })}
      </section>
    </section>
  );
}
