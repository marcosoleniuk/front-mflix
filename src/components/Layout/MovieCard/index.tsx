import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Movie } from '../../../services/ListMovies/@types';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/watch/${movie.id}`} className="group relative">
      <div className="aspect-[2/3] overflow-hidden rounded-md">
        <img
          src={movie.posterPath}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 p-4 w-full">
            <h3 className="text-white font-semibold truncate">{movie.title}</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-green-400 text-sm">{Math.round(movie.voteAverage * 10)}% Match</span>
              <span className="text-gray-300 text-sm">{new Date(movie.releaseDate).getFullYear()}</span>
            </div>
            <button className="mt-3 flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-white/90 transition">
              <Play size={16} />
              Play
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};