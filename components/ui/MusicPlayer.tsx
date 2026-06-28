"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// ─── PLAYLISTS — add new entries here ────────────────────────────────────────
const PLAYLISTS = [
  { id: "PLXlw5wgpCx0w",                   label: "Worship"  },
  { id: "PLfDBbmAY2PYE",                   label: "Praise"   },
  { id: "PL9GoCpwDjkCVHSesG3mJ4qmLDWratKeg8", label: "Messages" },
] as const;

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

export default function MusicPlayer() {
  const playerRef = useRef<any>(null);
  const [state, setState]                   = useState<PlayerState>("idle");
  const [muted, setMuted]                   = useState(true);
  const [ready, setReady]                   = useState(false);
  const [showLabel, setShowLabel]           = useState(false);
  const [wiggle, setWiggle]                 = useState(false);
  const [isMobile, setIsMobile]             = useState(false);
  const [headerSlot, setHeaderSlot]         = useState<Element | null>(null);
  const [activePlaylist, setActivePlaylist] = useState(0);
  const [showPlaylists, setShowPlaylists]   = useState(false);
  const [trackTitle, setTrackTitle]         = useState("");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    setHeaderSlot(
      isMobile
        ? document.getElementById("music-player-mobile-slot")
        : document.getElementById("music-player-header-slot")
    );
  }, [isMobile]);

  useEffect(() => {
    if (document.getElementById("yt-iframe-api")) {
      if (window.YT?.Player) createPlayer(0, true);
      else window.onYouTubeIframeAPIReady = () => createPlayer(0, true);
      return;
    }
    const script = document.createElement("script");
    script.id    = "yt-iframe-api";
    script.src   = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
    window.onYouTubeIframeAPIReady = () => createPlayer(0, true);
    return () => { playerRef.current?.destroy(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setWiggle(true);
      setTimeout(() => setWiggle(false), 800);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  // Shared player factory — called on init and on playlist switch.
  // destroy() removes the YT iframe but leaves no element behind, so we
  // reset the target div via the wrapper before creating a new player.
  function createPlayer(playlistIndex: number, startMuted: boolean) {
    if (playerRef.current) return;

    // Ensure the target div exists (may have been removed by a prior destroy())
    const wrap = document.getElementById("yt-bg-player-wrap");
    if (wrap && !document.getElementById("yt-bg-player")) {
      const div = document.createElement("div");
      div.id = "yt-bg-player";
      wrap.appendChild(div);
    }

    playerRef.current = new window.YT.Player("yt-bg-player", {
      height: "1",
      width:  "1",
      playerVars: {
        listType:       "playlist",
        list:           PLAYLISTS[playlistIndex].id,
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
          if (!startMuted) e.target.unMute();
          e.target.playVideo();
          setState("playing");
        },
        onStateChange(e: any) {
          if (!window.YT) return;
          if (e.data === window.YT.PlayerState.PLAYING) {
            setState("playing");
            const title = e.target.getVideoData()?.title ?? "";
            setTrackTitle(title);
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

  function handlePlaylistSwitch(index: number) {
    if (index === activePlaylist) return;

    const wasMuted = muted;
    setActivePlaylist(index);
    setReady(false);
    setState("idle");
    setTrackTitle("");

    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }

    // createPlayer checks for the target div and recreates it if needed
    createPlayer(index, wasMuted);
  }

  const isPlaying    = state === "playing";
  const showControls = !muted;
  const labelText    = muted
    ? "CLICK TO LISTEN"
    : isPlaying
    ? PLAYLISTS[activePlaylist].label.toUpperCase()
    : "PLAY";

  const mainBtnClass = [
    "mp-main-btn-inline",
    wiggle              ? "mp-wiggle" : "",
    isPlaying && !muted ? "mp-pulse"  : "",
  ].filter(Boolean).join(" ");

  const sideWrapClass = (visible: boolean) =>
    `mp-side-wrap${visible ? " mp-side-visible" : ""}`;

  const player = (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      {/* Scrolling track title — visible when unmuted, hides when playlist picker is open */}
      {!muted && trackTitle && !showPlaylists && (
        <div className="mp-track-strip">
          <span className="mp-track-text">
            {trackTitle}&nbsp;&nbsp;·&nbsp;&nbsp;{trackTitle}
          </span>
        </div>
      )}

      {/* Playlist switcher dropdown */}
      <div className={`mp-playlist-row${showPlaylists ? " mp-playlist-visible" : ""}`}>
        {PLAYLISTS.map((pl, i) => (
          <button
            key={pl.id}
            className={`mp-pl-pill${activePlaylist === i ? " mp-pl-active" : ""}`}
            onClick={() => handlePlaylistSwitch(i)}
          >
            {pl.label}
          </button>
        ))}
      </div>

      {/* Controls row */}
      <div className="mp-row" style={{ gap: 4 }}>
        <div className={sideWrapClass(showControls)}>
          <button className="mp-side-btn mp-side-btn-sm" onClick={handlePrev} title="Previous" aria-label="Previous track">
            <BackIcon />
          </button>
        </div>

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
          {showLabel && (
            <span className="mp-label mp-label-visible" style={{ fontSize: "9px" }}>
              {labelText}
            </span>
          )}
        </button>

        <div className={sideWrapClass(showControls)}>
          <button className="mp-side-btn mp-side-btn-sm" onClick={handleNext} title="Next" aria-label="Next track">
            <SkipIcon />
          </button>
        </div>

        <div className={sideWrapClass(showControls)}>
          <button
            className={`mp-side-btn mp-side-btn-sm${showPlaylists ? " mp-side-btn-active" : ""}`}
            onClick={() => setShowPlaylists((p) => !p)}
            title="Switch playlist"
            aria-label="Switch playlist"
          >
            <ListIcon />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Wrapper keeps a stable DOM parent so we can recreate the YT target div after destroy() */}
      <div
        id="yt-bg-player-wrap"
        aria-hidden="true"
        style={{
          position: "fixed", bottom: 0, left: 0,
          width: 1, height: 1,
          overflow: "hidden", pointerEvents: "none", opacity: 0, zIndex: -1,
        }}
      >
        <div id="yt-bg-player" />
      </div>

      {/* Portal into header — mobile center slot or desktop right slot */}
      {headerSlot && createPortal(player, headerSlot)}
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

function ListIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="4" cy="6"  r="1.5" fill="currentColor" />
      <circle cx="4" cy="12" r="1.5" fill="currentColor" />
      <circle cx="4" cy="18" r="1.5" fill="currentColor" />
      <rect x="8" y="5"  width="12" height="2" rx="1" fill="currentColor" />
      <rect x="8" y="11" width="12" height="2" rx="1" fill="currentColor" />
      <rect x="8" y="17" width="12" height="2" rx="1" fill="currentColor" />
    </svg>
  );
}
