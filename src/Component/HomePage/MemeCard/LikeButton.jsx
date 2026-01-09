import likeImg from "/src/assets/images/LikeMeme.png";
import likedImg from "/src/assets/images/LikedMeme.png";
import { useMeme } from "../../FetchMemesAPI/MemeContext";

function LikeButton({ meme }) {
  const { toggleLike, isLiked } = useMeme();

  // 🔥 USE postLink AS ID
  const memeId = meme.postLink;

  const liked = isLiked(memeId);

  const memeData = {
    id: memeId,
    url: meme.url,
    title: meme.title,
    subreddit: meme.subreddit,
  };

  return (
    <button
      onClick={() => toggleLike(memeData)}
      className="w-[50px] h-[50px] flex items-center justify-center"
    >
      <img
        src={liked ? likedImg : likeImg}
        alt="Like"
        className={`w-7 h-7 transition-all ${liked ? "scale-125" : ""}`}
        draggable={false}
      />
    </button>
  );
}

export default LikeButton;
