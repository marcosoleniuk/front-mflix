import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { movieService } from '../../services/ListMovies';
import { VideoPlayer } from '../../components/VideoPlayer';
import { Movie } from '../../services/ListMovies/@types';


export const Watch: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movieId, setMovieId] = useState<Movie>();
    const [movie, setMovie] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movies = await movieService.listMovies();
        const foundMovie = movies.find(m => m.id === Number(id));
        setMovieId(foundMovie);
        if (foundMovie) {
          setMovie(import.meta.env.VITE_BASE_URL + "/stream/" + foundMovie.id);
        } else {
          setError('Filme não encontrado.');
        }
      } catch (error) {
        setError('Erro ao carregar o filme.');
        console.error('Erro ao carregar filme:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  if (loading) {
    return <div className="text-black text-center mt-20">Carregando...</div>;
  }

  if (error) {
    return <div className="text-black text-center mt-20">{error}</div>;
  }

  if (!movie) {
    return <div className="text-black text-center mt-20">Filme não encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed top-0 left-0 z-50 p-4">
        <Link to="/" className="flex items-center gap-2 text-white hover:text-gray-300 transition">
          <ArrowLeft size={24} />
          <span>Voltar</span>
        </Link>
      </div>

      {movieId && <VideoPlayer movieId={movieId.id} streamUrl={movie} />}

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-white text-3xl font-bold mb-4">{movieId?.title}</h1>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-green-400">{Math.round((movieId?.voteAverage ?? 0) * 10)}% Aprovado</span>
          <span className="text-gray-400">{movieId?.releaseDate ? new Date(movieId.releaseDate).getFullYear() : 'Data desconhecida'}</span>
        </div>
        <p className="text-gray-300">{movieId?.overview}</p>
        <div className="mt-4">
          <h3 className="text-white font-semibold mb-2">Gêneros</h3>
          <div className="flex flex-wrap gap-2">
            {movieId?.genres.map((genre) => (
              <span key={genre.idGenres} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
