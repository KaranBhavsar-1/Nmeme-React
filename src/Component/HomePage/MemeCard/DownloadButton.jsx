import { useState } from "react";
import downloadIcon from "../../../assets/images/DownloadButton.png";

function DownloadButton({ url, title = "meme" }) {
  const [animate, setAnimate] = useState(false);

  const handleClick = async () => {
    if (!url) return;

    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);

    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed", err);
      alert("Failed to download meme");
    }
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
      title="Download meme"
    >
      <img
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
