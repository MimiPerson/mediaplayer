### Streamer.bot Video Player with Conditional Playback

This project is a **video player** designed to integrate with **Streamer.bot**, enabling dynamic video playback based on user-defined conditions like the day of the week, volume, or fallback video options. It combines a **C# backend** for Streamer.bot integration and a **React frontend** for video handling, providing streamers with a seamless way to trigger video playback within **OBS** via a browser source.

---

### Features

- **Conditional Playback**: Play videos based on the day of the week or other criteria.
- **Volume Control**: Customize playback volume (defaults to 50%).
- **Fallback Video**: Define an alternative video if the main condition isn't met.
- **Streamer.bot WebSocket Integration**: Communicates via WebSocket for real-time event handling.
- **OBS Browser Source Integration**: Easily integrate with OBS using a built HTML page.

---

### Setup

#### 1. **Start the Streamer.bot WebSocket Server**

Import [Streamer.bot Import String](https://github.com/MimiPerson/mediaplayer/blob/master/Streamer.bot_Import.txt) into your streamer.bot

To use the video player, ensure that the Streamer.bot WebSocket server is running. By default, it runs at `127.0.0.1:8080`.

- To enable the WebSocket server, open Streamer.bot, navigate to **WebSocket Settings**, and start the server if it’s not already running.

#### 2. **Build the React App**

After setting up the WebSocket server, you need to build the React frontend:

```bash
npm run build
```

This creates a production-ready version of the app in the `build` folder, which contains the `index.html` file to be used in OBS.

#### 3. **Integrate with OBS**

To integrate the video player with **OBS**:

1. Open **OBS** and add a **Browser Source**.
2. Point the source URL to the `index.html` file in the `build` folder.
3. The video player will now respond to Streamer.bot WebSocket events and play videos according to the conditions set.

---

### Streamer.bot Setup

To trigger videos, use the following global variables in **Streamer.bot**:

- **`memeUrl`**: Main video URL or local file path.
- **`memeAlt`**: Optional alternative video URL if the main condition isn't met.
- **`memeVolume`**: Custom video volume (default is 50%).
- **`memeDay`**: Optional condition that specifies which day of the week the video will play (defaults to any day if not specified).
