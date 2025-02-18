import { api } from "../api";

class StreamService {
    private readonly baseUrl = "/stream";

    async getStreamUrl(id: number){
        try {
            const response = await api.get(`${this.baseUrl}/${id}`);
            return response.data;
        } catch {
            throw new Error("Erro ao listar filmes");
        }
    }
}

export const streamService = new StreamService();