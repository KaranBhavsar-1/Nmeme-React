import LikeButton from "./LikeButton";
import DownloadButton from "./DownloadButton";
import heartImg from "/src/assets/images/LikedMeme.png";
import { useState } from "react";
import { useMeme } from "../../FetchMemesAPI/MemeContext";

const FALLBACK_MEME = {
  url: "",
  title: "subreddit not found",
  subreddit: "subreddit not found",
  postLink: "subreddit not found",
};

export default function MemeCard({
  Meme,
  count = 0,
  currentMemeNo = -1,
  isEmpty = true,
}) {
  const safeMeme = Meme ?? FALLBACK_MEME;

  const previewUrl =
    Array.isArray(safeMeme.preview) && safeMeme.preview.length > 0
      ? safeMeme.preview[0]
      : null;

  const { toggleLike, isLiked } = useMeme();
  const [showHeart, setShowHeart] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const memeId = safeMeme.postLink;
  const liked = memeId ? isLiked(memeId) : false;

  const handleDoubleClick = () => {
    if (isEmpty || !safeMeme.url || liked) return;

    toggleLike({
      id: memeId,
      url: safeMeme.url,
      title: safeMeme.title,
      subreddit: safeMeme.subreddit,
    });

    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 500);
  };

  return (
    <div className="flex justify-center">
      <div
        onDoubleClick={handleDoubleClick}
        className="
          mt-2 relative
          w-[380px] h-[520px]
          border-2 border-[#333]
          rounded-[10px]
          overflow-hidden
          flex flex-col
        "
      >
        {/* IMAGE AREA */}
        <div className="flex-1 flex items-center justify-center bg-gray-200 relative overflow-hidden">
          {safeMeme.url ? (
            <>
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className={`
                    absolute
                    max-h-[420px] w-auto object-contain
                    blur-lg scale-105
                    transition-opacity duration-300
                    ${imgLoaded ? "opacity-0" : "opacity-100"}
                  `}
                  draggable={false}
                />
              )}

              <img
                src={safeMeme.url}
                alt="Meme"
                onLoad={() => setImgLoaded(true)}
                className={`
                  max-h-[420px] w-auto object-contain
                  transition-opacity duration-300
                  ${imgLoaded ? "opacity-100" : "opacity-0"}
                `}
                draggable={false}
              />
            </>
          ) : (
            <span className="text-gray-600 text-sm">
              No meme available
            </span>
          )}
        </div>

        {/* TEXT AREA */}
        <div className="px-3 py-2 bg-gray-400 min-h-[120px]">
          <h3 className="text-[18px] font-semibold">{safeMeme.subreddit}</h3>
          <h2 className="text-[16px]">{safeMeme.title}</h2>
          <h2 className="text-[14px] text-blue-800 underline break-all">
            {safeMeme.postLink}
          </h2>
        </div>

        {/* MEME COUNT */}
        <div className="
        // absolute top-[10px] right-[10px] bg-white/80 px-2 py-1 rounded-md font-bold text-[14px] z-20
         absolute top-[10px] right-[10px]
            bg-white/80 px-2 py-1
            rounded-md font-bold text-[14px]
            text-black pointer-events-none
            select-none z-20
        ">
          Memes Count = {isEmpty ? "0/0" : `${currentMemeNo + 1}/${count}`}
        </div>

        {/* ACTION BUTTONS */}
        {!isEmpty && safeMeme.url && (
          <div className="absolute right-[10px] bottom-[140px] flex flex-col gap-5 z-20">
            <LikeButton meme={safeMeme} />
            <DownloadButton
              url={safeMeme.url}
              title={safeMeme.title || "meme"}
            />
          </div>
        )}

        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <img
              src={heartImg}
              alt="Liked"
              className="w-28 h-28 scale-110 animate-pulse opacity-90"
            />
          </div>
        )}
      </div>
    </div>
  );
}
