import { useMeme } from "../FetchMemesAPI/MemeContext";

function LikedMemePage() {
  const { likedMemes, toggleLike } = useMeme();

  return (
    <div className="p-4">
      <h1 className="font-bold italic text-3xl">
        Liked Memes
      </h1>

      <h1 className="font-bold italic px-2 py-2 text-xl">
        Your Liked Memes: {likedMemes.length}
      </h1>

      <div className="flex flex-wrap gap-2 mt-2">
        {likedMemes.map((meme) => (
          <div
            key={meme.id}
            className="relative w-[150px] sm:w-[180px] border-2 border-gray-600 dark:border-gray-300 rounded-md overflow-hidden"
          >
            {/* REMOVE BUTTON at top-right */}
            <button
              onClick={() => toggleLike(meme)}
              className="
                absolute top-1 right-1
                w-6 h-6
                rounded-full
                bg-red-600 text-white
                flex items-center justify-center
                text-sm font-bold
                hover:bg-red-700
                z-10
              "
              title="Remove from liked"
            >
              −
            </button>

            {/* MEME IMAGE */}
            <img
              src={meme.url}
              alt={meme.title}
              className="w-full h-[150px] object-contain"
            />

            {/* MEME DETAILS */}
            <div className="p-2 text-sm">
              <p className="font-semibold">{meme.subreddit}</p>
              <p className="truncate">{meme.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LikedMemePage;
