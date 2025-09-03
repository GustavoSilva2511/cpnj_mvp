export interface RootObject {
    mensagem: string;
    inicio: number;
    quantidade_solicitada: number;
    quantidade_encontrada: number;
    quantidade_retornada: number;
    identificador_busca: string;
    dados: Dado[];
    creditos: Creditos;
}

export interface Creditos {
    disponivel: number;
}

export interface Dado {
    cnpj: string;
    tipo: string;
    tipo_codigo: number;
    natureza_juridica_codigo: number;
    natureza_juridica_descricao: string;
    razao_social: string;
    nome_fantasia: null;
    situacao: string;
    situacao_codigo: number;
    situacao_data_evento: Situacaodataevento;
    situacao_motivo_codigo: number;
    situacao_motivo_descricao: string;
    inicio_atividade: Situacaodataevento;
    cnae_primario: number;
    cnaes_secundarios: number[];
    endereco: Endereco;
    telefone_ddd_1: string;
    telefone_numero_1: string;
    telefone_ddd_2: null;
    telefone_numero_2: null;
    email: string;
    telefones_repetidos: number;
    emails_repetidos: number;
    qualificacao_responsavel: number;
    capital_social: string;
    porte_codigo: number;
    porte: string;
    simples: boolean;
    simples_data_insercao: Situacaodataevento;
    simples_data_exclusao: Situacaodataevento;
    mei: boolean;
    mei_data_insercao: Situacaodataevento;
    mei_data_exclusao: Situacaodataevento;
    situacao_especial: null;
    situacao_especial_data: null;
}

export interface Endereco {
    tipo: string;
    logradouro: string;
    numero: string;
    complemento: null;
    bairro: string;
    cep: string;
    uf: string;
    municipio_codigo: number;
    municipio: string;
}

export interface Situacaodataevento {
    formato_unix: number;
    formato_date: string;
}
