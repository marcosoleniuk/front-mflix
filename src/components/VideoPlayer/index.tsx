import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, Volume2, VolumeX, Subtitles } from 'lucide-react';

interface VideoPlayerProps {
  movieId: number;
  streamUrl: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ movieId, streamUrl }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioTrack, setAudioTrack] = useState('eng');

  useEffect(() => {
    const savedProgress = localStorage.getItem(`movie-${movieId}-progress`);
    if (savedProgress) {
      setProgress(parseFloat(savedProgress));
    }
  }, [movieId]);

  const handleProgress = ({ played }: { played: number }) => {
    setProgress(played);
    localStorage.setItem(`movie-${movieId}-progress`, played.toString());
  };

  const togglePlay = () => setPlaying(!playing);
  const toggleMute = () => setMuted(!muted);

  return (
    <div className="relative w-full aspect-video bg-black">
      <ReactPlayer
        url={streamUrl}
        width="100%"
        height="100%"
        playing={playing}
        volume={volume}
        muted={muted}
        progressInterval={1000}
        onProgress={handleProgress}
      />
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="text-white hover:text-gray-300 transition"
          >
            {playing ? <Pause size={24} /> : <Play size={24} />}
          </button>
          
          <button
            onClick={toggleMute}
            className="text-white hover:text-gray-300 transition"
          >
            {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
          
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24"
            />
          </div>

          <div className="relative group">
            <button className="text-white hover:text-gray-300 transition">
              <Subtitles size={24} />
            </button>
            <div className="absolute bottom-full left-0 hidden group-hover:block bg-black/90 p-2 rounded">
              <select
                value={audioTrack}
                onChange={(e) => setAudioTrack(e.target.value)}
                className="bg-transparent text-white border border-white/20 rounded px-2 py-1"
              >
                <option value="eng">English</option>
                <option value="por">Portuguese</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="mt-2">
          <div className="w-full bg-gray-600 h-1 rounded-full">
            <div
              className="bg-red-600 h-full rounded-full"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};