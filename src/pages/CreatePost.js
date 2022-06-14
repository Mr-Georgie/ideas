import React from "react";

import Editor from "../components/Editor";

export default function CreatePost() {
  return (
    <div className="xl:mr-8">
      <div className="flex items-start justify-between">
        <div className="text-white text-2xl font-extrabold leading-10 pb-6 w-7/12">
          Title goes here...
        </div>

        <div className="flex gap-3 w-5/12">
          <button className="outline-btn inline-block text-sm px-4 py-2 leading-none">
            Add title
          </button>
          <button className="outline-btn inline-block text-sm px-4 py-2 leading-none">
            Add cover image
          </button>
        </div>
      </div>

      <div>
        {/* account card goes here */}
        <div className="w-full lg:max-w-full rounded overflow-hidden bg-white">
          <Editor />
        </div>
      </div>
    </div>
  );
}
