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
  const [chartLine, setChartLine] = useState({});
  const [basis, setBasis] = useState("Weekly");

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

  let todayDate = new Date();
  function groupByWeeks(data) {
    // Sort by date first
    const sorted = [...data].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );

    const result = []; // all weeks store inside it
    let weekBucket = []; // week entry
    let startDate = new Date(sorted[0].date);

    sorted.forEach((item) => {
      const currentDate = new Date(item.date);
      const diffDays = Math.floor(
        (currentDate - startDate) / (1000 * 60 * 60 * 24),
      ); //Subtracting two Date objects gives the difference in milliseconds.

      // switch-------------------------------------------

      switch (basis) {
        case "Weekly":
          if (diffDays < 7) {
            // still within the same 7‑day window
            weekBucket.push(item);
          } else {
            // push finished week and start a new one
            result.push(weekBucket);
            weekBucket = [item];
            startDate = currentDate;
          }
          break;

        case "Today":
          if (item.date === todayDate.toISOString().split("T")[0]) {
            result.push({ time: item.time, amount: item.amount });
          }
          break;

        case "Daily":
          result.push({ day: item.date, amount: item.amount });
          break;

        case "Monthly":
          if (
            Math.floor(diffDays / new Date().getMonth()) < new Date().getMonth()
          ) {
            result.push({ amount: item.amount });
          }
          break;

        default:
          break;
      }

      // switch-------------------------------------------
    });

    // push the last bucket

    if (weekBucket.length) result.push(weekBucket);

    return result;
  }

  // console.log(groupByWeeks(expense));
  console.log(todayDate.getDay('march'))
  // for control chart with duration--------------------------------
  // ---------------
  useEffect(() => {
    const expNegArr = expense.map((item) => ({
      ...item,
      amount: -Math.abs(Number(item.amount)),
    }));

    // for control chart with duration--------------------------------

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
    const dataObj = {};

    const chartExp = [...expense].reverse().map((data) => ({
      balance: data.amount,
      date: data.date,
      time: data.time,
    }));
    const chartInc = [...income].reverse().map((data) => ({
      balance: data.amount,
      date: data.date,
      time: data.time,
    }));
    //  const chartwithBal = withBalance.map(data=>({amount:data.amount,date:data.date,time:data.time,balance:data.balance}))
    const chartwithBal = Object.values(
      withBalance.reduce((acc, data) => {
        if (!acc[data.date]) {
          // first time this date appears → create entry
          acc[data.date] = {
            date: data.date,
            time: data.time,
            amount: Number(data.amount),
            balance: Number(data.balance),
          };
        } else {
          // date already exists → merge amounts & balances
          acc[data.date].amount += Number(data.amount);
          acc[data.date].balance += Number(data.amount);
        }
        return acc;
      }, {}),
    );

    const heroo = { ...dataObj, chartExp, chartInc, chartwithBal };
    setChartLine(heroo);
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
    chartLine,
    setChartLine,
  };

  return (
    <FinanceContext.Provider value={value}>
      {props.children}
    </FinanceContext.Provider>
  );
};

export default FinanceContextProvider;
