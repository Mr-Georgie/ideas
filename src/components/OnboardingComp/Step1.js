import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { ImageContext } from "../../context/ImageContext";

export default function Step1(props) {
  const { image, uploadImage, removeUploadedImage } = useContext(ImageContext);

  // will hold the image file just before upload
  const [formImage, setFormImage] = useState();

  // ensure image is only previewed on successful upload
  const [showImagePreview, setShowImagePreview] = useState(false);

  // will handle the create of a user info document
  const { user, createNewUserInfo } = useContext(UserContext);

  const isImageUploaded = async () => {
    if (formImage === undefined) {
      alert("Please add image first");
    } else {
      await uploadImage(formImage);
      setShowImagePreview(true);
    }
  };

  const saveImageToUserInfo = () => {
    setTimeout(() => {
      if (image["$id"] !== undefined) {
        createNewUserInfo({
          imageId: image["$id"],
          email: user.email,
        });
        alert("profile picture upload successful");
      } else {
        console.log("image has not been uploaded to the database yet...");
      }
    }, 5000);
  };

  const isImageRemoved = () => {
    removeUploadedImage();
    setShowImagePreview(false);
  };

  return (
    <div className="">
      <form className="flex justify-center">
        <div className="flex flex-col md:flex-row items-center space-x-6 mt-4 mb-8">
          <div className="shrink-0 mb-3 md:mb-0">
            {showImagePreview ? (
              <img
                className="h-32 w-32 object-cover rounded-full"
                src={`https://linode.georgeisiguzo.xyz/v1/storage/buckets/62b1eccbb93aa0ff7f94/files/${image["$id"]}/view?project=62ad8f1b61a1aa4ac561&mode=admin`}
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
      </form>
      <div className="flex justify-between gap-10 mt-4 pb-20 font-mono">
        <div>
          {showImagePreview ? (
            <button
              type="button"
              onClick={() => [saveImageToUserInfo(), props.navHandler("next")]}
              className="solid-indigo-btn inline-block text-lg font-bold px-16 py-4 leading-none"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={() => props.navHandler("next")}
              className="solid-indigo-btn inline-block text-lg font-bold px-16 py-4 leading-none"
            >
              Skip
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
