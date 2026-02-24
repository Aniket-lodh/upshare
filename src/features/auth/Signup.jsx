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
    <div className="h-screen max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center gap-2">
            <img src={logo} className="mx-auto" />
            <h1 className="text-2xl xl:text-3xl font-extrabold text-blue-800 tracking-wide">
              upshare
            </h1>
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center pb-20 lg:pb-0">
          <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
          <div className="w-full flex-1 mt-8">
            <div className="flex flex-col items-center">
              <button
                onClick={() => {
                  // Google OAuth not implemented yet
                }}
                className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center transition-all duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                <div className="bg-white p-2 rounded-full">
                  <svg className="w-4" viewBox="0 0 533.5 544.3">
                    <path
                      d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                      fill="#4285f4"
                    />
                    <path
                      d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                      fill="#34a853"
                    />
                    <path
                      d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                      fill="#fbbc04"
                    />
                    <path
                      d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                      fill="#ea4335"
                    />
                  </svg>
                </div>
                <span className="ml-4">Sign Up with Google</span>
              </button>
            </div>

            <div className="my-8 border-b text-center">
              <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                Or sign up with e-mail
              </div>
            </div>

            <div className="mx-auto max-w-xs">
              {error && (
                <p className="text-red-500 text-sm text-center mb-4">{error}</p>
              )}
              <form onSubmit={(e) => HandleOnSubmit(e)}>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:bg-white transition"
                  type="text"
                  name="name"
                  value={inputs.name}
                  placeholder="Name"
                  required
                  onChange={(e) => handleOnchange(e.target)}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:bg-white transition mt-5"
                  type="email"
                  name="email"
                  value={inputs.email}
                  placeholder="Email"
                  required
                  onChange={(e) => handleOnchange(e.target)}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:bg-white transition mt-5"
                  type="password"
                  name="passcode"
                  value={inputs.passcode}
                  placeholder="Password"
                  required
                  onChange={(e) => handleOnchange(e.target)}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:bg-white transition mt-5"
                  type="password"
                  name="passcodeConfirm"
                  value={inputs.passcodeConfirm}
                  placeholder="Confirm Password"
                  required
                  onChange={(e) => handleOnchange(e.target)}
                />
                <button
                  className="mt-5 tracking-wide font-semibold bg-blue-600 text-white w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-150 active:scale-[0.98] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                  type="submit"
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">Sign Up</span>
                    </>
                  )}
                </button>
              </form>
              <p className="mt-6 text-xs text-gray-600 text-center">
                I agree to abide by upshare{" "}
                <a href="#" className="border-b border-gray-500 border-dotted">
                  Terms of Service
                </a>{" "}
                and its{" "}
                <a href="#" className="border-b border-gray-500 border-dotted">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-blue-50 text-center hidden lg:flex">
        <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
          <img
            src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
            alt="Sign Up template"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
