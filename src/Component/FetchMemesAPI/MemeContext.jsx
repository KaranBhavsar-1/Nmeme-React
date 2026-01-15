import { createContext, useContext, useState, useEffect } from "react";
import useGetMeme from "./useGetMemes"; // adjust path

const MemeContext = createContext();

export function MemeProvider({ children }) {
  const [memeType, setMemeType] = useState(
    localStorage.getItem("MemeType") || "CatMemes"
  );

  const [likedMemes, setLikedMemes] = useState(() => {
    return JSON.parse(localStorage.getItem("LikedMemes")) || [];
  });

  const [currentMemeNo, setCurrentMemeNo] = useState(
    Number(localStorage.getItem("currentMemeNo")) || 0
  );

  const memeState = useGetMeme(memeType);

  // sync localStorage
  useEffect(() => {
    localStorage.setItem("MemeType", memeType);
  }, [memeType]);

  useEffect(() => {
    localStorage.setItem("LikedMemes", JSON.stringify(likedMemes));
  }, [likedMemes]);

  useEffect(() => {
    localStorage.setItem("currentMemeNo", currentMemeNo);
  }, [currentMemeNo]);

  const toggleLike = (meme) => {
    setLikedMemes((prev) => {
      const exists = prev.some((m) => m.id === meme.id);
      return exists ? prev.filter((m) => m.id !== meme.id) : [...prev, meme];
    });
  };

  const isLiked = (id) => likedMemes.some((m) => m.id === id);

  // ✅ RETURN MUST BE INSIDE FUNCTION
  return (
    <MemeContext.Provider
      value={{
        ...memeState,
        memeType,
        setMemeType,
        likedMemes,
        toggleLike,
        isLiked,
        currentMemeNo,
        setCurrentMemeNo
      }}
    >
      {children}
    </MemeContext.Provider>
  );
}

// custom hook
export const useMeme = () => useContext(MemeContext);
