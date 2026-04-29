import React, { useContext, useState, useEffect } from "react";
import Chart from "../components/Chart";
import { FinanceContext } from "../context/FinanceContext";
import DoughnutChart from "../components/DoughnutChart";

const Dashboard = () => {
  const { income, expense, transactions,typee,setType,basis,setBasis,chartLine,setChartLine} = useContext(FinanceContext);

//  chartLine&&console.log(chartLine)
  return (
    <div className="w-[95%] mx-auto">
      {/* selection section------------------------------------------------- */}
      <div className="flex justify-end">
        <select
          className="outline-none bg-black text-white rounded mt-1"
          onChange={(e) => setBasis(e.target.value)}
        >
          <option value="Today">Today</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      {/* selection section------------------------------------------------- */}

      {/* Chart section------------------------------------------------- */}

      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-3 mt-2">
        {/* Chart------------------------------------------------- */}
        <span className="border w-full h-60">
          <Chart
            clr="rgba(255,0,0,0.3)"
            ttl="Expense"
            bsis={basis}
            chartData = {chartLine.chartExp}
            // typ={expAmountArr}
            // dte={expDateArr}
          />
          
        </span>
        {/* Chart------------------------------------------------- */}
        <span className="border w-full h-60">
          <Chart
            clr="rgba(0,255,255,0.3)"
            ttl="Income"
            bsis={basis}
            chartData = {chartLine.chartInc}
            // typ={incAmountArr}
            // dte={incDateArr}
          />
        </span>
        {/* Chart------------------------------------------------- */}
        {/* Chart------------------------------------------------- */}
        <span className="border w-full h-60">
          <Chart
            clr="rgba(255,255,0,0.3)"
            ttl="Balance"
            bsis={basis}
            chartData = {chartLine.chartwithBal}
            // typ={bal}
            // dte={balDate}
          />
        </span>
        {/* Chart------------------------------------------------- */}
      </div>

      {/* pie chart and tabular format */}

      <div className="flex justify-between items-center mt-1 gap-1">
        <span className=" w-fit h-60 border">
          <DoughnutChart labels={typee} />
        </span>


        {/* table-------------------------------------------- */}
        <table className="w-[80%] mx-auto border text-center">
          <caption className="text-white text-2xl font-bold bg-black">Recent Transactions</caption>
          <thead>
            <tr className="bg-orange-400 border">
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
         
          <tbody>
            {transactions.slice(0, 7).map((data,idx) => (
              <tr className="bg-white" key={idx}>
                <td>{data.date.split('-').reverse().join('-')}</td>
                <td>{typeof(data.type) === "object" ? data.type.label : data.type}</td>
                <td>{data.amount}</td>
                <td className={`${data.balance<0?'text-red-500':'text-green-600'} font-bold`}>{data.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* table-------------------------------------------- */}
      </div>
      {/* Chart section------------------------------------------------- */}
    </div>
  );
};

export default Dashboard;
