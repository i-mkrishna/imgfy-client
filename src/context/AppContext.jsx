import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [credits, setCredits] = useState(0);
  const navigate = useNavigate();
  const [otpEmail, setOtpEmail] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpStored, setOtp] = useState();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const loadCreditsData = async () => {
    if (!token) {
      console.error("No token found. User is not authenticated.");
      return;
    }

    console.log("app context", token);

    try {
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setCredits(data.credits);
        setUser(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error loading user data:", error.response?.data || error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        logout();
      } else {
        toast.error("Failed to load user data. Please try again.");
      }
    }
  };

  const generateImage = async (prompt) => {
    if (!token) {
      toast.error("Please log in to generate images.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image`,
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        loadCreditsData();
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCreditsData();

        if (data.creditBalance === 0) {
          setTimeout(() => navigate("/buy"), 1000);
        }
      }
    } catch (error) {
      console.error("Image Generation Error:", error);
      toast.error("Failed to generate image. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setCredits(0);
    toast.success("Logged out successfully.");
  };

  useEffect(() => {
    if (token) loadCreditsData();
    console.log("token in useeffect", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const requestOtp = async (email) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/request-otp`, {
        email,
      });

      if (data.success) {
        setOtpEmail(email);
        toast.success("OTP sent to your email.");
        navigate("/otp-verification"); // Redirect to OTP verification page
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("OTP Request Error:", error.response?.data || error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  useEffect(() => {
    const storedOtpVerified = sessionStorage.getItem("isOtpVerified");
    if (storedOtpVerified) {
      setIsOtpVerified(true);
    }
  }, []);

  const verifyOtp = async (email, otp) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-otp`, {
        email,
        otp,
      });
  
      if (data.success) {
        toast.success("OTP Verified! You can reset your password now.");
        setIsOtpVerified(true);
        setShowLogin(false);
        setOtp(otp); // ✅ Store OTP here
        console.log("Stored OTP:", otp);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("OTP Verification Error:", error.response?.data || error);
      toast.error("Invalid or expired OTP. Please try again.");
    }
  };
  

  // 🔹 Use useEffect to navigate after state updates
  useEffect(() => {
    if (isOtpVerified) {
      console.log("Navigating to /reset-password");
      navigate("/reset-password");
    }
  }, [isOtpVerified]);

  const resetPassword = async (email, newPassword) => {
    console.log("Resetting password with:", email, otpStored, newPassword);
  
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/reset-password`,
        {
          email,
          otp: otpStored,  // ✅ Use stored OTP
          newPassword,
        }
      );
  
      if (data.success) {
        toast.success("Password reset successful! Please log in.");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Reset Password Error:", error.response?.data || error);
      toast.error("Failed to reset password. Please try again.");
    }
  };
  

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        token,
        setToken,
        credits,
        setCredits,
        loadCreditsData,
        logout,
        generateImage,
        otpEmail,
        setOtpEmail,
        requestOtp,
        verifyOtp,
        resetPassword,
        isOtpVerified,
        otpStored
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider as AppProvider };
