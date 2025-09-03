import type { Municipalities } from "../types/Municipality"
import type { States } from "../types/State"

export const getMunicipalities = async (state?: string): Promise<Municipalities> => {
    const url = 'https://api.listacnae.com.br/v1/todosMunicipios';
    const bearerToken: string | undefined = '198EE5B2AC1-7F49DC5513A3927D-3CIH2YN9SSJVDAFWTDT1U5HNS6ZKJECI';
    const q = {
        method: "GET",
        headers: { "Authorization": `Bearer ${bearerToken}`}
    };
    try {
        const response = await fetch(url,q)
        const data = await response.json()
        const municipalities: Municipalities = data.municipios
        return state
        ? municipalities.filter(m => m.uf == state)
        : municipalities
    } catch(erro) {
        console.log(erro)
        const municipalities: Municipalities = [
            {
                codigo: 0,
                nome: "Erro ao buscar municipios",
                uf: "Erro ao buscar estados"
            }
        ]
        return state
        ? municipalities.filter(m => m.uf == state)
        : municipalities
    }




}

export const getStates = (): States => {
    const states: States = [
        { "nome": "AC" },
        { "nome": "AL" },
        { "nome": "AP" },
        { "nome": "AM" },
        { "nome": "BA" },
        { "nome": "CE" },
        { "nome": "DF" },
        { "nome": "ES" },
        { "nome": "GO" },
        { "nome": "MA" },
        { "nome": "MT" },
        { "nome": "MS" },
        { "nome": "MG" },
        { "nome": "PA" },
        { "nome": "PB" },
        { "nome": "PR" },
        { "nome": "PE" },
        { "nome": "PI" },
        { "nome": "RJ" },
        { "nome": "RN" },
        { "nome": "RS" },
        { "nome": "RO" },
        { "nome": "RR" },
        { "nome": "SC" },
        { "nome": "SP" },
        { "nome": "SE" },
        { "nome": "TO" }
]

    return states
}
