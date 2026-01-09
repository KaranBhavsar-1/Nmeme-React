import React, { useEffect } from "react";
import MemeCard from "./MemeCard/MemeCard";
import { useMeme } from "../FetchMemesAPI/MemeContext";

function Home() {
  const {
    meme,
    fetchMeme,
    currentMemeNo,
    setCurrentMemeNo
  } = useMeme();

  // Safe next button handler
  const handleNext = async () => {
    if (!meme || !meme.memes) return;

    if (currentMemeNo < meme.memes.length - 1) {
      setCurrentMemeNo(currentMemeNo + 1);
    } else {
      await fetchMeme();
      setCurrentMemeNo(0);
    }
  };

    // Safe Back button handler
 const handleBack = () => {
  if (!meme || !meme.memes) return;

  if (currentMemeNo > 0) {
    // Just go to the previous meme
    setCurrentMemeNo(currentMemeNo - 1);
  } else {
    // Optional: wrap around to last meme
    setCurrentMemeNo(meme.memes.length - 1);
  }
};



  // Reset currentMemeNo if meme array changes
  useEffect(() => {
    if (meme && meme.memes && currentMemeNo >= meme.memes.length) {
      setCurrentMemeNo(0);
    }
  }, [meme, currentMemeNo, setCurrentMemeNo]);

  // Loading state
  if (!meme || !meme.memes || !meme.memes.length) {
    return <div className="text-center mt-20 text-xl">Loading memes...</div>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <MemeCard
        Meme={meme.memes[currentMemeNo]}
        count={meme.count}
        currentMemeNo={currentMemeNo}
      />

      <div className="flex justify-center mt-2">
        <button
          className="bg-blue-600 px-4 py-2 rounded text-white font-semibold hover:bg-blue-700 transition mx-2"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="bg-blue-600 px-4 py-2 rounded text-white font-semibold hover:bg-blue-700 transition"
          onClick={handleNext}
        >
          Next Meme
        </button>
      </div>
    </div>
  );
}

export default Home;
