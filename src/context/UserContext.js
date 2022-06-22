import React, { useState } from "react";

import { sdk, userInfoId } from "../config";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserContext = React.createContext();

function UserContextProvider(props) {
  // will hold user data from fetching from api
  const [user, setUser] = useState({});

  const [usersInfo, setUsersInfo] = useState({});

  // for redirecting users
  const navigate = useNavigate();

  // For production
  const continueWithGoogle = () => {
    sdk.account.createOAuth2Session(
      "google",
      "http://localhost:3000/onboard",
      "http://localhost:3000"
    );
  };

  const continueWithGithub = () => {
    sdk.account.createOAuth2Session(
      "github",
      "http://localhost:3000/onboard",
      "http://localhost:3000"
    );
  };

  // function to get user data
  const fetchUserDetails = async () => {
    try {
      const data = await sdk.account.get();
      setUser(data);
    } catch (error) {
      navigate("/");
      toast.error("Oops! Please login to continue...");
    }
  };

  // function to get user data
  const fetchUserInfo = async () => {
    try {
      const data = await sdk.database.listDocuments(userInfoId);
      setUsersInfo(data);
      return data;
      // console.log("spaces: ", data.documents)
    } catch (error) {
      toast.error("Oops! An error occured while fetching user info");
      console.log(error);
    }
  };

  const createNewUserInfo = async (info) => {
    console.log("about to create user info");
    console.log("form data: ", info);

    try {
      const data = await sdk.database.createDocument(
        userInfoId, // collectionID
        "unique()", // auto generate ID for each space
        info
      );
      setUsersInfo(data);

      console.log("New user info created successfully");
    } catch (error) {
      console.log("Oops! An error creating new info");
      console.log(error);
    }
  };

  const updateUserInfo = async (data, documentId) => {
    console.log("about to update space");
    console.log("form data: ", data);

    try {
      await sdk.database.updateDocument(
        userInfoId, // collectionID
        documentId, // auto generate ID for each space
        data
      );

      console.log("Updated successfully");
    } catch (error) {
      console.log("Oops! An error updating this space");
      console.log(error);
    }
  };

  const logOut = async () => {
    console.log("login out...");

    // checked if there is a logged in user
    if (Object.keys(user).length !== 0) {
      await sdk.account.deleteSession("current");
    } else {
      toast.warning("No user session was detected");
    }

    navigate("/");
  };

  // pass user and fetchuser method to any child component of UserContext
  return (
    <>
      <UserContext.Provider
        value={{
          user,
          usersInfo,
          continueWithGithub,
          continueWithGoogle,
          fetchUserDetails,
          fetchUserInfo,
          logOut,
          toast,
          createNewUserInfo,
          updateUserInfo,
        }}
      >
        {props.children}
      </UserContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export { UserContextProvider, UserContext };
