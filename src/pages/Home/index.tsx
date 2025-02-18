import React, { useEffect, useState } from 'react';
import { Movie } from '../../services/ListMovies/@types';
import { MovieCard } from '../../components/Layout/MovieCard';
import { movieService } from '../../services/ListMovies';

export const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieService.listMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-[#141414]">
      <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/80 to-transparent">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-red-600 text-3xl font-bold">NETFLIX</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24">
        <h2 className="text-white text-2xl font-semibold mb-6">Popular on Netflix</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );
};