import React from "react";
import { useMeme } from "../FetchMemesAPI/MemeContext";

function Button({ text, change }) {
  const { setMemeType, setCurrentMemeNo } = useMeme();

  return (
    <button
      className="ml-2 mt-2 bg-blue-800 rounded px-2 py-2 font-medium arial text-black text-l"
      onClick={() => {
        setMemeType(change.toLowerCase());
        setCurrentMemeNo(0); // ✅ RESET
      }}
    >
      {text}
    </button>
  );
}

export default Button;
