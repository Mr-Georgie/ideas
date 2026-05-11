import React, { useState, useRef } from "react";
import background from "../images/card-img1.png";
import person from "../images/person.png";

import useToggler from "../utils/useToggler";
import { Link } from "react-router-dom";

// Note: I added 'post' as a prop so we can use real database data
export default function PostCard({ post }) {
  const { on: isBookmarked, toggler: isBookmarkedToggler } = useToggler();
  
  // Audio State logic
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(post?.audio_url ? new Audio(post.audio_url) : null);

  const handlePlay = (e) => {
    e.preventDefault(); // Prevents the Link from triggering when clicking play
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      audioRef.current.onended = () => setIsPlaying(false);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full lg:max-w-full lg:flex py-4">
      <div
        className="rounded p-4 flex flex-col justify-between 
                    leading-normal bg-slate-800 
                    hover:drop-shadow-2xl focus:drop-shadow-2xl border-2 border-transparent hover:border-pink-500 transition-all"
      >
        <div className="mb-8">
          {/* post author name and date */}
          <Link to="/home">
            <div className="flex items-center pb-8">
              <img
                className="w-10 h-10 rounded-full mr-4 cursor-pointer hover:opacity-70 border-2 border-gray-600"
                src={post?.author_avatar || person}
                alt="Avatar"
              />
              <div className="text-sm text-white cursor-pointer hover:underline">
                <p className="leading-none font-bold">{post?.author_name || "Jonathan Reinink"}</p>
                <p className="text-gray-500">{post?.posted_at || "Aug 18"}</p>
              </div>
            </div>
          </Link>

          {/* post body and image */}
          <Link to={`/post/${post?.id || ""}`}>
            <div className="flex gap-3 flex-col lg:flex-row cursor-pointer">
              <div className="flex flex-col w-full lg:w-3/4">
                <div className="text-white font-bold text-xl mb-2 flex items-center gap-3">
                  {post?.title || "Building a web app that tracks job requirements?"}
                  
                  {/* --- RAMBLE PLAY BUTTON --- */}
                  {post?.audio_url && (
                    <button 
                      onClick={handlePlay}
                      className={`flex items-center justify-center w-8 h-8 rounded-full border-2 border-white transition-colors ${isPlaying ? 'bg-lime-500' : 'bg-pink-500'}`}
                      title="Listen to Ramble"
                    >
                      {isPlaying ? (
                        <div className="w-2.5 h-2.5 bg-slate-900" /> // Stop Icon
                      ) : (
                        <svg className="w-4 h-4 fill-slate-900 ml-0.5" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg> // Play Icon
                      )}
                    </button>
                  )}
                </div>
                
                <p className="text-custom-white text-base font-mono line-clamp-3">
                  {post?.body || "Lorem ipsum dolor sit amet, consectetur adipisicing elit..."}
                </p>
              </div>
              <div className="w-full lg:w-1/4">
                <img
                  src={post?.image_url || background}
                  alt="cover screenshot"
                  className="w-full h-full object-cover rounded border border-gray-700"
                />
              </div>
            </div>
          </Link>
        </div>

        {/* card footer */}
        <div className="flex justify-between">
          <span className="flex">
            <button
              className="flex justify-center 
                            items-center bg-gray-200 rounded-full 
                            px-3 py-1 text-sm font-semibold text-gray-500 
                            mr-2 mb-2 hover:text-custom-dark-blue cursor-pointer"
            >
              {post?.likes_count || 43}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </button>
            <button
              className="flex justify-center 
                            items-center bg-gray-200 rounded-full 
                            px-3 py-1 text-sm font-semibold text-gray-500 
                            mr-2 mb-2 hover:text-custom-dark-blue cursor-pointer"
            >
              {post?.comments_count || 20}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </button>
          </span>

          <button onClick={() => isBookmarkedToggler()} className="tap">
            {isBookmarked ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white cursor-pointer hover:text-custom-indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}import React, { useState, useRef } from "react";
import background from "../images/card-img1.png";
import person from "../images/person.png";

import useToggler from "../utils/useToggler";
import { Link } from "react-router-dom";

// Note: I added 'post' as a prop so we can use real database data
export default function PostCard({ post }) {
  const { on: isBookmarked, toggler: isBookmarkedToggler } = useToggler();
  
  // Audio State logic
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(post?.audio_url ? new Audio(post.audio_url) : null);

  const handlePlay = (e) => {
    e.preventDefault(); // Prevents the Link from triggering when clicking play
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      audioRef.current.onended = () => setIsPlaying(false);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full lg:max-w-full lg:flex py-4">
      <div
        className="rounded p-4 flex flex-col justify-between 
                    leading-normal bg-slate-800 
                    hover:drop-shadow-2xl focus:drop-shadow-2xl border-2 border-transparent hover:border-pink-500 transition-all"
      >
        <div className="mb-8">
          {/* post author name and date */}
          <Link to="/home">
            <div className="flex items-center pb-8">
              <img
                className="w-10 h-10 rounded-full mr-4 cursor-pointer hover:opacity-70 border-2 border-gray-600"
                src={post?.author_avatar || person}
                alt="Avatar"
              />
              <div className="text-sm text-white cursor-pointer hover:underline">
                <p className="leading-none font-bold">{post?.author_name || "Jonathan Reinink"}</p>
                <p className="text-gray-500">{post?.posted_at || "Aug 18"}</p>
              </div>
            </div>
          </Link>

          {/* post body and image */}
          <Link to={`/post/${post?.id || ""}`}>
            <div className="flex gap-3 flex-col lg:flex-row cursor-pointer">
              <div className="flex flex-col w-full lg:w-3/4">
                <div className="text-white font-bold text-xl mb-2 flex items-center gap-3">
                  {post?.title || "Building a web app that tracks job requirements?"}
                  
                  {/* --- RAMBLE PLAY BUTTON --- */}
                  {post?.audio_url && (
                    <button 
                      onClick={handlePlay}
                      className={`flex items-center justify-center w-8 h-8 rounded-full border-2 border-white transition-colors ${isPlaying ? 'bg-lime-500' : 'bg-pink-500'}`}
                      title="Listen to Ramble"
                    >
                      {isPlaying ? (
                        <div className="w-2.5 h-2.5 bg-slate-900" /> // Stop Icon
                      ) : (
                        <svg className="w-4 h-4 fill-slate-900 ml-0.5" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg> // Play Icon
                      )}
                    </button>
                  )}
                </div>
                
                <p className="text-custom-white text-base font-mono line-clamp-3">
                  {post?.body || "Lorem ipsum dolor sit amet, consectetur adipisicing elit..."}
                </p>
              </div>
              <div className="w-full lg:w-1/4">
                <img
                  src={post?.image_url || background}
                  alt="cover screenshot"
                  className="w-full h-full object-cover rounded border border-gray-700"
                />
              </div>
            </div>
          </Link>
        </div>

        {/* card footer */}
        <div className="flex justify-between">
          <span className="flex">
            <button
              className="flex justify-center 
                            items-center bg-gray-200 rounded-full 
                            px-3 py-1 text-sm font-semibold text-gray-500 
                            mr-2 mb-2 hover:text-custom-dark-blue cursor-pointer"
            >
              {post?.likes_count || 43}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </button>
            <button
              className="flex justify-center 
                            items-center bg-gray-200 rounded-full 
                            px-3 py-1 text-sm font-semibold text-gray-500 
                            mr-2 mb-2 hover:text-custom-dark-blue cursor-pointer"
            >
              {post?.comments_count || 20}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </button>
          </span>

          <button onClick={() => isBookmarkedToggler()} className="tap">
            {isBookmarked ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white cursor-pointer hover:text-custom-indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}