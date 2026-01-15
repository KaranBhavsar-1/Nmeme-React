import { useEffect, useRef, useState } from "react";

export default function useGetMeme(memetype) {
  const [meme, setMeme] = useState(null);
  const [error, setError] = useState(null);
  const fetching = useRef(false);

  const fetchMeme = async () => {
    if (!memetype || fetching.current) return;

    fetching.current = true;
    setError(null);

    try {
      const res = await fetch(
        `https://meme-api.com/gimme/${memetype}/50`
      );

      if (!res.ok) {
        throw new Error("API unavailable");
      }

      const data = await res.json();
      setMeme(data);

    } catch (err) {
      setError("Meme API is currently down. Try again later.");
      setMeme(null);
    } finally {
      fetching.current = false;
    }
  };

  useEffect(() => {
    fetchMeme();
  }, [memetype]);

  return { meme, error, fetchMeme };
}
