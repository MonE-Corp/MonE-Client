import { FC, useEffect, useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import ChartComponent from "./Components/ChartComponent";
import Insights from "./Components/Insights";
import Footer from "../Layout/Footer";
import "./styles.css";

interface DataItem {
  amount: number;
  date: string;
  income_type?: "Salary" | "Tax_Return" | "Gift" | "Investment_Return"; 
  expense_type?: "Expenses" | "Debt_Payment" | "Investment";  
}

interface FilteredData {
  income: DataItem[];
  expenses: DataItem[];
  investments: DataItem[];
}

const MainDashboard: FC = () => {
  const { token, logout } = useAuth();
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | "">("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [chartView, setChartView] = useState<"Net" | "Total">("Total");

  const [data, setData] = useState<FilteredData>({
    income: [],
    expenses: [],
    investments: [],
  });



  /* -----------------------------
       FETCH AVAILABLE YEARS
  ----------------------------- */
  useEffect(() => {
     // fallback to localStorage if token is null
  const authToken = token || localStorage.getItem("token");
  if (!authToken) throw new Error("No token found");

    fetch("https://mone-awhhcwb7baccf5g0.canadacentral-01.azurewebsites.net/api/dashboard/years", {
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then(async (res) => {
        if (res.status === 401) {
          logout();
          return [];
        }
        return res.json();
      })
      .then((yearsData: number[]) => {
        if (!Array.isArray(yearsData)) return;

        setYears(yearsData);

      const currentYear = new Date().getFullYear();

      if (yearsData.includes(currentYear)) {
        setSelectedYear(currentYear);
      } 
      else if (yearsData.length > 0) {
        setSelectedYear(Math.max(...yearsData));
      }
      })
      .catch(console.error);
  }, [token, logout]);

  /* -----------------------------
       FETCH FILTERED DATA
  ----------------------------- */
  useEffect(() => {
    if (!token || !selectedYear) return;

    let url = `https://mone-awhhcwb7baccf5g0.canadacentral-01.azurewebsites.net/api/dashboard/filter?year=${selectedYear}`;
    if (selectedMonth) url += `&month=${selectedMonth}`;
     // fallback to localStorage if token is null
  const authToken = token || localStorage.getItem("token");
  if (!authToken) throw new Error("No token found");
    fetch(url, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then(async (res) => {
        if (res.status === 401) {
          logout();
          return { income: [], expenses: [], investments: [] };
        }
        return res.json();
      })
      .then((fetchedData: FilteredData) => {
        if (fetchedData?.income && fetchedData?.expenses && fetchedData?.investments) {
          setData(fetchedData);
        }
      })
      .catch(console.error);
  }, [selectedYear, selectedMonth, token, logout]);

  /* -----------------------------
       CALCULATE TOTALS
  ----------------------------- */
  const totalIncome = data.income.reduce((acc, item) => acc + item.amount, 0);
   const netIncome = data.income
    .filter(item => item.income_type === "Salary")
    .reduce((acc, item) => acc + item.amount, 0);


  const totalExpenses = data.expenses.reduce((acc, item) => acc + item.amount, 0);
   const netExpenses = data.expenses
    .filter(item => item.expense_type === "Expenses")
    .reduce((acc, item) => acc + item.amount, 0);
    
  const totalInvestments = data.investments.reduce((acc, item) => acc + Number(item.amount), 0);

  return (
    <div className="d-flex flex-column">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <h2 className="mb-0">Dashboard</h2>

        <div className="d-flex flex-column flex-sm-row gap-3 w-80 w-md-auto">

          <select
            className="form-select form-select-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            <option value="">Select Year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            className="form-select form-select-sm"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {new Date(0, m - 1).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>
      </div>

      <hr className="componentLine" />

{/* Chart Filter */}
      <div className="d-flex gap-2 mb-3 align-items-center">
  <label htmlFor="chartView" className="mb-0">View:</label>
  <select
    id="chartView"
    className=" form-select form-select-sm"
    style={{ width: "150px" }}
    value={chartView}
    onChange={(e) => setChartView(e.target.value as "Net" | "Total")}
  >
    <option value="Total">Total</option>
    <option value="Net">Net</option>
  </select>
</div>

      <div className="d-flex flex-column flex-md-row justify-content-evenly align-items-start gap-4">
  {/* Chart */}
  
  <div className="mt-4 w-100 w-md-auto d-flex justify-content-center">
    
    <ChartComponent
  incomeTotal={chartView === "Total" ? totalIncome : netIncome}
  expenseTotal={chartView === "Total" ? totalExpenses : netExpenses}
  investmentTotal={totalInvestments} // Investment usually has no "Net"
  view={chartView}
/>
  </div>

  {/* Totals & Net Boxes */}
  <div className="d-flex flex-column flex-md-row gap-4 w-100 w-md-auto">
    {/* Total Column */}
    <div className="d-flex flex-column gap-4 w-md-50 w-100">
      <div className="p-3 text-center dashboardBox">
        <h6>Total Income</h6>
        <h6 className="text-success">${totalIncome.toFixed(2)}</h6>
      </div>
      <div className="p-3 text-center dashboardBox">
        <h6>Total Expenses</h6>
        <h6 className="text-danger">${totalExpenses.toFixed(2)}</h6>
      </div>
      <div className="p-3 text-center dashboardBox">
        <h6>Total Investments</h6>
        <h6 className="text-primary">${totalInvestments.toFixed(2)}</h6>
      </div>
    </div>

    {/* Net Column */}
    <div className="d-flex flex-column gap-4 w-md-50 w-100 ">
      <div className="p-3 text-center dashboardBox">
        <h6>Net Income</h6>
        <h6 className="text-success">${netIncome.toFixed(2)}</h6>
      </div>
      <div className="p-3 text-center dashboardBox">
        <h6>Net Expenses</h6>
        <h6 className="text-danger">${netExpenses.toFixed(2)}</h6>
      </div>
      <div className="p-3 text-center dashboardBox">
        <h6>Net Investments</h6>
        <h6 className="text-primary">N/A</h6>
      </div>
    </div>
  </div>
</div>

{/* ----------------------------- Insights ----------------------------- */}
      <div className="mt-4">
        <h4>Insights</h4>
        <Insights
          totalIncome={totalIncome}
          netIncome={netIncome}
          totalExpenses={totalExpenses}
          netExpenses={netExpenses}
          totalInvestments={totalInvestments} 
          expenses={data.expenses}        />
      </div>

{/* ----------------------------- Footer ----------------------------- */}
      <Footer />

    </div>
  );
};

export default MainDashboard;
