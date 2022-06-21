import React, { useContext, useEffect } from "react";
import Step1 from "../components/OnboardingComp/Step1";
import Step2 from "../components/OnboardingComp/Step2";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Onboard() {
  const { user, userInfo } = useContext(UserContext);

  const navigate = useNavigate();

  // check if user has a completed account info
  const getUserInfo = () => {
    console.log(userInfo);
    if (userInfo.documents !== undefined) {
      return userInfo.documents.find((info) => info.email === user.email);
    } else {
      console.log("still loading...");
    }
  };

  useEffect(() => {
    // if (getUserInfo() !== undefined) {
    //   navigate("/home");
    // }
    getUserInfo();
  }, [userInfo]);

  //
  const navigation = ["Step 1", "Step 2"];

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
    <div className="mx-6 sm:mx-36 md:mx-10 lg:mx-40 xl:mx-64">
      {/* <div>
        <span className="text-custom-white text-2xl">
          {navigation[navIndex]}
        </span>
      </div> */}
      <p className="text-gray-600 text-2xl italic">
        {/* Conditionally render the content for Step 1, 2, & 3 */}
        {navigation[navIndex] === "Step 1" &&
          "Hi, Please tell us a little about yourself"}

        {navigation[navIndex] === "Step 2" &&
          "You're all set. Create your first post now or Go see what others have posted!"}
      </p>
      <div className="flex gap-4 md:gap-10 mt-4 mb-10">
        {/*  */}
        <span className="h-1 rounded w-1/4 bg-custom-indigo"></span>
      </div>
      <div className="mb-6">
        <span className="text-custom-white text-3xl font-bold">
          {navigation[navIndex] === "Step 1" && "Complete your profile"}
          {navigation[navIndex] === "Step 2" && "👇👇👇"}
        </span>
      </div>

      {navigation[navIndex] === "Step 1" && (
        <Step1 getUserInfo={getUserInfo} user={user} />
      )}
      {navigation[navIndex] === "Step 2" && <Step2 />}

      <div className="flex justify-between gap-10 mt-4 pb-20 font-mono">
        {navigation[navIndex] === "Step 2" && (
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

        {navigation[navIndex] === "Step 1" && (
          <div>
            <button
              type="button"
              onClick={() => navHandler("next", navIndex)}
              className="solid-indigo-btn inline-block text-lg font-bold px-16 py-4 leading-none"
            >
              Skip
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
