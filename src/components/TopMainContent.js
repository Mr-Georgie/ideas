import React from "react";
import MembersOnlyNavbar from "./MembersOnlyNavbar";

export default function TopMainContent() {
  return (
    <>
      <span className="md:hidden">
        <MembersOnlyNavbar />
      </span>
      <div className="px-8 py-4">
        <input type="text" className="px-4 py-2" placeholder="Search" />
      </div>
    </>
  );
}
