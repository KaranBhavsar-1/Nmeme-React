import React from "react";
import { NavLink } from "react-router-dom";

import homeIcon from "../../assets/images/home.png";
import browseIcon from "../../assets/images/browse.png";
import likeIcon from "../../assets/images/like.png";
import settingIcon from "../../assets/images/setting.png";


export default function BottomNav() {
  const linkClasses = ({ isActive }) =>
    `flex flex-col items-center justify-center flex-1 py-2 text-sm transition-colors
     ${isActive ? "text-white" : "text-black"}
     hover:bg-gray-800`;

  return (
    <nav
      className="
        fixed bottom-0 left-0 w-full z-[9999]
        bg-[#333]
        shadow-[0_-2px_10px_rgba(0,0,0,0.3)]
        backdrop-blur-sm
        pb-[env(safe-area-inset-bottom)]
      "
    >
      <ul className="flex justify-around items-center">
        <li className="flex-1">
          <NavLink to="/" className={linkClasses}>
            <img
              // src="/src/assets/images/home.png"
              // src  = "src/assets/images/home.png"
              src={homeIcon}
              alt="Home"
              className="w-6 h-6 mb-1 sm:w-5 sm:h-5"
            />
            Home
          </NavLink>
        </li>

        <li className="flex-1">
          <NavLink to="/browse" className={linkClasses}>
            <img
              // src="/src/assets/images/browse.png"
              src={browseIcon}
              alt="Browse"
              className="w-6 h-6 mb-1 sm:w-5 sm:h-5"
            />
            Browse
          </NavLink>
        </li>

        <li className="flex-1">
          <NavLink to="/likedmemes" className={linkClasses}>
            <img
              // src="/src/assets/images/like.png"
              src={likeIcon}
              alt="Liked Memes"
              className="w-6 h-6 mb-1 sm:w-5 sm:h-5"
            />
            Liked Memes
          </NavLink>
        </li>

        <li className="flex-1">
          <NavLink to="/settings" className={linkClasses}>
            <img
              // src="/src/assets/images/setting.png"
              src={settingIcon}
              alt="Settings"
              className="w-6 h-6 mb-1 sm:w-5 sm:h-5"
            />
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
