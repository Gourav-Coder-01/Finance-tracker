import React, { createContext, useEffect, useState } from "react";

export const FinanceContext = createContext();

const FinanceContextProvider = (props) => {
  const [income, setIncome] = useState(() => {
    try {
      const saveIncome = localStorage.getItem("incomes");
      return saveIncome ? JSON.parse(saveIncome) : [];
    } catch (error) {
      console.log("invalid incomeJson", error);
      return [];
    }
  });

  const [typee, setType] = useState([]);
  const [chartLine,setChartLine] = useState({});
  const [basis, setBasis] = useState("Today");

  const [expense, setExpense] = useState(() => {
    try {
      const saved = localStorage.getItem("expenses");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  });

  const [transactions, setTransactions] = useState([]);

 

  // for control chart with duration--------------------------------


  // for control chart with duration--------------------------------
  // ---------------
  useEffect(() => {
    const expNegArr = expense.map((item) => ({
      ...item,
      amount: -Math.abs(Number(item.amount)),
    }));

   

// for control chart with duration--------------------------------

switch (basis) {
  case 'Today':
    
    break;
    default:
      break;
    }
    
    // for control chart with duration--------------------------------
    
    // merger income and expenses
    
    const all = [
      ...income.map((item) => ({ ...item, amount: Number(item.amount) })),
      ...expNegArr,
    ];
    
    // console.log(income)
    // sort by date-----
    const sorted = all.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // running balance
    
    let running = 0;
    const withBalance = sorted.map((item) => {
      running += item.amount;
      return { ...item, balance: running };
    });


    setTransactions([...withBalance].reverse());
      // for control chart line--------------------------------
 const dataObj = {}

 const chartExp = expense.map(data=>({balance:data.amount,date:data.date,time:data.time}))
 const chartInc = income.map(data=>({balance:data.amount,date:data.date,time:data.time}))
//  const chartwithBal = withBalance.map(data=>({amount:data.amount,date:data.date,time:data.time,balance:data.balance}))
const chartwithBal = Object.values(
  withBalance.reduce((acc, data) => {
    if (!acc[data.date]) {
      // first time this date appears → create entry
      acc[data.date] = {
        date: data.date,
        time: data.time,
        amount: Number(data.amount),
        balance: Number(data.balance)
      };
    } else {
      // date already exists → merge amounts & balances
      acc[data.date].amount += Number(data.amount);
      acc[data.date].balance += Number(data.amount);
    }
    return acc;
  }, {})
);


 const heroo = {...dataObj,chartExp,chartInc,chartwithBal}
 setChartLine(heroo)
// for control chart line--------------------------------
// console.log(chartwithBal)

    
    

    expense.forEach((data) => {
      setType((prev) => {
        const existing = prev.find((item) => item.type === data.type.label);

        if (existing) {
          return prev.map((item) =>
            item.type === data.type.label
              ? {
                  ...item,
                  amount: item.amount + Number(data.amount),
                  color: data.type.color,
                }
              : item,
          );
        } else {
          return [
            ...prev,
            {
              type: data.type.label,
              amount: Number(data.amount),
              color: data.type.color,
            },
          ];
        }
      });
    });
  }, [income, expense]);

  // ---------------

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expense));
    localStorage.setItem("incomes", JSON.stringify(income));
  }, [expense, income]);


  

  const value = {
    income,
    setIncome,
    expense,
    setExpense,
    transactions,
    setTransactions,
    typee,
    setType,
    basis,
    setBasis,
    chartLine,setChartLine
  };

  return (
    <FinanceContext.Provider value={value}>
      {props.children}
    </FinanceContext.Provider>
  );
};

export default FinanceContextProvider;
