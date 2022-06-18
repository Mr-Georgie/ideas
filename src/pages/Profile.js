import React, { useState } from "react";
import useModalToggler from "../utils/useModalToggler";

import background from "../images/bg.jpg";
import person from "../images/person.png";

import ChangeProfilePic from "../components/ChangeProfilePic";
import ChangeBio from "../components/ChangeBio";
import EditOptions from "../components/EditOptions";
import SocialIcons from "../components/SocialIcons";
import ChangeSocialLinks from "../components/ChangeSocialLinks";

export default function Profile() {
  const { showModal: showEditOptions, modalToggler: editOptionsToggler } =
    useModalToggler();

  const {
    showModal: showChangeProfilePicModal,
    modalToggler: changeProfilePicToggler,
  } = useModalToggler();

  const { showModal: showChangeBioModal, modalToggler: changeBioToggler } =
    useModalToggler();

  const {
    showModal: showChangeSocialLinkModal,
    modalToggler: changeSocialLinkToggler,
  } = useModalToggler();

  return (
    <div className="xl:mr-8 static">
      <div className="text-white text-2xl font-extrabold leading-10 py-4">
        Account
      </div>

      <div>
        {/* account card goes here */}
        <div className="w-full lg:max-w-full rounded overflow-hidden bg-gray-800 relative">
          <img
            className="w-full h-40 object-cover"
            src={background}
            alt="Sunset in the mountains"
          />
          <div className="mt-16 relative">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold text-4xl">
                  George Isiguzo
                </span>
                <span
                  className="flex outline-btn 
                            text-xs px-4 py-2 leading-none
                            cursor-pointer"
                  onClick={editOptionsToggler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Edit profile
                </span>
                {showEditOptions && (
                  <EditOptions
                    changeProfilePicToggler={changeProfilePicToggler}
                    changeBioToggler={changeBioToggler}
                    changeSocialLinkToggler={changeSocialLinkToggler}
                  />
                )}
              </div>
              <p className="text-custom-white text-xl font-thin italic">
                Very cool guy with six packs and six foot tall and smart and
                funny and this is weird
              </p>
            </div>
            <div className="font-mono flex gap-3 items-center pb-2 px-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-custom-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-semibold text-custom-white">
                Joined June 29, 2022
              </span>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 mr-2 mb-2">
                Frontend Web Developer
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 mr-2 mb-2">
                ReactJs
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 mr-2 mb-2">
                Python
              </span>
            </div>
            {/* socials goes here */}
            <SocialIcons />
          </div>
          <div className="absolute top-20 left-6 bg-black rounded-full">
            <img className="rounded-full w-32 h-32" src={person} alt="Avatar" />
          </div>
        </div>
      </div>

      {/* ------------ modals goes here --------- */}
      {showChangeProfilePicModal && (
        <div className="fixed h-screen w-screen bg-trans-black bottom-0 left-0 z-10">
          <ChangeProfilePic toggler={changeProfilePicToggler} />
        </div>
      )}

      {showChangeBioModal && (
        <div className="fixed h-screen w-screen bg-trans-black bottom-0 left-0 z-10">
          <ChangeBio toggler={changeBioToggler} />
        </div>
      )}

      {showChangeSocialLinkModal && (
        <div className="fixed h-screen w-screen bg-trans-black bottom-0 left-0 z-10">
          <ChangeSocialLinks toggler={changeSocialLinkToggler} />
        </div>
      )}
    </div>
  );
}
