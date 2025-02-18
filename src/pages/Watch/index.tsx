import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { movieService } from '../../services/ListMovies';
import { Movie as OriginalMovie } from '../../services/ListMovies/@types';
import { VideoPlayer } from '../../components/VideoPlayer';
import { streamService } from '../../services/StreamMovie';

interface Movie extends OriginalMovie {
  streamUrl: string;
}

export const Watch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movies = await movieService.listMovies();
        const foundMovie = movies.find(m => m.id === Number(id));
        if (foundMovie) {
          const streamUrl = await streamService.getStreamUrl(foundMovie.id);
          setMovie({ ...foundMovie, streamUrl });
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed top-0 left-0 z-50 p-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-white hover:text-gray-300 transition"
        >
          <ArrowLeft size={24} />
          <span>Back to Browse</span>
        </Link>
      </div>
      <VideoPlayer
        movieId={movie.id}
        streamUrl={movie.streamUrl}
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-white text-3xl font-bold mb-4">{movie.title}</h1>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-green-400">{Math.round(movie.voteAverage * 10)}% Match</span>
          <span className="text-gray-400">{new Date(movie.releaseDate).getFullYear()}</span>
        </div>
        <p className="text-gray-300">{movie.overview}</p>
        <div className="mt-4">
          <h3 className="text-white font-semibold mb-2">Genres</h3>
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre.idGenres}
                className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};