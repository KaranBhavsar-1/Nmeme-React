import { useState } from "react";
import downloadIcon from "../../assets/images/LikeMeme.png "; // adjust path

function DownloadButton() {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      className="
        w-[50px] h-[50px]
        flex items-center justify-center
        bg-transparent
        hover:scale-110
        transition-transform
      "
    >
      <img
        // src={"src/assets/images/DownloadButton.png"}
        src={downloadIcon}
        alt="Download"
        className={`
          w-7 h-7
          transition-transform duration-300
          ${animate ? "scale-125 rotate-12" : ""}
        `}
      />
    </button>
  );
}

export default DownloadButton;
