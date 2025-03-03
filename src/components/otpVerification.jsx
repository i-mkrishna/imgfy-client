import { useContext, useState } from "react";
import {AppContext} from "../context/AppContext";

const OtpVerification = () => {
  const { email, requestOtp, verifyOtp, loading } = useContext(AppContext);
  const [inputEmail, setInputEmail] = useState(email);
  const [otp, setOtp] = useState("");

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4">OTP Verification</h2>

      {!email ? (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            className="border p-2 mb-2"
          />
          <button
            onClick={() => requestOtp(inputEmail)}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Sending OTP..." : "Request OTP"}
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 mb-2"
          />
          <button
            onClick={() => verifyOtp(otp)}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </button>
        </>
      )}
    </div>
  );
};

export default OtpVerification;
