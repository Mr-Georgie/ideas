import React from "react";
import Step1 from "./OnboardingComp/Step1";

export default function Onboard() {
  return (
    <div className="h-screen mx-16 sm:mx-36 md:mx-10 lg:mx-40 xl:mx-64">
      <div>
        <span className="text-custom-white text-2xl">Step 1</span>
      </div>
      <p class="text-gray-600 text-xs italic">
        First, let's sync your DEV and Hashnode Blogs together
      </p>
      <div className="flex gap-6 mt-4 mb-10">
        <span className="h-3 w-64 bg-custom-indigo rounded"></span>
        <span className="h-3 w-64 bg-custom-indigo rounded"></span>
        <span className="h-3 w-64 bg-custom-indigo rounded"></span>
      </div>
      <div className="mb-16">
        <span className="text-custom-white text-3xl font-bold">
          Please provide your API Token
        </span>
      </div>
      <Step1 />
    </div>
  );
}
