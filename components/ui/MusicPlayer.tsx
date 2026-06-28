"use client";

import { useEffect, useRef, useState } from "react";

// ─── CONFIGURE YOUR PLAYLIST ─────────────────────────────────────────────────
const PLAYLIST_ID = ""; // paste YouTube playlist ID here (the part after ?list=)
const START_INDEX = 0;
const TRACK_STARTS: Record<number, number> = {}; // e.g. { 0: 27, 1: 23 }
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

type PlayerState = "idle" | "playing" | "paused";

export default function MusicPlayer({ inline = false }: { inline?: boolean }) {
  const playerRef = useRef<any>(null);
  const [state, setState]       = useState<PlayerState>("idle");
  const [muted, setMuted]       = useState(true);
  const [ready, setReady]       = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [wiggle, setWiggle]     = useState(false);

  // Load YouTube IFrame API once
  useEffect(() => {
    if (document.getElementById("yt-iframe-api")) {
      if (window.YT?.Player) initPlayer();
      else window.onYouTubeIframeAPIReady = initPlayer;
      return;
    }
    const script = document.createElement("script");
    script.id    = "yt-iframe-api";
    script.src   = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
    window.onYouTubeIframeAPIReady = initPlayer;
    return () => { playerRef.current?.destroy(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Attention wiggle — fires once after 2 s
  useEffect(() => {
    const t = setTimeout(() => {
      setWiggle(true);
      setTimeout(() => setWiggle(false), 800);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  function initPlayer() {
    if (playerRef.current) return;
    playerRef.current = new window.YT.Player("yt-bg-player", {
      height: "1",
      width:  "1",
      playerVars: {
        listType:       "playlist",
        list:           PLAYLIST_ID,
        index:          START_INDEX,
        autoplay:       1,
        mute:           1,
        loop:           1,
        controls:       0,
        disablekb:      1,
        fs:             0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel:            0,
        showinfo:       0,
      },
      events: {
        onReady(e: any) {
          setReady(true);
          e.target.setVolume(55);
          e.target.playVideo();
          setState("playing");
        },
        onStateChange(e: any) {
          if (!window.YT) return;
          if (e.data === window.YT.PlayerState.PLAYING) {
            setState("playing");
            const idx    = e.target.getPlaylistIndex();
            const seekTo = TRACK_STARTS[idx];
            if (seekTo !== undefined && e.target.getCurrentTime() < 3) {
              e.target.seekTo(seekTo, true);
            }
          }
          if (e.data === window.YT.PlayerState.PAUSED) setState("paused");
          if (e.data === window.YT.PlayerState.ENDED)  e.target.playVideoAt(0);
        },
      },
    });
  }

  function handleClick() {
    if (!ready || !playerRef.current) return;
    if (muted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(55);
      setMuted(false);
      return;
    }
    if (state === "playing") playerRef.current.pauseVideo();
    else                     playerRef.current.playVideo();
  }

  function handleNext() {
    if (!ready || !playerRef.current) return;
    playerRef.current.nextVideo();
  }

  function handlePrev() {
    if (!ready || !playerRef.current) return;
    playerRef.current.previousVideo();
  }

  const isPlaying        = state === "playing";
  const showControls     = !muted;
  const showLabelVisible = !inline && (showLabel || muted);
  const labelText        = muted ? "CLICK TO LISTEN" : isPlaying ? "PAUSE" : "PLAY";

  const mainBtnClass = [
    inline ? "mp-main-btn-inline" : "mp-main-btn",
    wiggle              ? "mp-wiggle" : "",
    isPlaying && !muted ? "mp-pulse"  : "",
  ].filter(Boolean).join(" ");

  const row = (
    <div className="mp-row">
      {/* Prev button */}
      <div className={`mp-side-wrap${showControls ? " mp-side-visible" : ""}`}>
        <button className="mp-side-btn" onClick={handlePrev} title="Previous track" aria-label="Previous track">
          <BackIcon />
        </button>
      </div>

      {/* Main button */}
      <button
        className={mainBtnClass}
        onClick={handleClick}
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
        title={muted ? "Click to hear music" : isPlaying ? "Pause music" : "Play music"}
        aria-label={muted ? "Click to hear music" : isPlaying ? "Pause music" : "Play music"}
      >
        <span className="mp-icon">
          {isPlaying && !muted ? <AudioBars /> : <MusicNote />}
        </span>
        {!inline && (
          <span className={`mp-label${showLabelVisible ? " mp-label-visible" : ""}`}>
            {labelText}
          </span>
        )}
        {inline && showLabel && (
          <span className="mp-label mp-label-visible" style={{ fontSize: "9px" }}>
            {labelText}
          </span>
        )}
      </button>

      {/* Next button */}
      <div className={`mp-side-wrap${showControls ? " mp-side-visible" : ""}`}>
        <button className="mp-side-btn" onClick={handleNext} title="Next track" aria-label="Next track">
          <SkipIcon />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Hidden YouTube iframe target */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed", bottom: 0, left: 0,
          width: 1, height: 1,
          overflow: "hidden", pointerEvents: "none", opacity: 0, zIndex: -1,
        }}
      >
        <div id="yt-bg-player" />
      </div>

      {inline ? row : <div className="mp-wrapper">{row}</div>}
    </>
  );
}

function AudioBars() {
  return (
    <>
      <span className="mp-audio-bar" />
      <span className="mp-audio-bar" />
      <span className="mp-audio-bar" />
      <span className="mp-audio-bar" />
    </>
  );
}

function MusicNote() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.75 }}>
      <path
        d="M9 18V5l12-2v13"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="6"  cy="18" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function SkipIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <polygon points="5,4 15,12 5,20" fill="currentColor" />
      <rect x="17" y="4" width="3" height="16" rx="1" fill="currentColor" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <polygon points="19,4 9,12 19,20" fill="currentColor" />
      <rect x="4" y="4" width="3" height="16" rx="1" fill="currentColor" />
    </svg>
  );
}
