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
import { set } from "@/redux/reducer/userSlice";
import { set as Set } from "@/redux/reducer/cartSlice";
import { addUserData } from "@/redux/reducer/userData";
const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
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
              EmailLogin(inputValue.email, inputValue.password)
                .then(async (data) => {
                  console.log(data);

                  if (data.error?.message == "User already registered")
                    db.auth.signInWithPassword({
                      email: inputValue.email,
                      password: inputValue.password,
                    }).then(async () => {
                      await getUser().then(async (data) => {
                        console.log(data?.data);
                        const data_ = await getRedx(data?.extra_data.id);
                        console.log(data_);

                        dispatch(set(data_.data?.at(0).Redux?.userSlice || []));
                        dispatch(Set(data_.data?.at(0).Redux?.CardReducer || []));
                        dispatch(addUserData(data))

                        window.location.href = "/user"
                      });
                    });
                  else if (!data.error?.message) {
                    await getUser().then(async (data) => {
                      // console.log(data);
                      const data_ = await getRedx(data?.extra_data.id);
                      console.log(data_);

                      dispatch(set([]));
                      dispatch(Set([]));
                      window.location.href = "/user"
                    });
                  };

                })
                .catch((e) => {
                  console.log(e);

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
