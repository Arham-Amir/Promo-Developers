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

  const updateData = () => {
    const newData = [
      ["Task", "Hours per Day"]
    ];
    {Object.keys(props.items).forEach((key) => {
      if(props.cost[key]){
      newData.push([key, props.cost[key]]);
    } else{
        newData.push([key, 2]);
      }
    });}
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
    is3D: true,
    legend: 'none',
    slices: {
      0: { color: "blue" },
      1: { color: "red" },
      2: { color: "green" },
      3: { color: "orange" },
      4: { color: "purple" },
      5: { color: "gray" },
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
      <h1 className="text-2xl text-lightFont font-bold text-center">Construction Cost</h1>
      <Suspense fallback={<span className="loading loading-dots loading-lg"></span>}>
        <Chart
          chartType="PieChart"
          width="100%"
          height="100%"
          data={[...data]}
          options={options}
        />
      </Suspense>
      <section className="flex flex-col text-lightFont">
        {data.map((el, i) => {
          if (i == 0) {
            return;
          }
          return <section key={i} className="flex gap-8 items-center">
            <BsFillCircleFill size={12} fill="blue" />
            <p>{el[0]}</p>
          </section>
        })}
      </section>
    </section>
  );
}
