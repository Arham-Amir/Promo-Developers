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
  const colors = ["#E83A3A", "#39395f", "#FFA900", "#0793EA", "#07938E"]
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
    tooltip: { trigger: 'none' },
    // is3D: true,
    legend: 'none',
    slices: {
      0: { color: colors[0] },
      1: { color: colors[1] },
      2: { color: colors[2] },
      3: { color: colors[3] },
      4: { color: colors[4] },
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
    <section className="flex flex-col items-center justify-center gap-10 py-8">
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
            <BsFillCircleFill size={12} fill={colors[i - 1]} />
            <p>{el[0]}</p>
          </section>
        })}
      </section>
      {/* <section className="grid grid-cols-3 gap-3 px-3 w-full overflow-hidden">
        {["/image/services1.jpg", "/image/services2.jpg", "/image/services3.jpg"].map((el, i) => (
          <section key={i} className="h-full w-full border-2 border-bg-card">
            <button className="btn h-full w-full p-0" onClick={() => {setMap(el); document.getElementById('my_modal_2').showModal()}}>
              <img className="h-full w-full object-fill" src={el} alt="image" />
            </button>
            <dialog id="my_modal_2" className="modal w-full h-screen">
              <div className="modal-box w-4/5 h-4/5">
                <img className="h-full w-full object-cover" src={map} alt="image" />
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </section>
        ))}
      </section> */}
      <section className="flex flex-row gap-5">
        <button className="px-4 py-2 rounded-md hover:-translate-y-1 transition-all duration-100 bg-themeFont text-white" onClick={() => document.getElementById('my_modal_3').showModal()}>View Maps</button>
        <button className="px-4 py-2 rounded-md hover:-translate-y-1 transition-all duration-100 bg-themeFont text-white" onClick={props.setShow}>View Report</button>
      </section>
      <section className="min-w-screen min-h-screen">
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box min-h-[80%] min-w-[80%] py-10 custom-scrollbar">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <img className="object-cover" src="/image/services1.jpg" alt="map image" />
          </div>
        </dialog>
      </section>
    </section>
  );
}
