'use client'
import { Chart } from "react-google-charts";
import { BsFillCircleFill } from 'react-icons/bs'
import { useState } from 'react';
import { useEffect } from "react";
import { useSelector } from "react-redux";


export function LeftBox(props = {}) {
  const { arealoading, areas } = useSelector(state => state.itemManager);
  const [data, setData] = useState([["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 3],
  ["Watch TV", 2]]);
  const sortedHeadings = Object.keys(props.items).sort((a, b) => props.items[a].order - props.items[b].order);
  const colors = ["#E83A3A", "#39395f", "#FFA900", "#0793EA", "#291334", "#07938E"]
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
  }
  useEffect(() => {
    updateData()
  }, [props.cost])

  useEffect(() => {
    updateData()
  }, []);
  const options = {
    title: "",
    pieHole: 0.5,
    tooltip: { trigger: 'none' },
    is3D: true,
    legend: 'none',
    pieSliceText: 'none',
    slices: {
      0: { color: colors[0] },
      1: { color: colors[1] },
      2: { color: colors[2] },
      3: { color: colors[3] },
      4: { color: colors[4] },
      5: { color: colors[5] },
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
    <section className="flex flex-col items-center justify-center py-8">
      <h3 className="text-4xl lg:text-2xl font-heading text-themeFont text-center">Construction Cost</h3>
      <section className="flex flex-col sm:flex-row sm:gap-5 lg:gap-0 lg:flex-col items-center justify-center py-5">
        <section className="sm:w-1/2 max-h-max lg:w-11/12 py-5">
          <Chart
            chartType="PieChart"
            width="100%"
            height="100%"
            data={[...data]}
            options={options}
          />
        </section>
        <section className="flex flex-col items-center justify-center gap-10">
          <section className="flex flex-col text-black p-2">
            {data.map((el, i) => {
              if (i == 0) {
                return;
              }
              return <section key={i} className="flex gap-4 items-center justify-between">
                <section className="flex gap-4 items-center">
                  <BsFillCircleFill className="!text-xs" fill={colors[i - 1]} />
                  <p className="text-sm">{el[0]}</p>
                </section>
                <p className="font-bold text-sm min-w-fit">{props.formatNumberWithCommas(props.cost[el[0]] || 0)}</p>
              </section>
            })}
          </section>
          <section className="flex flex-row gap-5">
            <button className="px-4 py-2 rounded-md hover:-translate-y-1 transition-all duration-100 bg-themeFont text-white" onClick={() => document.getElementById(props.id).showModal()}>View Maps</button>
            <button className="px-4 py-2 rounded-md hover:-translate-y-1 transition-all duration-100 bg-themeFont text-white" onClick={props.setShow}>View Report</button>
          </section>
        </section>
      </section>

      <dialog id={props.id} className="modal min-w-screen min-h-screen">
        <div className="modal-box min-h-[80%] min-w-[80%] py-10 custom-scrollbar z-40">
          <button onClick={() => {
            document.getElementById(props.id).close();
          }} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          {arealoading ? <span className="loading loading-dots loading-lg text-themeFont" />
            : <section className="flex-all-center flex-col gap-5">
              {areas[props.sarea][props.land]["images"] ?
               areas[props.sarea][props.land]["images"].map((el, i) => (
                <img className="object-fit" src={el} key={i} alt="map image" />
              ))
              :
              <p>Sorry, Currently, Maps not available.</p>
              }
            </section>
          }
        </div>
      </dialog>
    </section>
  );
}
