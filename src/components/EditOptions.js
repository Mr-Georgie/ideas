import React from "react";

export default function EditOptions(props) {
  return (
    <div className="py-3 drop-shadow-lg hover:hover:drop-shadow-2xl rounded-md bg-slate-200 absolute right-0 top-14">
      <div className="flex flex-col font-mono">
        <span
          onClick={() => props.changeProfilePicToggler()}
          className="py-2 px-6 cursor-pointer hover:bg-custom-grey 
                                  hover:font-semibold"
        >
          Change profile pic
        </span>
        <span
          onClick={() => props.changeBioToggler()}
          className="py-2 px-6 cursor-pointer hover:bg-custom-grey hover:font-semibold"
        >
          Change bio
        </span>
        <span
          onClick={() => props.changeSocialLinkToggler()}
          className="py-2 px-6 cursor-pointer hover:bg-custom-grey hover:font-semibold"
        >
          Edit social links
        </span>
        <span className="py-2 px-6 cursor-pointer hover:bg-custom-grey hover:font-semibold">
          Add/Remove tags
        </span>
      </div>
    </div>
  );
}
