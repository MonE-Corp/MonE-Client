import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedLayout from "./Component/Protected/Layout/ProtectedLayout";
import MainDashboard from "./Component/Protected/Dashboard/MainDashboard";
import IncomeComponent from "./Component/Protected/Income/IncomeComponent";
import ExpensesComponent from "./Component/Protected/Expenses/ExpensesComponent";
import InvestmentComponent from "./Component/Protected/Investment/InvestmentComponent";
import HomePage from "./Component/pages/Homepage";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import { JSX } from "react";

// ----------------- ProtectedRoute -----------------
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Wait for AuthProvider

  if (!token) return <Navigate to="/" replace />; // Redirect if not logged in

  return children;
}

// ----------------- App -----------------
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<HomePage />} />

          {/* Protected Routes */}
          <Route
            path="/portal/*"
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<MainDashboard />} />
            <Route path="income" element={<IncomeComponent />} />
            <Route path="expenses" element={<ExpensesComponent />} />
            <Route path="investment" element={<InvestmentComponent />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
