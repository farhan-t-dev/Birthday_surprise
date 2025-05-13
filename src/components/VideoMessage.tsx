import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Gift, Pause, Play, Volume2, VolumeX, Maximize2, RotateCw } from "lucide-react";

const SecretVideoSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [isUnwrapping, setIsUnwrapping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  const touchStartRef = useRef<number>(0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleOpenGift = useCallback(() => {
    setIsUnwrapping(true);
    setTimeout(() => {
      setIsGiftOpened(true);
    }, 2500);
  }, []);

  const handlePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(e => console.error("Video play failed:", e));
      setIsPlaying(true);
      setHasEnded(false);
      startProgressAnimation();
    } else {
      video.pause();
      setIsPlaying(false);
      cancelAnimationFrame(animationRef.current!);
    }
    setShowControls(true);
    resetControlsTimer();
  }, []);

  const handleReplay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play().catch(e => console.error("Video play failed:", e));
    setIsPlaying(true);
    setHasEnded(false);
    startProgressAnimation();
    setShowControls(true);
    resetControlsTimer();
  }, []);

  const handleMuteToggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
    setShowControls(true);
    resetControlsTimer();
  }, []);

  const handleFullscreen = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen().catch(e => console.error("Fullscreen error:", e));
    }
    setShowControls(true);
    resetControlsTimer();
  }, []);

  const handleProgressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (video && !isNaN(video.duration)) {
      const newTime = (Number(e.target.value) / 100) * video.duration;
      video.currentTime = newTime;
      setCurrentTime(newTime);
    }
    setShowControls(true);
    resetControlsTimer();
  }, []);

  const updateProgress = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const currentProgress = (video.currentTime / video.duration) * 100;
    setProgress(currentProgress);
    setCurrentTime(video.currentTime);
    
    if (isPlaying && !video.paused) {
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  }, [isPlaying]);

  const startProgressAnimation = useCallback(() => {
    cancelAnimationFrame(animationRef.current!);
    animationRef.current = requestAnimationFrame(updateProgress);
  }, [updateProgress]);

  const resetControlsTimer = useCallback(() => {
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (!isHovering) {
        setShowControls(false);
      }
    }, 3000);
  }, [isHovering]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    setShowControls(true);
    resetControlsTimer();
  }, [resetControlsTimer]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setShowControls(false);
  }, []);

  const handleVideoClick = useCallback(() => {
    handlePlayPause();
    resetControlsTimer();
  }, [handlePlayPause, resetControlsTimer]);

  // Touch event handlers for mobile
  const handleTouchStart = useCallback(() => {
    touchStartRef.current = Date.now();
    setShowControls(true);
    resetControlsTimer();
  }, [resetControlsTimer]);

  const handleTouchEnd = useCallback(() => {
    // Only toggle play/pause if it was a short tap (not a swipe)
    if (Date.now() - touchStartRef.current < 200) {
      handlePlayPause();
    }
  }, [handlePlayPause]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setHasEnded(false);
      startProgressAnimation();
      resetControlsTimer();
    };

    const handlePause = () => {
      setIsPlaying(false);
      cancelAnimationFrame(animationRef.current!);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setHasEnded(true);
      cancelAnimationFrame(animationRef.current!);
    };

    const handleWaiting = () => {
      setIsBuffering(true);
    };

    const handlePlaying = () => {
      setIsBuffering(false);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
      cancelAnimationFrame(animationRef.current!);
      clearTimeout(controlsTimeoutRef.current);
    };
  }, [startProgressAnimation, resetControlsTimer]);

  // Auto pause if out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          if (video && !video.paused) {
            video.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.4 }
    );

    const section = sectionRef.current;
    if (section) observer.observe(section);
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="secret-video"
      className="relative min-h-screen bg-gradient-to-b from-[#0b0c1a] to-[#0a0a0a] text-white flex flex-col items-center justify-center px-4"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 opacity-10 blur-3xl rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Flickering Message */}
      {isVisible && !isGiftOpened && (
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-pink-300 mb-6 font-light italic text-center max-w-md z-10 animate-flicker"
        >
          Just one more surprise before you go... 💌
        </motion.p>
      )}

      {/* Gift Button */}
      {isVisible && !isGiftOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative flex flex-col items-center justify-center z-10"
        >
          <motion.button
            onClick={handleOpenGift}
            disabled={isUnwrapping}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 p-10 rounded-2xl shadow-2xl border-2 border-white/20 backdrop-blur-md flex items-center justify-center overflow-hidden"
          >
            <Gift size={64} className="text-white drop-shadow-lg" />
          </motion.button>
          <p className="mt-3 text-white text-sm font-semibold tracking-wide">
            {isUnwrapping ? "Unwrapping..." : "Open your gift 🎁"}
          </p>
        </motion.div>
      )}

      {/* Video Reveal */}
      {isVisible && isGiftOpened && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            className="relative w-full max-w-[600px] aspect-video rounded-3xl overflow-hidden shadow-2xl border border-pink-500/40 bg-pink-100/10 backdrop-blur-xl z-10"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Video element with click handler */}
            <div 
              className="absolute inset-0 w-full h-full cursor-pointer"
              onClick={handleVideoClick}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <video
                ref={videoRef}
                playsInline
                className="w-full h-full object-cover"
                preload="metadata" // Optimize loading
              >
                <source src="/video/video_message.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Buffering Indicator */}
              {isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
                </div>
              )}

              {/* Replay Button at the end */}
              {hasEnded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <button
                    onClick={handleReplay}
                    className="p-4 bg-pink-500/80 rounded-full backdrop-blur-md border border-white/20 hover:bg-pink-600 transition flex items-center gap-2"
                  >
                    <RotateCw size={24} />
                    <span className="font-medium">Watch Again</span>
                  </button>
                </div>
              )}
            </div>

            {/* Controls Container */}
            <motion.div
              ref={controlsRef}
              className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 px-4 pb-4 pt-2 z-30 bg-gradient-to-t from-black/50 to-transparent"
              initial={{ opacity: 1, y: 0 }}
              animate={{ 
                opacity: showControls ? 1 : 0,
                y: showControls ? 0 : 20
              }}
              transition={{ duration: 0.2 }}
            >
              {/* Progress Bar */}
              <div className="relative w-full">
                <input
                  ref={progressRef}
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleProgressChange}
                  className="progress-bar w-full h-2 rounded-full outline-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-white/70 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center text-white">
                <button
                  onClick={handlePlayPause}
                  className="p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20 hover:bg-pink-500/30 transition"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>

                <button
                  onClick={handleMuteToggle}
                  className="p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20 hover:bg-pink-500/30 transition"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>

                <button
                  onClick={handleFullscreen}
                  className="p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20 hover:bg-pink-500/30 transition"
                  aria-label="Fullscreen"
                >
                  <Maximize2 size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Signature */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-6 text-center text-pink-200 font-[signature] text-3xl md:text-4xl z-10"
          >
            — Farhan 💖
          </motion.p>
        </>
      )}
    </section>
  );
};

export default SecretVideoSection;