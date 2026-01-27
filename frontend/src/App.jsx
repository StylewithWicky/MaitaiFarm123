import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "@/admin/AdminLayout";
import GuestLayout from "@/guest/layout/GuestLayout";
import LoginForm from "./components/auth/LoginForm";
import Home from "./pages/Home"; 
import ProductGrid from "@/admin/product/ProductGrid"; 
import ProductDetails from "@/admin/product/ProductDetails"; 
import ProductUpload from "@/admin/product/uploads/ProductUpload";
import ContactSection from "./components/layout/ContactSection"; 
import WhatsAppButton from "./components/layout/WhatsAppButton";


const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  const role = localStorage.getItem("userRole");
  return (token && role === 'admin') ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<GuestLayout />}>
          <Route index element={
            <>
              <Home />
              <ContactSection /> 
            </>
          } />
          <Route path="products/:category" element={<ProductGrid />} />
          <Route path="products/:category/:id" element={<ProductDetails />} />
        </Route>

        
        <Route path="/admin/login" element={<LoginForm />} />

        
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Home />} />
          <Route path="upload" element={<ProductUpload />} />
          <Route path="products/:category" element={<ProductGrid />} />
          <Route path="products/:category/:id" element={<ProductDetails />} />
        </Route>

        {/* --- 404 Redirect --- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      
      <WhatsAppButton />
    </Router>
  );
}

export default App;
