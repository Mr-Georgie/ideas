import React from "react";
import MembersOnlyNavbar from "./MembersOnlyNavbar";

export default function TopMainContent() {
  return (
    <>
      <span className="md:hidden">
        <MembersOnlyNavbar />
      </span>
    </>
  );
}
