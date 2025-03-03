import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword.jsx";

import Home from "./pages/Home.jsx";
import BuyCredit from "./pages/BuyCredit.jsx";
import Result from "./pages/result.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./pages/Login.jsx";
import { AppContext } from "./context/AppContext.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import OtpVerification from "./components/otpVerification.jsx";

const App = () => {
  const { showLogin, isOtpVerified, otpEmail } = useContext(AppContext);

   useEffect(() => {
    alert(
      "Welcome to our AI Image Generation Platform!\n\nSome functionality might not work because the backend is hosted on a free server.\nSorry!!!"
    );
}, []);


  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
      <ToastContainer position="bottom-right" />
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<BuyCredit />} />
        <Route path="/result" element={<Result />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* OTP Verification Route */}
        <Route
          path="/otp-verification"
          element={otpEmail ? <OtpVerification /> : <Navigate to="/" />}
        />

        {/* Reset Password Route */}
        <Route
          path="/reset-password"
          element={isOtpVerified ? <ResetPassword /> : <Navigate to="/" />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
