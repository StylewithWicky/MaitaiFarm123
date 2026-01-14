import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Layout & Auth
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./components/auth/LoginForm";

// Pages
import Home from "./pages/Home"; 
import ProductGrid from "@/admin/product/ProductGrid"; 
import ProductDetails from "@/admin/product/ProductDetails"; 
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/admin/login" element={<AdminLogin />} />
        
        
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          
         
          <Route path="dashboard" element={<Home />} />

         
          <Route path="products/:category" element={<ProductGrid />} />
          
          
          <Route path="products/:category/:id" element={<ProductDetails />} />
        </Route>

       
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
