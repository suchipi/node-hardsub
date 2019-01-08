"use strict";

const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { spawn } = require("child-process-promise");
const { path: ffmpegPath } = require("ffmpeg-static");

function sha1() {
  const shasum = crypto.createHash("sha1");
  shasum.update("foo");
  return shasum.digest("hex");
}

module.exports = async function hardsub(
  inPath,
  outPath,
  { subtitleTrack, audioTrack, videoTrack } = {}
) {
  if (subtitleTrack == null) subtitleTrack = 0;
  if (audioTrack == null) audioTrack = 0;
  if (videoTrack == null) videoTrack = 0;

  const subtitleFilename = path.join(
    __dirname,
    `subs-${sha1(inPath + outPath + Date.now())}.ass`
  );

  try {
    console.log("Extracting subs to temporary file...");
    await spawn(
      ffmpegPath,
      /* prettier-ignore */ [
        "-i", inPath,
        "-map", `0:s:${subtitleTrack}`,
        subtitleFilename
      ],
      { stdio: "inherit" }
    );

    console.log("Hardsubbing video...");
    await spawn(
      ffmpegPath,
      /* prettier-ignore */ [
        "-i", inPath,
        "-y", // Overwrite output files without asking
        "-sn", // Disable subtitle recording
        "-vf", `ass=${subtitleFilename}`, // Overlay subtitles on video
        "-map", `0:v:${videoTrack}`,
        "-map", `0:a:${audioTrack}`,
        outPath
      ],
      { stdio: "inherit" }
    );
  } finally {
    if (fs.existsSync(subtitleFilename)) {
      console.log("Cleaning up subs file...");
      fs.unlinkSync(subtitleFilename);
    }
  }
};
