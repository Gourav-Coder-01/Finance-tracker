import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,           // rename import chart as ChartJs
  LineElement,                // to draw line itself
  CategoryScale,              // x axis
  LinearScale,                // y axis
  PointElement,               // draw dots on line
  Title,                      // plugins for chart title, hover tooltips, and dataset legend.
  Tooltip,
  Legend,
  Filler,
  scales
} from 'chart.js';

// Register Chart.js modules
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend,Filler);  // provide tools to chart to use it


// Custom plugin to set canvas background
const whiteBackgroundPlugin = {
  id: 'whiteBackground',
  beforeDraw: (chart) => {
    const { ctx, width, height } = chart;
    ctx.save();
    ctx.fillStyle = 'white'; // background color
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  },
};

const Chart = ({clr,ttl,bsis,chartData}) => {
  console.log(chartData)
  const data = {
    labels: chartData && chartData.map(item=>(item.date.split('-').reverse().join('-'))),
    datasets: [
      {
        id: 1,
        label: ttl,
        data: chartData && chartData.map(item=>(item.balance)),
        borderColor: clr,
        backgroundColor: clr,
        fill:true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio:false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `${bsis} Performance` },
    },
    scales:{
      x:{
        title:{
          display:true,
          text:`${bsis === 'Today' ? "Time" : bsis === 'Daily' ? 'Days': bsis === 'Monthly' ? "Months" : bsis === 'Weekly' ? 'Weeks' : 'Years'}`,
        },
      },
      y:{
        title:{
          display:true,
          text:ttl
        },
      },
    }
  };

  return <Line data={data} options={options} plugins={[whiteBackgroundPlugin]} className='w-full h-full' />;
};

export default Chart;
