import React, { useState, useContext } from "react";
import { AppContext } from "../Context/AppContext.jsx";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ResetPassword from "./ResetPassword.jsx";

const ForgotPassword = ({ setShowForgotPassword }) => {
  const { requestOtp, verifyOtp, otpEmail, setOtpEmail } = useContext(AppContext);
  const [step, setStep] = useState(1); 
  const [otp, setOtp] = useState("");

  const handleEmailSubmit = async () => {
    if (!otpEmail) {
      return toast.error("Please enter your email.");
    }
    await requestOtp(otpEmail);
    setStep(2);
  };

  const handleOtpSubmit = async () => {
    if (!otp) {
      return toast.error("Please enter the OTP.");
    }
    const success = await verifyOtp(otpEmail, otp);
    if (success) {
      setStep(3);
    }
  };

  return (
    <motion.div
      className="relative bg-white p-10 rounded-xl text-slate-500"
      initial={{ opacity: 0.2, y: 50 }}
      transition={{ duration: 0.3 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {step === 1 && (
        <>
          <h2 className="text-lg font-bold">Forgot Password</h2>
          <input
            type="email"
            className="border px-4 py-2 w-full rounded mt-4"
            placeholder="Enter your email"
            value={otpEmail}
            onChange={(e) => setOtpEmail(e.target.value)}
          />
          <button className="bg-blue-600 text-white py-2 rounded w-full mt-4" onClick={handleEmailSubmit}>
            Request OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-lg font-bold">Enter OTP</h2>
          <input
            type="text"
            className="border px-4 py-2 w-full rounded mt-4"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="bg-blue-600 text-white py-2 rounded w-full mt-4" onClick={handleOtpSubmit}>
            Verify OTP
          </button>
        </>
      )}

      {step === 3 && <ResetPassword />}
    </motion.div>
  );
};

export default ForgotPassword;
