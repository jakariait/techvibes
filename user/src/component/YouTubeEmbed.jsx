import React from "react";

const YouTubeEmbed = ({ url }) => {
  if (!url) return null;

  // Extract the video ID from the URL
  const videoId = (() => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === "youtu.be") return urlObj.pathname.slice(1);
      if (urlObj.hostname.includes("youtube.com"))
        return urlObj.searchParams.get("v");
    } catch {
      return null;
    }
  })();

  if (!videoId) return null;

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
