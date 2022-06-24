import React, { useContext, useEffect } from "react";
import Step1 from "../components/OnboardingComp/Step1";
import Step2 from "../components/OnboardingComp/Step2";
import Step3 from "../components/OnboardingComp/Step3";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Onboard() {
  const { user, usersInfo } = useContext(UserContext);
  const navigate = useNavigate();

  // check if user has a completed account info
  // const getUserInfo = () => {
  //   console.log(usersInfo);
  //   if (usersInfo.documents !== undefined) {
  //     return usersInfo.documents.find((info) => info.email === user.email);
  //   } else {
  //     console.log("still fetching user info ...");
  //   }
  // };

  useEffect(() => {
    // if (getUserInfo() !== undefined) {
    //   navigate("/home");
    // }
    // getUserInfo();
    console.log(usersInfo);
  }, [usersInfo]);

  //
  const navigation = ["Step 1", "Step 2", "Step 3"];

  // to add control to navigation
  const [navIndex, setNavIndex] = React.useState(0);

  //
  const navHandler = (direction) => {
    if (direction === "next") {
      setNavIndex((currentIndex) => currentIndex + 1);
    }
    if (direction === "previous") {
      setNavIndex((currentIndex) => currentIndex - 1);
    }
  };

  return (
    <div className="mx-6 sm:mx-36 md:mx-10 lg:mx-40 xl:mx-64">
      <div>
        <span className="text-custom-white text-2xl">
          {navigation[navIndex]}
        </span>
      </div>
      <p className="text-gray-500 text-sm italic">
        {/* Conditionally render the content for Step 1, 2, & 3 */}
        {navigation[navIndex] === "Step 1" && "Setting up your profile..."}

        {navigation[navIndex] === "Step 2" &&
          "Almost done. Please add a little description about you"}

        {navigation[navIndex] === "Step 3" &&
          "You're all set! Create your first post now or go see what others have posted"}
      </p>
      <div className="flex gap-4 md:gap-10 mt-4 mb-10">
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
          {navigation[navIndex] === "Step 1" &&
            "Hi, please add a display picture"}
          {navigation[navIndex] === "Step 2" &&
            "Almost done. Please add a little description about you"}
          {navigation[navIndex] === "Step 3" && "👇👇👇"}
        </span>
      </div>

      {navigation[navIndex] === "Step 1" && <Step1 navHandler={navHandler} />}
      {navigation[navIndex] === "Step 2" && <Step2 navHandler={navHandler} />}
      {navigation[navIndex] === "Step 3" && <Step3 navHandler={navHandler} />}
    </div>
  );
}
