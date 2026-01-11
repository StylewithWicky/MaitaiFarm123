import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home"; 
import AdminLogin from "@/components/auth/LoginForm";  
import AdminDashboard from "@/admin/dashboard/page"; 
import AdminLayout from "@/admin/layout.jsx";  

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Home */}
       <Route path="/" element={<Home />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Dashboard protected with layout */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
