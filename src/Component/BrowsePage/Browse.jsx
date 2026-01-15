import React, { useEffect, useState } from "react";
import Button from "./Button";
import AddMoreIcon from "../../assets/images/Add_More.png";
import { useMeme } from "../FetchMemesAPI/MemeContext";
import AddMemeCategory from "./AddMemeCategory";

function Browse() {
  // const { memeType, setMemeType } = useMeme();
  const { memeType, setMemeType, setCurrentMemeNo } = useMeme();

  const [showPopup, setShowPopup] = useState(false);
  const [popupMode, setPopupMode] = useState("tags"); // "tags" | "category"
  const [customCats, setCustomCats] = useState([]);

  /* Load saved categories */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("customCategories")) || [];
    setCustomCats(saved);
  }, []);

  /* Add tags to current memeType */
  // const addCategory = (cat) => {
  //   if (!cat.subreddits) return;

  //   const existing = memeType?.replace("/", "") || "";

  //   const merged = [
  //     ...new Set(
  //       [...existing.split("+"), ...cat.subreddits.split("+")].filter(Boolean)
  //     ),
  //   ].join("+");

  //   setMemeType(`/${merged}`);
  //   localStorage.setItem("memeType", `/${merged}`);
  //   setShowPopup(false);
  // };

  const addCategory = (cat) => {
  if (!cat.subreddits) return;

  const existing = memeType?.replace("/", "") || "";

  const merged = [
    ...new Set(
      [...existing.split("+"), ...cat.subreddits.split("+")].filter(Boolean)
    ),
  ].join("+");

  setMemeType(`/${merged}`);
  localStorage.setItem("memeType", `/${merged}`);

  setCurrentMemeNo(0); // ✅ RESET
  setShowPopup(false);
};


  // const selectCustom = (cat) => {
  //   setMemeType(cat.subreddits);
  //   localStorage.setItem("memeType", cat.subreddits);
  // };

  const selectCustom = (cat) => {
  setMemeType(cat.subreddits);
  localStorage.setItem("memeType", cat.subreddits);

  setCurrentMemeNo(0); // ✅ RESET
};



  return (
    <div>
      <h1 className="font-bold italic px-2 py-2 text-3xl">
        Browse Categories
      </h1>

      {/* CURRENT CATEGORY DISPLAY */}
      <div className="px-2 text-lg flex flex-wrap gap-2 items-center">
        <span>Current Category type:-</span>

        {(() => {
          const tags =
            memeType?.replace("/", "").split("+").filter(Boolean) || [];

          const isOnlyOne = tags.length === 1;

          return tags.map((cat, i) => (
            <span
              key={i}
              className="bg-blue-700 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 select-none"
            >
              {cat}

              {/* ❌ remove only if more than 1 tag */}
              {!isOnlyOne && (
                <button
                  onClick={() => {
                    if (isOnlyOne) return;

                    const updated = tags
                      .filter((c) => c !== cat)
                      .join("+");

                    setMemeType(`/${updated}`);
                    localStorage.setItem("memeType", `/${updated}`);
                  }}
                  className="text-red-300 hover:text-red-500 font-bold cursor-pointer"
                >
                  ×
                </button>
              )}
            </span>
          ));
        })()}

        {/* ➕ add new tag */}
        <button
          onClick={() => {
            setPopupMode("tags");
            setShowPopup(true);
          }}
          className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 hover:bg-gray-600"
        >
          + Add tag
        </button>
      </div>

      {/* PRESET CATEGORY BUTTONS */}
      <div className="flex flex-wrap mt-2">
        <Button
          text="Wholesome Memes"
          change="wholesomememes"
          setMemeType={setMemeType}
        />
        <Button
          text="Cat Memes"
          change="catmemes"
          setMemeType={setMemeType}
        />
        <Button
          text="Games Memes"
          change="gamermemes"
          setMemeType={setMemeType}
        />
        <Button
          text="Tech Memes"
          change="techmemes"
          setMemeType={setMemeType}
        />
        <Button
          text="Dank Memes"
          change="dankmemes"
          setMemeType={setMemeType}
        />

        {/* ➕ Add custom category */}
        <button
          onClick={() => {
            setPopupMode("category");
            setShowPopup(true);
          }}
          className="ml-2 mt-2 text-black font-medium arial bg-blue-800 rounded px-3 py-2 flex gap-2"
        >
          <img src={AddMoreIcon} width="20" />
          Add Memes
        </button>
      </div>

      {/* SAVED CATEGORIES */}
      <h2 className="mt-6 px-2 font-bold">
        Your personal added categories:-
      </h2>

      <div className="flex flex-wrap mt-2">
        {customCats.map((cat, i) => (
          <button
            key={i}
            onClick={() => selectCustom(cat)}
            className="ml-2 mt-2 bg-blue-700 rounded px-3 py-2"
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* POPUP */}
      {showPopup && (
        <AddMemeCategory
          mode={popupMode}
          onClose={() => setShowPopup(false)}
          onAdd={addCategory}
        />
      )}
    </div>
  );
}

export default Browse;
