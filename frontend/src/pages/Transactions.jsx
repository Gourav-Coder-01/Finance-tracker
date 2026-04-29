import React, { useContext, useEffect, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { MdDeleteForever } from "react-icons/md";

const Transactions = () => {
  const { income, expense,transactions,setTransactions } = useContext(FinanceContext);  

  return (
    <div>
      <h1 className="text-center font-bold text-2xl text-blue-700">Transactions</h1>

      {/* for table---------------------------------------- */}
      <table className="w-[90%] mx-auto border text-center">
        <thead>
          <tr className="bg-red-400 border">
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
            {transactions.map((data,idx) => (
          <tr key={idx} className="bg-blue-200">
                <td>{data.date.split("-").reverse().join("-")}</td>
                <td>{data.description}</td>
                <td>{typeof(data.type) === "object" ? data.type.label : data.type}</td>
                <td className={`${data.amount<0?"text-red-500":"text-green-700"}`}>{data.amount}</td>
               <td className={`text-blue-600 ${data.balance<0 ?'font-bold text-red-800' : ''}`}>
                               {data.balance}
                              </td>
          </tr>
            ))}
        </tbody>
      </table>
      {/* for table---------------------------------------- */}
    </div>
  );
};

export default Transactions;
