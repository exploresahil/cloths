"use client";
import db from "@/backend/Backend.client";
import { EmailLogin, getRedx, getUser, googleLogin } from "@/backend/User";
import GoogleIcon from "@/components/icons/GoogleIcon";
import HiddenPassword from "@/components/icons/HiddenPassword";
import ShownPassword from "@/components/icons/ShownPassword";
import { useState } from "react";
import { LuUser } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { set } from "@/redux/reducer/userSlice"
import { set as Set } from "@/redux/reducer/cartSlice"
const Login = () => {

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    phone: "",
  });

  const handleToglePasswordShow = () => {
    setIsPasswordShown(!isPasswordShown);
  };
  const handleInputChange = (e: any) => {
    setInputValue((s) => ({
      ...s,
      password: e.target.value,
    }));
  };

  return (
    <div className="login-main-container">
      <div className="login-container">
        <div className="login-svg">
          <LuUser />
        </div>
        <div className="login-input-container">
          <h3>Login / Register</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              EmailLogin(
                inputValue.email,
                inputValue.password,
                inputValue.phone
              )
                .then(async (data) => {


                  if (data.error?.message == "User already registered")
                    db.auth.signInWithPassword({
                      email: inputValue.email,
                      password: inputValue.password,
                      phone: inputValue.phone,
                    });
                  else alert(data.error?.message);
                  await getUser().then(async (data) => {
                    // console.log(data);
                    const data_ = await getRedx(data.extra_data.id);
                    dispatch(set(data_.data?.at(0).Redux.userSlice))
                    dispatch(Set(data_.data?.at(0).Redux.CardReducer))
                    router.push("/user");
                  });
                })
                .catch((e) => {
                  alert("An error occurred: " + e.message);
                });
            }}
          >
            <div className="inputs">
              <label>EMAIL </label>
              <input
                value={inputValue.email}
                onChange={(e) =>
                  setInputValue((v) => ({ ...v, email: e.target.value }))
                }
                type="text"
                required
              />
              <label>Phone No </label>
              <input
                value={inputValue.phone}
                onChange={(e) =>
                  setInputValue((v) => ({ ...v, phone: e.target.value }))
                }
                type="text"
                required
              />
              <label>Password</label>
              <div className="otp-container">
                <input
                  type={isPasswordShown ? "text" : "password"}
                  name=""
                  id=""
                  value={inputValue.password}
                  required
                  onChange={handleInputChange}
                />
                {inputValue.password !== "" && (
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
          <button type="button" onClick={() => googleLogin()}>
            <GoogleIcon /> Continue With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
