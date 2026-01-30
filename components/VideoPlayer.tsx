import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Play } from 'lucide-react';

const VideoPlayer: React.FC = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const handlePlayFromStart = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.currentTime = 0;
    video.muted = false;
    void video.play();
    setControlsEnabled(true);
    setShowOverlay(false);
  };

  return (
    <section className="w-full max-w-7xl mx-auto">
      <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/agio_intro.mp4"
          autoPlay
          muted
          playsInline
          preload="metadata"
          controls={controlsEnabled}
        >
          Sorry, your browser does not support embedded videos.
        </video>

        {showOverlay && (
          <button
            type="button"
            className="nowrap group absolute left-1/2 -translate-x-1/2 md:bottom-[50px] bottom-[20px] flex items-center gap-3 px-4 md:px-8 py-4 bg-cta-bg text-cta-text rounded-full font-medium text-lg transition-all duration-300 hover:bg-cta-hover hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.2)]"
            onClick={handlePlayFromStart}
            aria-label={t('videoPlayer.watchVideo')}
          >
            <Play className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            {t('videoPlayer.watchVideo')}
          </button>
        )}
      </div>
    </section>
  );
};

export default VideoPlayer;
