import React from "react";

export default function Step1() {
  return (
    <div className="flex flex-col gap-4 items-center font-mono">
      <div className="mx-3">
        <span className="outline-btn inline-block text-base px-16 py-6 leading-none">
          Continue with Google
        </span>
      </div>
      <div className="mx-3">
        <span className="outline-btn inline-block text-base px-16 py-6 leading-none">
          Continue with Github
        </span>
      </div>
    </div>
  );
}
