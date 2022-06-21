import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { ImageContext } from "../../context/ImageContext";

export default function Step1(props) {
  const { image, uploadImage, getImagePreview, removeUploadedImage } =
    useContext(ImageContext);
  const [formImage, setFormImage] = useState();
  const [showImagePreview, setShowImagePreview] = useState(false);
  const { createNewUserInfo, updateUserInfo } = useContext(UserContext);

  const isImageUploaded = async () => {
    if (formImage === undefined) {
      alert("Please add image first");
    } else {
      await uploadImage(formImage);
      setShowImagePreview(true);
    }
  };

  const [formData, setFormData] = useState({
    about: "",
  });

  // update form user input state on change
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const saveImageToUserInfo = () => {
    console.log("updating user profile");
    setTimeout(() => {
      if (image["$id"] !== undefined) {
        // if user info doesn't exist
        if (props.getUserInfo() === undefined) {
          createNewUserInfo({
            displayPicId: image["$id"],
            email: props.user.email,
            about: formData.about,
          });
        } else {
          console.log(props.getUserInfo());
          updateUserInfo(
            {
              displayPicId: image["$id"],
              email: props.user.email,
              about: formData.about,
            },
            props.getUserInfo()["$id"]
          );
        }
      } else {
        console.log("could not add image");
        if (formData.about !== "") {
          if (props.getUserInfo() === undefined) {
            createNewUserInfo({
              email: props.user.email,
              about: formData.about,
            });
          } else {
            console.log(props.getUserInfo());
            updateUserInfo(
              {
                email: props.user.email,
                about: formData.about,
              },
              props.getUserInfo()["$id"]
            );
          }
          console.log("updated about info");
        }
      }
    }, 5000);
  };

  useEffect(() => {
    saveImageToUserInfo();
  }, [image]);

  const isImageRemoved = () => {
    removeUploadedImage();
    setShowImagePreview(false);
  };

  return (
    <div className="">
      <form className="flex flex-col">
        <label
          className="block uppercase tracking-wide text-custom-grey text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          Choose profile photo
        </label>
        <div className="flex flex-col md:flex-row items-center space-x-6 mt-4 mb-8">
          <div className="shrink-0 mb-3 md:mb-0">
            {showImagePreview ? (
              <img
                className="h-32 w-32 object-cover rounded-full"
                src={getImagePreview()}
                alt="add avatar"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-32 w-32 bg-gray-800 rounded-full"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input
              type="file"
              className="block w-full text-sm text-slate-500 font-mono
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
              onChange={(event) => {
                setFormImage(event.target.files[0]);
              }}
            />
          </label>
          <div className="block">
            {showImagePreview ? (
              <span
                onClick={() => isImageRemoved()}
                className="outline-btn inline-block text-sm px-4 py-2 leading-none cursor-pointer"
              >
                Remove Image
              </span>
            ) : (
              <span
                onClick={() => isImageUploaded()}
                className="outline-btn inline-block text-sm px-4 py-2 leading-none cursor-pointer"
              >
                Upload Image
              </span>
            )}
          </div>
        </div>
        {/*  */}
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
                  name="about"
                  onChange={handleChange}
                  value={formData.about}
                ></textarea>
              </div>
              <span
                onClick={saveImageToUserInfo}
                className="outline-btn inline-block text-sm px-4 py-2 leading-none mt-4 cursor-pointer"
              >
                Update Bio
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
