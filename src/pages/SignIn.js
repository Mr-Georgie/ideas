import React, { useContext, useState } from "react";

import google from "../images/google.png";

import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import useInputEvent from "../utils/useInputEvent";

export default function SignIn(props) {
  const { loginUser, continueWithGoogle } = useContext(UserContext); // implement signUpWithGithub

  /**
   * Create seperate instances of the useInputEvent custom hook
   * for each input field e.g email, username and password
   */

  // instance 1
  const {
    inputOnFocus: emailOnFocus,
    onFocusHandler: emailOnFocusHandler,
    ref: emailRef,
    handleClick: emailHandleClick,
  } = useInputEvent();

  // instance 2
  const {
    inputOnFocus: passwordOnFocus,
    onFocusHandler: passwordOnFocusHandler,
    ref: passwordRef,
    handleClick: passwordHandleClick,
  } = useInputEvent();

  // will hold all user form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  // update form user input state on change
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    console.log(formData);
  }

  return (
    <main className="">
      <div className="flex items-center justify-center p-5">
        <h4 className="text-3xl font-black text-white">Sign In</h4>
      </div>
      <section className="flex flex-col items-center justify-center">
        <form
          onSubmit={(event) => loginUser(event, formData)}
          className="space-y-4"
        >
          <div className="">
            {/* ------------ email input field ----------------- */}
            <div
              className={`bg-gray-800 px-2 rounded-md border mb-4 cursor-pointer ${
                emailOnFocus ? "border-custom-indigo" : "border-gray-700"
              }`}
              onClick={emailHandleClick}
            >
              <div className="flex">
                <svg
                  className={`h-4 w-4 m-3 ${
                    emailOnFocus ? "text-custom-indigo" : "text-custom-white"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 
                                    10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>

                <input
                  type="email"
                  ref={emailRef}
                  name="email"
                  onChange={handleChange}
                  onFocus={() => emailOnFocusHandler()}
                  onBlur={() => emailOnFocusHandler()}
                  value={formData.email}
                  className="text-white bg-transparent placeholder-custom-white 
                              focus:outline-none 
                              focus:bg-transparent autofill:bg-transparent"
                  placeholder="email address"
                />
              </div>
            </div>
            {/* --------- email input ends here ------------------ */}
            {/* --------- password input field ------------------- */}
            <div
              className={`bg-gray-800 px-2 rounded-md border mb-4 cursor-pointer ${
                passwordOnFocus ? "border-custom-indigo" : "border-gray-700"
              }`}
              onClick={passwordHandleClick}
            >
              <div className="flex">
                <svg
                  className={`h-4 w-4 m-3 ${
                    passwordOnFocus ? "text-custom-indigo" : "text-custom-white"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>

                <input
                  type="password"
                  ref={passwordRef}
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  onFocus={() => passwordOnFocusHandler()}
                  onBlur={() => passwordOnFocusHandler()}
                  className="text-white bg-transparent focus:outline-none placeholder-custom-white "
                  placeholder="password"
                />
              </div>
            </div>
            {/* --------- password input field ends here ---------- */}
          </div>
          <button
            type="button"
            className="solid-indigo-btn text-white inline-block text-lg font-bold px-16 py-4 leading-none font-mono text-center w-full"
          >
            Login
          </button>
        </form>
      </section>
      <section className="flex flex-col items-center justify-center space-y-4">
        <h2 className="text-gray-400">
          <span> or signup with</span>
        </h2>
        <div>
          <ul className="flex items-center justify-around space-x-5">
            <span className="cursor-pointer" onClick={continueWithGoogle}>
              <li
                className="border shadow-sm p-2 w-10 h-10 rounded flex items-center 
                            justify-center hover:bg-slate-50 focus:bg-slate-50"
              >
                <img src={google} alt="google icon" />
              </li>
            </span>

            {/* Has not been implemented yet 
                        <a href="#">
                            <li className="border border-indigo-800 w-10 h-10 rounded flex items-center 
                            justify-center text-indigo-800 hover:bg-indigo-800 hover:text-white">
                                <img src={linkedIn} alt="linkedin icon" />
                            </li>
                        </a>
                        <a href="#">
                            <li className="border border-indigo-800 w-10 h-10 rounded flex items-center 
                            justify-center text-indigo-800 hover:bg-indigo-800 hover:text-white">
                                <img src={twitter} alt="twitter icon" />
                            </li>
                        </a> */}
          </ul>
        </div>
        <div className="sign_up_link space-x-1">
          <span className="text-sm font-light text-custom-white hover:underline">
            Don't have an account?
          </span>
          <Link
            to="/sign-up"
            className="text-indigo-800 
                            hover:text-indigo-900 text-sm 
                            font-light hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </section>
    </main>
  );
}
