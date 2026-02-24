import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import loginTemp from "../../assets/images/login-temp.svg";
import { loginWithPasscode } from "../../api/userProfile";
import { Spinner } from "../../helpers/Loader";
import { useUser } from "../../store/userContext";
import { useToast } from "../../components/Toast.jsx";

const Login = () => {
  const [inputs, setInputs] = useState({ email: "", passcode: "" });
  const [isLoading, SetLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addUser } = useUser();
  const navigate = useNavigate();
  const showToast = useToast();

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
    setError(null);
    try {
      const user = await loginWithPasscode(inputs);
      addUser(user);
      showToast("Login successful", "success");
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
      showToast(err.message, "error");
    } finally {
      SetLoading(false);
    }
  };

  return (
    <div className="lg:flex">
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="py-12 bg-blue-50 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <div className="cursor-pointer flex items-center">
            <div>
              <img src={logo} className=" !stroke-blue-500" alt="logo" />
            </div>
            <div className="text-2xl text-blue-800 tracking-wide ml-2 font-semibold">
              Upshare
            </div>
          </div>
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl pb-20 lg:pb-0">
          <h2
            className="text-center text-4xl text-blue-900 font-display font-semibold lg:text-left xl:text-5xl
            xl:text-bold"
          >
            Log in
          </h2>
          <div className="mt-12">
            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}
            <form onSubmit={(e) => HandleOnSubmit(e)}>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Email Address
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition pl-1"
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
                      className="text-xs font-display font-semibold text-blue-600 hover:text-blue-800
                                cursor-pointer transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition p-1"
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
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg p-4 w-full transition-all duration-150
                        active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                        shadow-sm"
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
                className="cursor-pointer text-blue-600 hover:text-blue-800"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center bg-blue-50 flex-1 h-screen">
        <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
          <img src={loginTemp} alt="template-login" className="w-5/6 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default Login;
