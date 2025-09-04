import type { Cnaes } from "../types/Cnae";

export const getCnaes = async (): Promise<Cnaes> => {
    const url = 'https://api.listacnae.com.br/v1/todosCnaes';
    const bearerToken: string | undefined = import.meta.env.VITE_TOKEN_API;

    const q = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${bearerToken}`
        }
    };

    try {
        const response = await fetch(url,q)
        const data = await response.json()
        const cnaes: Cnaes = data.cnaes
        return cnaes
    } catch(erro) {
            console.log(erro)
            const cnaes: Cnaes = [
                {
                    codigo: 0,
                    descricao: "Erro ao buscar Cnaes"
                }
            ]
            return cnaes
        }
}