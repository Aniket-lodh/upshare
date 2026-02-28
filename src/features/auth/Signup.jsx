import logo from "../../assets/images/logo.svg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../helpers/Loader";
import { SignupWithPasscode } from "../../api/userProfile";
import { useUser } from "../../store/userContext";
import { useToast } from "../../components/Toast.jsx";

const Signup = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    passcode: "",
    passcodeConfirm: "",
  });
  const [loading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    setError(null);
    try {
      const user = await SignupWithPasscode(inputs);
      addUser(user);
      showToast("Signup successful", "success");
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
      showToast(err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden flex">
        {/* Left Side — Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-10 space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <img src={logo} alt="Logo" className="h-8" />
            <h1 className="text-2xl font-bold tracking-wide">
              Up<span className="text-blue-600">Share</span>
            </h1>
          </div>

          {/* Title */}
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-2xl font-semibold text-gray-900">
              Create your account
            </h2>
            <p className="text-sm text-gray-500">
              Start sharing and discovering.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={HandleOnSubmit} className="space-y-4">
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={(e) => handleOnchange(e.target)}
              placeholder="Full Name"
              required
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400"
            />

            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={(e) => handleOnchange(e.target)}
              placeholder="Email"
              required
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400"
            />

            <input
              type="password"
              name="passcode"
              value={inputs.passcode}
              onChange={(e) => handleOnchange(e.target)}
              placeholder="Password"
              required
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400"
            />

            <input
              type="password"
              name="passcodeConfirm"
              value={inputs.passcodeConfirm}
              onChange={(e) => handleOnchange(e.target)}
              placeholder="Confirm Password"
              required
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400"
            />

            <button
              type="submit"
              className="w-full h-11 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              {loading ? <Spinner /> : "Sign Up"}
            </button>
          </form>
        </div>

        {/* Right Side — Illustration */}
        <div className="hidden lg:flex w-1/2 bg-blue-50 items-center justify-center p-10">
          <img
            src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
            alt="Signup"
            className="max-w-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
