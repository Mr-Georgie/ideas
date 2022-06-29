import React, { useContext } from "react";

import google from "../images/google.png";
import github from "../images/github.png";

import { UserContext } from "../context/UserContext";

export default function SignIn(props) {
  const { continueWithGoogle } = useContext(UserContext);

  const info = () => {
    alert("Oops! Still working on this feature");
  };

  return (
    <main className="">
      <div className="flex items-center justify-center p-5">
        <h4 className="text-3xl font-black text-white">Sign In</h4>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-around space-y-4 font-mono">
          <div className="cursor-pointer" onClick={continueWithGoogle}>
            <div
              className="flex items-center justify-center shadow-sm p-4 
                            rounded border hover:bg-slate-50 focus:bg-slate-50
                            text-white hover:text-black"
            >
              <img src={google} alt="google icon" className="w-8 h-8" />
              <span className="ml-4">Continue with google</span>
            </div>
          </div>

          <div className="cursor-pointer" onClick={info}>
            <div
              className="flex items-center justify-center shadow-sm p-4 
                            rounded border hover:bg-slate-50 focus:bg-slate-50
                            text-white hover:text-black"
            >
              <img src={github} alt="google icon" className="w-8 h-8" />
              <span className="ml-4">Continue with github</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
