import React from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const { pathname } = useLocation();

  return (
    <div
      className={`${pathname === "/sign-in" && "fixed bottom-0 w-full"} mt-4 `}
    >
      {/* Attribute two */}
      <div className="py-10 font-mono">
        <div className="flex justify-center text-custom-grey">
          © Designed & Built by Georgie
        </div>
      </div>

      {/* Attribute one */}
      <div className="py-10 font-mono bg-custom-indigo">
        <div className="flex justify-center text-center font-bold">
          Powered by Linode X Hashnode Hackathon
        </div>
      </div>
    </div>
  );
}
