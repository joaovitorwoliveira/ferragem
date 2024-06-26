import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Order from "./pages/Order";
import Products from "./pages/Products";
import Reports from "./pages/Reports";
import Dashboard from "./pages/Dashboard";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
