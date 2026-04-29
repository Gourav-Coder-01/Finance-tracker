import React, { useContext, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,   // required for doughnut/pie
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// Register modules
ChartJS.register(ArcElement, Tooltip, Legend, Title);




// Custom plugin to set canvas background
const whiteBackgroundPlugin = {
  id: 'whiteBackground',
  beforeDraw: (DoughnutChart) => {
    const { ctx, width, height } = DoughnutChart;
    ctx.save();
    ctx.fillStyle = 'white'; // background color
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  },
};



const DoughnutChart = ({ clrArr, ttl, labels, values }) => {
 
  const data = {
    labels: labels.map(dta=>dta.type), // e.g. ['Income', 'Expense', 'Balance']
    datasets: [
      {
        label: 'Rs',
        data: labels.map(item => item.amount), // e.g. [5000, 2000, 3000]
        backgroundColor: labels.map(data=>data.color),  // e.g. ['rgba(0,255,255,0.3)','rgba(255,0,0,0.3)','rgba(255,255,0,0.3)']
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
     maintainAspectRatio:false,
    plugins: {
      legend: { position: 'right' },
      title: { display: true, text: 'SPENDING BREAKDOWN', Color:'green' },
    },
  };

  return <Doughnut data={data} options={options} plugins={[whiteBackgroundPlugin]}  />;
};

export default DoughnutChart;
