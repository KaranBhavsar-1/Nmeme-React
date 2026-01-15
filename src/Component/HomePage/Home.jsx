import React, { useEffect } from "react";
import MemeCard from "./MemeCard/MemeCard";
import { useMeme } from "../FetchMemesAPI/MemeContext";

const DEFAULT_MEME = {
  url: "",
  title: "subreddit not found",
  subreddit: "subreddit not found",
  postLink: "subreddit not found",
};

function Home() {
  const {
    meme,
    fetchMeme,
     memeType,        // ✅ ADD THIS
  setMemeType, 
    currentMemeNo,
    setCurrentMemeNo,
  } = useMeme();

  /* ✅ SET DEFAULT CATEGORY ON FIRST LOAD */
  useEffect(() => {
    if (!memetype) {
      setMemeType("catmemes");
      localStorage.setItem("memeType", "catmemes");
    }
  }, [memeType, setMemeType]);

  const memes = meme?.memes || [];
  const hasMemes = memes.length > 0;

  const currentMeme = hasMemes
    ? memes[currentMemeNo]
    : DEFAULT_MEME;

  const count = hasMemes ? meme.count : 0;

  const handleNext = async () => {
    if (!hasMemes) return;

    if (currentMemeNo < memes.length - 1) {
      setCurrentMemeNo(currentMemeNo + 1);
    } else {
      await fetchMeme();
      setCurrentMemeNo(0);
    }
  };

  const handleBack = () => {
    if (!hasMemes) return;

    if (currentMemeNo > 0) {
      setCurrentMemeNo(currentMemeNo - 1);
    } else {
      setCurrentMemeNo(memes.length - 1);
    }
  };

  useEffect(() => {
    if (hasMemes && currentMemeNo >= memes.length) {
      setCurrentMemeNo(0);
    }
  }, [memes, currentMemeNo, hasMemes, setCurrentMemeNo]);

  return (
    <div className="flex flex-col items-center p-4">
      <MemeCard
        Meme={currentMeme}
        count={count}
        currentMemeNo={hasMemes ? currentMemeNo : -1}
        isEmpty={!hasMemes}
      />

      <div className="flex justify-center mt-2">
        <button
          disabled={!hasMemes}
          className={`px-4 py-2 rounded font-semibold mx-2
            ${
              hasMemes
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          onClick={handleBack}
        >
          Back
        </button>

        <button
          disabled={!hasMemes}
          className={`px-4 py-2 rounded font-semibold
            ${
              hasMemes
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          onClick={handleNext}
        >
          Next Meme
        </button>
      </div>
    </div>
  );
}

export default Home;
