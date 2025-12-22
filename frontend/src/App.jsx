import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

function App() {
  return (
    <BrowserRouter>
     
        <Routes>
          <Route >
          <Route path="/login" element={<AuthLayout />} />
          <Route path="/register" element={<AuthLayout />}/>
          </Route>
        </Routes>
        
    </BrowserRouter>
  );
}

export default App;

