import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { isOtpVerified, otpEmail, otp, resetPassword } = useContext(AppContext);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // If OTP is not verified, redirect to home ("/") instead of OTP verification page
  useEffect(() => {
    if (!isOtpVerified) {
      navigate("/");
    }
  }, [isOtpVerified, navigate]);

  const handleReset = () => {
    if (!newPassword || !confirmPassword) {
      setError("Please fill in both fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setNewPassword(newPassword);
    console.log(newPassword);
    console.log(otpEmail, newPassword);

    resetPassword(otpEmail, newPassword); // Call the reset function
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button
          onClick={handleReset}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
