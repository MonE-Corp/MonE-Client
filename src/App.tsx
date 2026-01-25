import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedLayout from "./Component/Protected/Layout/ProtectedLayout";
import MainDashboard from "./Component/Protected/Dashboard/MainDashboard";
import IncomeComponent from "./Component/Protected/Income/IncomeComponent";
import ExpensesComponent from "./Component/Protected/Expenses/ExpensesComponent";
import InvestmentComponent from "./Component/Protected/Investment/InvestmentComponent";
import HomePage from "./Component/pages/Homepage";
import SignInForm from "./Component/form/SignInForm";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />

        {/* Protected Routes */}
        <Route path="/portal" element={<ProtectedLayout />}>
          <Route index element={<MainDashboard />} />
          <Route path="income" element={<IncomeComponent />} />
          <Route path="expenses" element={<ExpensesComponent />} />
          <Route path="investment" element={<InvestmentComponent />} />
          
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
