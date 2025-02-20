import React, { useEffect, useRef } from 'react';
import {
  MediaPlayer,
  MediaProvider,
  type MediaPlayerInstance,
} from '@vidstack/react';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

interface VideoPlayerProps {
  movieId: number;
  streamUrl: string;
}

const LOCAL_STORAGE_KEY = 'video-progress';

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ movieId, streamUrl }) => {
  const player = useRef<MediaPlayerInstance>(null);

  useEffect(() => {
    const savedProgress = localStorage.getItem(`${LOCAL_STORAGE_KEY}-${movieId}`);
    if (savedProgress && player.current) {
      player.current.currentTime = parseFloat(savedProgress);
    }
  }, [movieId]);

  const handlePause = () => {
    if (player.current) {
      localStorage.setItem(
        `${LOCAL_STORAGE_KEY}-${movieId}`,
        player.current.currentTime.toString()
      );
    }
  };

  const handleLoadedMetadata = () => {
    if (player.current) {
      const audioTracks = player.current.audioTracks;
      const ptTrack = Array.from(audioTracks).find((track) =>
        track?.label.toLowerCase().includes('português')
      );
      if (ptTrack) {
        ptTrack.selected = true;
      }
      console.log(audioTracks)
    }
  };

  return (
    <MediaPlayer
      ref={player}
      onPause={handlePause}
      onLoadedMetadata={handleLoadedMetadata}
      className="w-full aspect-video"
    >
      <MediaProvider>
        <source src={streamUrl} type="video/mp4" />
      </MediaProvider>
      
      <DefaultVideoLayout
        icons={defaultLayoutIcons}
        slots={{
          settingsMenu: (
            <>
              {({ children }: { children: React.ReactNode }) => (
                <>
                  {children}
                  <div className="vds-audio-tracks-menu">
                    {Array.from(player.current?.audioTracks || []).map((track) => (
                      <button
                        key={track?.id}
                        className={`vds-menu-button ${
                          track?.selected ? 'vds-selected' : ''
                        }`}
                        onClick={() => {
                          if (track) {
                            track.selected = true;
                          }
                        }}
                      >
                        {track ? track.label || `Audio Track ${track.id}` : 'Unknown Track'}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </>
          )
        }}
      />
    </MediaPlayer>
  );
};