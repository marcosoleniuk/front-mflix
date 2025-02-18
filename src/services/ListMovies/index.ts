import { api } from "../api";
import { Movie } from "./@types";


class MovieService {
    private readonly baseUrl = "/movies";

    async listMovies(): Promise<Movie[]>{
        try {
            const response = await api.get<Movie[]>(`${this.baseUrl}/list`);
            return response.data;
        } catch {
            throw new Error("Erro ao listar filmes");
        }
    }
}

export const movieService = new MovieService();