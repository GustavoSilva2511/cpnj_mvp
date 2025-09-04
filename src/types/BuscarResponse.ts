export interface BuscarResponse {
    mensagem:              string;
    inicio?:                number;
    quantidade_solicitada?: number;
    quantidade_encontrada?: number;
    quantidade_retornada?:  number;
    identificador_busca?:   string;
    dados:                 Array<Dado>;
    creditos:              Creditos;
}

export interface Creditos {
    disponivel: number;
}

export interface Dado {
    cnpj:                        string
    tipo:                        string;
    tipo_codigo:                 number;
    natureza_juridica_codigo:    number;
    natureza_juridica_descricao: string;
    razao_social:                string;
    nome_fantasia:               string | null;
    situacao:                    string;
    situacao_codigo:             number;
    situacao_data_evento?:        InicioAtividade;
    situacao_motivo_codigo?:      number;
    situacao_motivo_descricao?:   string;
    inicio_atividade?:            InicioAtividade;
    cnae_primario?:               number;
    cnaes_secundarios?:           Array<number>;
    endereco:                    Endereco;
    telefone_ddd_1?:              string;
    telefone_numero_1?:           string;
    telefone_ddd_2?:              string | null;
    telefone_numero_2?:           string | null;
    email?:                       string;
    telefones_repetidos?:         number;
    emails_repetidos?:            number;
    qualificacao_responsavel?:    number;
    capital_social?:              string;
    porte_codigo?:                number;
    porte?:                       string;
    simples?:                     boolean;
    simples_data_insercao?:       InicioAtividade;
    simples_data_exclusao?:       InicioAtividade;
    mei?:                         boolean;
    mei_data_insercao?:           InicioAtividade | null;
    mei_data_exclusao?:           InicioAtividade | null;
    situacao_especial?:           string | null;
    situacao_especial_data?:      string | null;
    membros?:                     Array<Membro>;
}

export interface Endereco {
    tipo?:             string;
    logradouro?:       string;
    numero?:           string;
    complemento?:      string | null;
    bairro?:           string;
    cep?:              string;
    uf?:               string;
    municipio_codigo?: number;
    municipio?:        string;
}

export interface InicioAtividade {
    formato_unix?: number;
    formato_date?: string;
}

export interface Membro {
    idade?:                  string;
    cpf?:                    string;
    cnpj?:                   string;
    identificador?:          string;
    nome?:                   string;
    pais_codigo?:            string;
    qualificacao_codigo?:    number;
    data_entrada?:           InicioAtividade;
    representante_nome?:     string;
    representante_cpf?:      string;
    qualificacao_descricao?: string;
}
