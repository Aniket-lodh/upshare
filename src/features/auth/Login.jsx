import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import loginTemp from "../../assets/images/login-temp.svg";
import { loginWithPasscode } from "../../api/userProfile";
import { Spinner } from "../../helpers/Loader";
import UserContext from "../../store/userContext";

const Login = () => {
  const [inputs, setInputs] = useState({ email: "", passcode: "" });
  const [isLoading, SetLoading] = useState(false);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const handleOnchange = async function (inpt) {
    const { name, value } = inpt;

    return setInputs((prevItems) => ({
      ...prevItems,
      [name]: value,
    }));
  };

  const HandleOnSubmit = async (e) => {
    e.preventDefault();
    SetLoading(true);
    const user = await loginWithPasscode(inputs);
    SetLoading(false);

    if (user && (user.code === 200 || user.data || user._id || !user.message)) {
      userCtx.addUser(user);
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="lg:flex">
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <div className="cursor-pointer flex items-center">
            <div>
              <img src={logo} className=" !stroke-cyan-500" alt="logo" />
            </div>
            <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
              Upshare
            </div>
          </div>
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
            xl:text-bold"
          >
            Log in
          </h2>
          <div className="mt-12">
            <form onSubmit={(e) => HandleOnSubmit(e)}>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Email Address
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 pl-1"
                  type="email"
                  role="textbox"
                  name="email"
                  required
                  placeholder="judydoe@gmail.com"
                  value={inputs.email}
                  onChange={(e) => handleOnchange(e.target)}
                />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Password
                  </div>
                  <div>
                    <Link
                      to={"/forgot-password"}
                      className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                cursor-pointer"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 p-1"
                  type="password"
                  role="textbox"
                  name="passcode"
                  required
                  placeholder="Enter your password"
                  value={inputs.passcode}
                  onChange={(e) => handleOnchange(e.target)}
                />
              </div>
              <div className="mt-10">
                <button
                  className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                        font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                        shadow-lg"
                  type="submit"
                >
                  {isLoading ? (
                    <span>
                      <Spinner />
                    </span>
                  ) : (
                    "Log In"
                  )}
                </button>
              </div>
            </form>
            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
              Don't have an account ?
              <Link
                to={"/signup"}
                className="cursor-pointer text-indigo-600 hover:text-indigo-800"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen">
        <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
          <img src={loginTemp} alt="template-login" className="w-5/6 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default Login;
