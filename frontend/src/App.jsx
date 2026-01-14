import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Layout & Auth
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./components/auth/LoginForm";

// Pages
import Dashboard from "./pages/Home"; 
import ProductGrid from "@/admin/product/ProductGrid"; // The shared logic for Grid
import ProductDetails from "@/admin/product/ProductDetails"; // The shared logic for Details

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public / Auth */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* All Admin Routes Wrapped in Protection */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          
          {/* Dashboard (Your Home.jsx) */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* DYNAMIC PRODUCT ROUTES */}
          {/* This handles /admin/products/Honey, /admin/products/K9, etc. */}
          <Route path="products/:category" element={<ProductGrid />} />
          
          {/* This handles /admin/products/Honey/:id, etc. */}
          <Route path="products/:category/:id" element={<ProductDetails />} />
        </Route>

        {/* Redirect empty admin path to dashboard */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
