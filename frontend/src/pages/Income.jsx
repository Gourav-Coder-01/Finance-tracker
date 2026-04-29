import React, { useContext, useEffect, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { MdDeleteForever } from "react-icons/md";

const Income = () => {
  const { setIncome, income } = useContext(FinanceContext);
    const todayTime = new Date().toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'})
 

  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    type: "",
    amount: "",
  });

   const deleteExp = (idx)=>{
    setIncome(income.filter((_,i) => i !== idx))
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value, time:todayTime }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIncome(
      (data) => {
          const updated = [ ...data, formData ];

          updated.sort((a,b)=> new Date(b.date) - new Date(a.date));

          return updated
      }
    );
  };

  return (
    <div>
      <h1 className="text-center font-bold text-2xl text-green-900">Income</h1>
      <form
        className="my-2 mx-auto w-[90%] bg-green-400 p-1 flex justify-between items-center"
        onSubmit={submitHandler}
      >
        <input
          onChange={changeHandler}
          type="date"
          required
          className="outline-gray-300"
          name="date"
          value={formData.date}
        />
        <input
          onChange={changeHandler}
          type="text"
          placeholder="Income details"
          required
          className="outline-gray-300"
          name="description"
          value={formData.description}
        />
         <select name="type" onChange={changeHandler} required  className="outline-gray-400" value={formData.type}>
          <option value="">--Select Category--</option>
          <option value="Salary">Salary</option>
          <option value="Business">Business</option>
          <option value="Freelance">Freelance</option>
          <option value="Investment">Investment</option>
          <option value="Gift">Gift</option>
          <option value="Others">Others</option>
        </select>
        <input
          onChange={changeHandler}
          type="number"
          min={1}
          required
          placeholder="Amount"
          className="no-spinner outline-gray-300"
          name="amount"
          value={formData.amount}
        />
        <button
          type="submit"
          className="px-5 bg-black text-white outline-gray-300 cursor-pointer"
        >
          Add
        </button>
      </form>

      {/* for table---------------------------------------- */}
      <table className="w-[90%] mx-auto border text-center">
        <thead>
          <tr className="bg-green-300 border">
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {income.map((data,idx) => (
          <tr key={idx} className="bg-blue-200">
                <td>{data.date.split("-").reverse().join("-")}</td>
                <td>{data.description}</td>
                <td>{data.type}</td>
                <td>{data.amount}</td>
                <td className="flex justify-center mt-1 text-red-500">
                  <MdDeleteForever className="cursor-pointer" onClick={()=>deleteExp(idx)}/>
                </td>
          </tr>
            ))}
        </tbody>
      </table>
      {/* for table---------------------------------------- */}
    </div>
  );
};

export default Income;
