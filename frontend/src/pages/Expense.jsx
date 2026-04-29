import React, { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { MdDeleteForever } from "react-icons/md";

const Expense = () => {
  const { setExpense, expense } = useContext(FinanceContext);

  const today = new Date().toISOString().split("T")[0];
  const todayTime = new Date().toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'})

  const [formData, setFormData] = useState({
    date: "",
    description: "",
    type: "",
    amount: "",
    // time:"",
  });

  const deleteExp = (idx)=>{
    setExpense(expense.filter((_,i) => i !== idx))
  };

  


  const changeHandler = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if(name === 'type' && value){
      try {
        value = JSON.parse(value)
      } catch (error) {
        console.error('invalid json',error)
      }
    }

    setFormData((data) => ({ ...data, [name]:value,time:todayTime}));
  };


  const submitHandler = (e) => {
    e.preventDefault();
    setExpense((data) => {
      
     const updated =  [ ...data, formData ];

     updated.sort((a,b)=> new Date(b.date) - new Date(a.date));
     return updated
    }
    );
      localStorage.setItem('expense',expense)
  };

  return (
    <div>
      <h1 className="text-center font-bold text-2xl text-red-500">Expense</h1>
      <form
        className="my-2 mx-auto w-[90%] bg-red-400 p-1 flex justify-between items-center"
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
          placeholder="Description(exp. details)"
          required
          className="outline-gray-300"
          name="description"
          value={formData.description}
        />
       <select
  name="type"
  onChange={changeHandler}
  required
  className="outline-gray-400"
>
  <option value="">--Select Category--</option>
  <option value='{"label":"Food","color":"rgba(255,255,0,0.1)"}'>Food</option>
  <option value='{"label":"Grocery","color":"rgba(0,128,0,0.5)"}'>Grocery</option>
  <option value='{"label":"Travel","color":"rgba(0,0,255,0.5)"}'>Travel</option>
  <option value='{"label":"Rent","color":"rgba(255,0,0,0.5)"}'>Rent</option>
  <option value='{"label":"Loan","color":"rgba(128,0,128,0.5)"}'>Loan</option>
  <option value='{"label":"Emergency","color":"rgba(255,165,0,0.5)"}'>Emergency</option>
  <option value='{"label":"Others","color":"rgba(100,100,100,0.5)"}'>Others</option>
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
          <tr className="bg-red-400 border">
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {expense.map((data,idx) => (
          <tr key={idx} className="bg-blue-200">
                <td>{data.date.split("-").reverse().join("-")}</td>
                <td>{data.description}</td>
                <td>{data.type.label}</td>
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

export default Expense;
