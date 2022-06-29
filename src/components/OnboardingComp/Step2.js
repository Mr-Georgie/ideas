import React, { useState } from "react";
// import { UserContext } from "../../context/UserContext";

export default function Step2(props) {
  // const { user, usersInfo, createNewUserInfo, updateUserInfo } =
  //   useContext(UserContext);

  const info = () => {
    alert("Oops! Still working on this feature");
  };

  // const [currentUserInfo, setCurrentUserInfo] = useState({});

  const [form, setForm] = useState({
    bio: "",
  });

  // update form user input state on change
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prevBio) => ({
      ...prevBio,
      [name]: value,
    }));
  }

  // const updateBio = () => {
  //   console.log(currentUserInfo);
  // };

  return (
    <div className="">
      <form className="flex flex-col">
        <div className="-mx-3 mb-6">
          <div className="w-full px-3">
            <div className=" bg-slate-800 p-8 rounded-md border border-gray-700">
              <div className="mb-3">
                <label
                  className="block uppercase tracking-wide text-custom-grey text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Your Bio
                </label>
                <textarea
                  rows="4"
                  className="block p-2.5 w-full text-sm text-white bg-gray-700 rounded-lg border focus:outline-none
                border-gray-600 placeholder-gray-400 focus:ring-custom-indigo focus:border-custom-indigo"
                  placeholder="Just a paragraph about yourself will do"
                  name="bio"
                  onChange={handleChange}
                  value={form.bio}
                ></textarea>
              </div>
              <span
                onClick={info}
                className="outline-btn inline-block text-sm px-4 py-2 leading-none mt-4 cursor-pointer"
              >
                Update Bio
              </span>
            </div>
          </div>
        </div>
      </form>
      <div className="flex justify-between gap-10 mt-4 pb-20 font-mono">
        {/* <div>
          <button
            type="button"
            onClick={() => props.navHandler("previous")}
            className="solid-white-btn inline-block text-lg font-bold px-16 py-4 leading-none"
          >
            Back
          </button>
        </div> */}
        <div>
          <button
            type="button"
            onClick={() => props.navHandler("next")}
            className="solid-indigo-btn inline-block text-lg font-bold px-16 py-4 leading-none"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
