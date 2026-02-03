"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CinematicAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeRef = useRef({ value: 0 });

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    // Set initial volume
    audio.volume = 0;

    // Volume control based on scroll
    const ctx = gsap.context(() => {
      // Fade in during identity resolution (15-30%)
      gsap.to(volumeRef.current, {
        value: 0.3,
        scrollTrigger: {
          trigger: ".swamp-scene",
          start: "+=600",   // 15% scroll
          end: "+=800",
          scrub: true,
          onUpdate: (self) => {
            if (audio && !isMuted) {
              audio.volume = volumeRef.current.value * self.progress;
            }
          }
        }
      });

      // Peak volume during sunrise (30-50%)
      gsap.to(volumeRef.current, {
        value: 0.5,
        scrollTrigger: {
          trigger: ".swamp-scene",
          start: "+=1400",  // 35% scroll
          end: "+=1600",
          scrub: true,
          onUpdate: () => {
            if (audio && !isMuted) {
              audio.volume = volumeRef.current.value;
            }
          }
        }
      });

      // Gentle fade for golden hour (75-100%)
      gsap.to(volumeRef.current, {
        value: 0.4,
        scrollTrigger: {
          trigger: ".swamp-scene",
          start: "+=3000",  // 75% scroll
          end: "+=1000",
          scrub: true,
          onUpdate: () => {
            if (audio && !isMuted) {
              audio.volume = volumeRef.current.value;
            }
          }
        }
      });
    });

    return () => ctx.revert();
  }, [isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => {
        console.log("Audio play failed:", err);
      });
      setIsPlaying(true);
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    if (newMutedState) {
      audioRef.current.volume = 0;
    } else if (isPlaying) {
      audioRef.current.volume = volumeRef.current.value;
    }
  };

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        {/*
          Replace with your audio file paths.
          Recommended: ambient nature sounds, soft piano, or drone music
          Format: MP3 or OGG for browser compatibility
        */}
        <source src="/audio/ambient-swamp.mp3" type="audio/mpeg" />
        <source src="/audio/ambient-swamp.ogg" type="audio/ogg" />
      </audio>

      {/* Audio controls UI */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-foreground/10 backdrop-blur-md border border-foreground/20 flex items-center justify-center hover:bg-foreground/20 transition-all group"
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          {isPlaying ? (
            // Pause icon
            <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            // Play icon
            <svg className="w-5 h-5 text-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        {/* Mute button (only show when playing) */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="w-14 h-14 rounded-full bg-foreground/10 backdrop-blur-md border border-foreground/20 flex items-center justify-center hover:bg-foreground/20 transition-all"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? (
              // Muted icon
              <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              // Volume icon
              <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </button>
        )}

        {/* Optional: Audio label */}
        {isPlaying && !isMuted && (
          <div className="text-xs text-foreground/40 text-center tracking-wider">
            AMBIENT
          </div>
        )}
      </div>
    </>
  );
}
