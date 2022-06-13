import React from "react";
import Step1 from "../components/OnboardingComp/Step1";
import Step2 from "../components/OnboardingComp/Step2";
import Step3 from "../components/OnboardingComp/Step3";

export default function Onboard() {
  //
  const navigation = ["Step 1", "Step 2", "Step 3"];

  //
  const [navIndex, setNavIndex] = React.useState(0);

  //
  const navHandler = (direction, index) => {
    if (direction === "next") {
      setNavIndex((currentIndex) => currentIndex + 1);
    }
    if (direction === "previous") {
      setNavIndex((currentIndex) => currentIndex - 1);
    }
  };

  return (
    <div className="mx-16 sm:mx-36 md:mx-10 lg:mx-40 xl:mx-64">
      <div>
        <span className="text-custom-white text-2xl">
          {navigation[navIndex]}
        </span>
      </div>
      <p className="text-gray-600 text-xs italic">
        {/* Conditionally render the content for Step 1, 2, & 3 */}
        {navigation[navIndex] === "Step 1" &&
          "First, let's create an account for you"}

        {navigation[navIndex] === "Step 2" && "Tell us a little about yourself"}

        {navigation[navIndex] === "Step 3" &&
          "You're all set. Create your first post now or Go see what others have posted"}
      </p>
      <div className="flex gap-10 mt-4 mb-10">
        {/*  */}
        <span
          className={`h-3 rounded ${
            navigation[navIndex] === "Step 1"
              ? " w-1/2 bg-custom-indigo"
              : "w-1/4 bg-[#dcdbf571]"
          }`}
        ></span>
        {/*  */}
        <span
          className={`h-3 rounded ${
            navigation[navIndex] === "Step 2"
              ? "w-1/2 bg-custom-indigo"
              : "w-1/4 bg-[#dcdbf571]"
          }`}
        ></span>
        {/*  */}
        <span
          className={`h-3 rounded ${
            navigation[navIndex] === "Step 3"
              ? "w-1/2 bg-custom-indigo"
              : "w-1/4 bg-[#dcdbf571]"
          }`}
        ></span>
      </div>
      <div className="mb-6">
        <span className="text-custom-white text-3xl font-bold">
          {navigation[navIndex] === "Step 1" && "Create an account"}
          {navigation[navIndex] === "Step 2" && "Complete your profile"}
          {navigation[navIndex] === "Step 3" && "You're all set!"}
        </span>
      </div>

      {navigation[navIndex] === "Step 1" && <Step1 />}
      {navigation[navIndex] === "Step 2" && <Step2 />}
      {navigation[navIndex] === "Step 3" && <Step3 />}

      <div className="flex justify-between gap-10 mt-4 pb-20 font-mono">
        {navigation[navIndex] !== "Step 1" &&
          navigation[navIndex] !== "Step 2" && (
            <div>
              <button
                type="button"
                onClick={() => navHandler("previous", navIndex)}
                className="solid-white-btn inline-block text-lg font-bold px-16 py-4 leading-none"
              >
                Back
              </button>
            </div>
          )}

        {navigation[navIndex] !== "Step 3" && (
          <div>
            <button
              type="button"
              onClick={() => navHandler("next", navIndex)}
              className="solid-indigo-btn inline-block text-lg font-bold px-16 py-4 leading-none"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
