import { useRef, useState } from "react";
import React from "react";
import { validateFields } from "../utils/Form-Validate";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(false);
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const name = useRef<HTMLInputElement | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>("");
  const handleSignupForm = () => {
    setErrorMsg("");
    setIsSignInForm(!isSignInForm);
  };

  const handleFormSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email.current && password.current) {
      const message = validateFields(
        email?.current?.value,
        password?.current?.value,
        isSignInForm ? name.current : null,
      );
      setErrorMsg(message);
    }
  };

  return (
    <div className="absolute w-full">
      <img
        className="py-12 px-4 w-44"
        src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAVBEN9I57czDc_uW4ZnDTNTb9hWvK70hYAqf0VNv_dsufIxZqfNclKrp7ugn5j0DkKCYy_4ncEpi6fJk1wpPuLO61r5YUWiEbVjxFpCESIWdJwAAOvAX.svg"
        alt="Netflix Logo"
      />

      <div className="flex justify-center">
        <div className="w-full max-w-md bg-black/80 border border-gray-800 rounded-lg p-8 shadow-2xl">
          <h1 className="text-4xl font-bold text-red-600 text-center mb-8">
            {isSignInForm ? "Sign Up" : "Sign In"}
          </h1>

          <form className="space-y-5" onSubmit={(e) => handleFormSubmit(e)}>
            {isSignInForm && (
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Full Name
                </label>
                <input
                  ref={name}
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-md bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            )}

            <div>
              <label className="block text-gray-300 text-sm mb-2">
                Email Address
              </label>
              <input
                ref={email}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-md bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-2">
                Password
              </label>
              <input
                ref={password}
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-md bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <p className="text-red-500 text-sm font-semibold">{errorMsg}</p>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 transition duration-300 text-white font-semibold py-3 rounded-md"
            >
              {isSignInForm ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6 text-sm">
            {isSignInForm
              ? "Already have an account? "
              : "New to Netflix GPT? "}

            <span
              className="text-white cursor-pointer hover:underline"
              onClick={handleSignupForm}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
