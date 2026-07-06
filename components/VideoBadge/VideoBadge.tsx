"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { cx } from "@/lib/cx";
import { useIsMounted } from "@/lib/useIsMounted";
import styles from "./VideoBadge.module.scss";

const VIDEO_SRC = "/video/project.mp4";

type IOSVideoElement = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

export default function VideoBadge() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isMounted = useIsMounted();

  const stopVideo = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    setIsPlaying(true);
    void video.play().catch(() => undefined);

    if (typeof video.requestFullscreen === "function") {
      void video.requestFullscreen().catch(() => undefined);
    } else {
      try {
        (video as IOSVideoElement).webkitEnterFullscreen?.();
      } catch {}
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const video = videoRef.current;

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        stopVideo();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      if (document.fullscreenElement) {
        void document.exitFullscreen().catch(() => undefined);
      } else {
        stopVideo();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("keydown", handleKeyDown);
    video?.addEventListener("webkitendfullscreen", stopVideo);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("keydown", handleKeyDown);
      video?.removeEventListener("webkitendfullscreen", stopVideo);
    };
  }, [isPlaying, stopVideo]);

  return (
    <>
      <button
        type="button"
        className={styles.badge}
        onClick={handlePlayClick}
        aria-label="Смотреть видео о проекте"
      >
        <Image
          src="/images/video-preview.jpg"
          alt=""
          fill
          sizes="241px"
          className={styles.preview}
        />
        <span className={styles.overlay} aria-hidden="true" />
        <span className={styles.ring} aria-hidden="true">
          <span className={styles.disc} />
          <Image src="/icons/icon-play.svg" alt="" width={10} height={11} />
          <span className={styles.caption}>play</span>
        </span>
      </button>

      {isMounted &&
        createPortal(
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            className={cx(styles.video, isPlaying && styles.videoActive)}
            preload="metadata"
            playsInline
            controls={isPlaying}
            tabIndex={isPlaying ? 0 : -1}
            aria-hidden={!isPlaying}
          />,
          document.body,
        )}
    </>
  );
}
