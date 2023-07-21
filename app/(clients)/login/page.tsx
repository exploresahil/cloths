"use client";

import GoogleIcon from "@/components/icons/GoogleIcon";
import HiddenPassword from "@/components/icons/HiddenPassword";
import ShownPassword from "@/components/icons/ShownPassword";
import { useState } from "react";
import { LuUser } from "react-icons/lu";

const Login = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleToglePasswordShow = () => {
    setIsPasswordShown(!isPasswordShown);
  };
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="login-main-container">
      <div className="login-container">
        <div className="login-svg">
          <LuUser />
        </div>
        <div className="login-input-container">
          <h3>Login</h3>
          <form action="#">
            <div className="inputs">
              <label>EMAIL / PHONE NO.</label>
              <input type="text" required />
              <label>OTP</label>
              <div className="otp-container">
                <input
                  type={isPasswordShown ? "text" : "password"}
                  name=""
                  id=""
                  value={inputValue}
                  required
                  onChange={handleInputChange}
                />
                {inputValue.length > 0 && (
                  <button
                    className="eye-container"
                    type="button"
                    onClick={handleToglePasswordShow}
                  >
                    {isPasswordShown ? <ShownPassword /> : <HiddenPassword />}
                  </button>
                )}
              </div>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="register-buttons-container">
          <p className="or-container">OR</p>
          <button type="button">
            <GoogleIcon /> Continue With Google
          </button>
          <p>Don&#39;t have an account yet?</p>
          <button type="button">Create New Account</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
