import React from "react";

export default function Footer() {
  return (
    <div className="mt-4">
      {/* Attribute two */}
      <div className="py-10 font-mono">
        <div className="flex justify-center text-custom-grey">
          © Designed & Built by Georgie
        </div>
      </div>

      {/* Attribute one */}
      <div className="py-10 font-mono bg-custom-indigo">
        <div className="flex justify-center text-center">
          Powered by Linode X Hashnode Hackathon
        </div>
      </div>
    </div>
  );
}
