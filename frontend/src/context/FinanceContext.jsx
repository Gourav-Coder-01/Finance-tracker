import React, { createContext, useEffect, useState } from "react";

export const FinanceContext = createContext();

const FinanceContextProvider = (props) => {
  const [income, setIncome] = useState(()=> {
    try {
      const saveIncome = localStorage.getItem("incomes");
      return saveIncome ? JSON.parse(saveIncome): [];
    } catch (error) {
      console.log("invalid incomeJson",error)
      return [];
    }
  });

  const [typee,setType] = useState([]);

  const [expense, setExpense] = useState(() => {
    try {
      const saved = localStorage.getItem("expenses");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.log(error)
      return [];
    }
    
  });

    const [transactions,setTransactions] = useState([])

    // ---------------
    useEffect(()=>{


    const expNegArr = expense.map(item => ({
      ...item,
      amount: -Math.abs(Number(item.amount))
    }))

    // merger income and expenses

    const all = [...income.map(item=>({ ...item, amount: Number(item.amount)})),
      ...expNegArr
    ];

// sort by date-----
const sorted = all.sort((a,b)=> new Date(a.date)- new Date(b.date));

// running balance

let running = 0;
const withBalance = sorted.map(item=>{
  running += item.amount;
  return{...item, balance:running}
})

setTransactions(withBalance)


withBalance.map(dataa=>{
  setType(prev => {
    if(!prev.includes(dataa.type)){
      return [...prev, dataa.type]
    }
    return prev;
  })
})

console.log(withBalance)

},[income,expense])
// console.log(typee)


   
    // ---------------




  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expense));
    localStorage.setItem('incomes', JSON.stringify(income))
  }, [expense,income]);

  const [balance, setBalance] = useState("");

  const value = {
    income,
    setIncome,
    expense,
    setExpense,
    setBalance,
    balance,
    transactions,
    setTransactions,
    typee,
    setType
  };

  return (
    <FinanceContext.Provider value={value}>
      {props.children}
    </FinanceContext.Provider>
  );
};

export default FinanceContextProvider;
