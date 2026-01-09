import React from "react";
import Button from "./Button";
import AddMoreIcon from "../../assets/images/Add_More.png";
import { useMeme } from "../FetchMemesAPI/MemeContext";

function Browse() {
  const { memeType, setMemeType } = useMeme();

  return (
    <div>
      <h1 className="font-bold italic px-2 py-2 text-3xl">
        Browse Categories
      </h1>

      <h1 className="font-bold italic px-2 py-2 text-xl">
        Current Category type:- {memeType}
      </h1>

      <div id="Categories">
        <div className="flex items-center flex-wrap">
          <Button text="Wholesome Memes" change="wholesomememes" setMemeType={setMemeType} />
          <Button text="Cat Memes" change="CatMemes" setMemeType={setMemeType} />
          <Button text="Games Memes" change="gamermemes" setMemeType={setMemeType} />
          <Button text="Tech Memes" change="TechMemes" setMemeType={setMemeType} />
          <Button text="Dank Memes" change="dankmemes" setMemeType={setMemeType} />

          <button className="ml-2 mt-2 bg-blue-800 rounded px-2 py-2 font-medium arial text-black text-xl flex items-center gap-2">
            <img src={AddMoreIcon} alt="Add" width="20" height="20" />
            Add Memes
          </button>
        </div>
      </div>

      <h1 className="font-bold italic px-2 py-2 text-xl">
        Your personal added categories:-
      </h1>
    </div>
  );
}

export default Browse;
