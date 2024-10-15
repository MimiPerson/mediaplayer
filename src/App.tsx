import React from "react";
import "./App.css";

const client = new StreamerbotClient();

client.on("General.*", async function (event: any) {
  if (event.data.altUrl) console.log(event.data.volume);
  if (event.data.condition === "any") {
    return playVideo(event);
  }

  if (event.data.date === event.data.condition) {
    return playVideo(event);
  } else if (event.data.altUrl) {
    return playVideo(event, true);
  }
});

/**
 * Plays a video based on the provided event data.
 *
 * @param event - The event object containing video data.
 * @param playAlt - A flag indicating whether to play the alternative video (default: false).
 *
 * @returns {void}
 */
function playVideo(event: any, playAlt: boolean = false) {
  const videoPlayer = document.querySelector("video");

  // Check if the videoPlayer exists
  if (videoPlayer) {
    // Set the new video source
    videoPlayer.src = `${process.env.PUBLIC_URL}/assets/${
      playAlt ? event.data.altUrl : event.data.video
    }`;

    // Set volume if provided, default to 100
    const volume = parseInt(event.data.volume) || 0;
    videoPlayer.volume = volume / 100;

    // Define handlers to ensure only one is added
    const handleCanPlay = () => {
      videoPlayer.play().catch((error) => {
        console.error("Video playback failed:", error);
      });
    };

    const handleEnded = () => {
      // Reset the video source to hide VideoPlayer
      videoPlayer.src = "";
      // Remove event listeners to prevent memory leaks
      videoPlayer.removeEventListener("ended", handleEnded);
      videoPlayer.removeEventListener("canplay", handleCanPlay);
    };

    // Clear existing event listeners to prevent duplicates
    videoPlayer.removeEventListener("ended", handleEnded);
    videoPlayer.removeEventListener("canplay", handleCanPlay);

    // Add the new event listeners
    videoPlayer.addEventListener("canplay", handleCanPlay);
    videoPlayer.addEventListener("ended", handleEnded);
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <video></video>
      </header>
    </div>
  );
}

export default App;
