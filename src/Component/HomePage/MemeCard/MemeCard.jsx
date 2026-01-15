import LikeButton from "./LikeButton";
import DownloadButton from "./DownloadButton";

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
  // ✅ HARD SAFETY GUARD
  const safeMeme = Meme ?? FALLBACK_MEME;

  return (
    <div className="flex justify-center">
      <div
        id="memeBox"
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
        <div className="flex-1 flex items-center justify-center bg-gray-200">
          {safeMeme.url ? (
            <img
              src={safeMeme.url}
              alt="Meme"
              className="max-h-[420px] w-auto object-contain"
            />
          ) : (
            <span className="text-gray-600 text-sm">
              No meme available
            </span>
          )}
        </div>

        {/* TEXT AREA */}
        <div className="px-3 py-2 bg-gray-400 min-h-[120px]">
          <h3 className="text-[18px] font-semibold">
            {safeMeme.subreddit}
          </h3>

          <h2 className="text-[16px]">
            {safeMeme.title}
          </h2>

          <h2 className="text-[14px] text-blue-800 underline break-all">
            {safeMeme.postLink}
          </h2>
        </div>

        {/* MEME COUNT */}
        <div
          className="
            absolute top-[10px] right-[10px]
            bg-white/80 px-2 py-1
            rounded-md font-bold text-[14px]
            text-black pointer-events-none
            select-none z-20
          "
        >
          Memes Count= {isEmpty ? "0/0" : `${currentMemeNo + 1}/${count}`}
        </div>

        {/* ACTION BUTTONS */}
        
        {!isEmpty && safeMeme.url && (
          <div className="absolute right-[10px] bottom-[140px] flex flex-col gap-5">
            <LikeButton meme={safeMeme} />
            {/* <DownloadButton /> */}
            <DownloadButton
  url={Meme.url}
  title={Meme.title || "meme"}
  />
          </div>
        )}
        {/* 
        {!isEmpty && (
  <div className="absolute right-[10px] bottom-[140px] flex flex-col gap-5 z-20">
    <LikeButton meme={Meme} />
    <DownloadButton
      url={Meme.url}
      title={Meme.title}
    />
  </div>
)}
        */}
        
      </div>
    </div>
  );
}
