import './ConsultFilter.css'
import { useEffect, useState } from 'react'
import { getMunicipalities, getStates } from '../../services/MunicipalityService'
import * as z from "zod"
import type { Municipalities } from '../../types/Municipality'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    state: z.string().min(1, "Estado é obrigatório"),
    municipality: z.string().min(1, "Município é obrigatório"),
    keyWords: z.object({
        inCompanyName: z.boolean().optional(),
        inFantasyName: z.boolean().optional()
    }).optional(),
    searchTerm: z.string().optional(),
    cnaes: z.array(z.string()).optional()
})

type FormData = z.infer<typeof schema>

export default function ConsultFilter({ setCnpjs }) {
    const [allStates, setAllStates] = useState<{nome: string}[]>([])
    const [allMunicipalities, setAllMunicipalities] = useState<Municipalities>([])
    const [credits, setCredits] = useState<number>(30)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            state: "",
            municipality: "",
            keyWords: {
                inCompanyName: false,
                inFantasyName: false
            },
            searchTerm: "",
            cnaes: []
        }
    })

    // Observa mudanças no campo state
    const selectedState = watch("state")

    // Carrega estados na inicialização
    useEffect(() => {
        setAllStates(getStates())
    }, [])

    // Filtra municípios quando o estado muda
    useEffect(() => {
        if (selectedState) {
            getMunicipalities(selectedState).then(municipalities => {
                setAllMunicipalities(municipalities)
            }).catch(error => {
                console.error("Erro ao carregar municípios:", error)
                setAllMunicipalities([])
            })
        } else {
            setAllMunicipalities([])
        }

        // Limpa o município selecionado quando o estado muda
        setValue("municipality", "")
    }, [selectedState, setValue])

    const handleFilterForm = (data: FormData) => {
        console.log("Dados do formulário:", data)
        // const url = 'https://api.listacnae.com.br/v1/buscar';
        // const bearerToken = '198EE5B2AC1-7F49DC5513A3927D-3CIH2YN9SSJVDAFWTDT1U5HNS6ZKJECI'; // Insira o token gerado.
        // const stfy = JSON.stringify;
        // const json = {
        //     inicio: 0,
        //     quantidade: 2,
        //     email_obrigatorio: false,
        //     simples_nacional: false,
        //     termos_de_busca: stfy([]),
        //     somente_matrizes: true,
        //     data_inicio: "01/01/2000",
        //     data_fim: "01/01/2025",
        //     estados: stfy([data.state]),
        //     incluir_cnaes_secundarios: false,
        //     cnaes: stfy(data.cnaes?.map((e) => parseInt(e))),
        //     municipios: stfy([data.municipality].map((e) => parseInt(e)))
        // };
        // let q = { method: "GET", headers: { "Authorization": `Bearer ${bearerToken}`}};
        // let u = `${url}?${new URLSearchParams(json).toString()}`;
        // fetch(u,q).then(r => r.json()).then(dados => {
        //     console.log(dados);
        //     setCredits(dados.creditos.disponivel)
        // }).catch(erro => {
        //     console.log(erro);
        // })
        const res = {
            "mensagem":"Sucesso ao capturar dados solicitados.",
            "inicio":0,
            "quantidade_solicitada":2,
            "quantidade_encontrada":199,
            "quantidade_retornada":2,
            "identificador_busca":"5MUHVK6PGSEOS8E0TE760WNJRC6ELANM",
            "dados":[
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                },
                {
                    "cnpj":"24899258000130",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2135,
                    "natureza_juridica_descricao":"Empresário (Individual)",
                    "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
                    "nome_fantasia":null,
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        4732600,
                        4742300,
                        4541206,
                        4744099
                    ],
                    "endereco":{
                        "tipo":"AVENIDA",
                        "logradouro":"ACRE",
                        "numero":"48",
                        "complemento":null,
                        "bairro":"CHACARA BRASIL",
                        "cep":"65066841",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"31997673",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":"maranhaoparafusos@gmail.com",
                    "telefones_repetidos":2,
                    "emails_repetidos":1,
                    "qualificacao_responsavel":50,
                    "capital_social":"5000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":{
                        "formato_unix":1464663600000,
                        "formato_date":"2016-05-31T03:00:00.000Z"
                    },
                    "mei_data_exclusao":{
                        "formato_unix":1703991600000,
                        "formato_date":"2023-12-31T03:00:00.000Z"
                    },
                    "situacao_especial":null,
                    "situacao_especial_data":null
                },
                {
                    "cnpj":"13397228000109",
                    "tipo":"MATRIZ",
                    "tipo_codigo":1,
                    "natureza_juridica_codigo":2062,
                    "natureza_juridica_descricao":"Sociedade Empresária Limitada",
                    "razao_social":"COMERCIAL CARVALHO LTDA",
                    "nome_fantasia":"COMERCIAL CARVALHO",
                    "situacao":"ATIVA",
                    "situacao_codigo":2,
                    "situacao_data_evento":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "situacao_motivo_codigo":0,
                    "situacao_motivo_descricao":"SEM MOTIVO",
                    "inicio_atividade":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "cnae_primario":4744001,
                    "cnaes_secundarios":[
                        1413401,
                        3314707,
                        4221903,
                        4321500,
                        4322302,
                        4511101,
                        4530703,
                        4530705,
                        4613300,
                        4642702
                    ],
                    "endereco":{
                        "tipo":"RUA",
                        "logradouro":"SAO JOAO",
                        "numero":"476",
                        "complemento":": D;",
                        "bairro":"CENTRO",
                        "cep":"65010600",
                        "uf":"MA",
                        "municipio_codigo":921,
                        "municipio":"SAO LUIS"
                    },
                    "telefone_ddd_1":"98",
                    "telefone_numero_1":"32210264",
                    "telefone_ddd_2":null,
                    "telefone_numero_2":null,
                    "email":null,
                    "telefones_repetidos":2,
                    "emails_repetidos":null,
                    "qualificacao_responsavel":49,
                    "capital_social":"100000,00",
                    "porte_codigo":1,
                    "porte":"MICRO EMPRESA",
                    "simples":false,
                    "simples_data_insercao":{
                        "formato_unix":1300417200000,
                        "formato_date":"2011-03-18T03:00:00.000Z"
                    },
                    "simples_data_exclusao":{
                        "formato_unix":1661914800000,
                        "formato_date":"2022-08-31T03:00:00.000Z"
                    },
                    "mei":false,
                    "mei_data_insercao":null,
                    "mei_data_exclusao":null,
                    "situacao_especial":null,
                    "situacao_especial_data":null,
                    "membros":[
                        {
                            "idade":"31 A 40",
                            "cpf":"***442243**",
                            "cnpj":null,
                            "identificador":"2",
                            "nome":"LEONARDO SOUSA DE CARVALHO",
                            "pais_codigo":null,
                            "qualificacao_codigo":49,
                            "data_entrada":{
                                "formato_unix":1300417200000,
                                "formato_date":"2011-03-18T03:00:00.000Z"
                            },
                            "representante_nome":null,
                            "representante_cpf":null,
                            "qualificacao_descricao":"Sócio-Administrador"
                        }
                    ]
                }
            ],
            "creditos":{
                "disponivel":18
            }
        }
        setCnpjs(res)
        setCredits(res.creditos.disponivel)

    }

    return (
        <form onSubmit={handleSubmit(handleFilterForm)} className='container border p-2'>
            <div className='row mb-3'>
                <div className="row col-md-6">
                    <div className='d-flex flex-column col-sm-6 mb-3'>
                        <label htmlFor="state">Estados</label>
                        <select
                            {...register("state")}
                            className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                            id="state"
                        >
                            <option value="">Selecione um estado</option>
                            {allStates.map(item => (
                                <option key={item.nome} value={item.nome}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                        {errors.state && (
                            <div className="invalid-feedback">
                                {errors.state.message}
                            </div>
                        )}
                    </div>

                    <div className='d-flex flex-column col-sm-6'>
                        <label htmlFor="municipality">Municípios</label>
                        <select
                            {...register("municipality")}
                            className={`form-control ${errors.municipality ? 'is-invalid' : ''}`}
                            id="municipality"
                            disabled={!selectedState || allMunicipalities.length === 0}
                        >
                            <option value="">
                                {selectedState ? "Selecione um município" : "Primeiro selecione um estado"}
                            </option>
                            {allMunicipalities.map(item => (
                                <option key={item.codigo} value={item.codigo}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                        {errors.municipality && (
                            <div className="invalid-feedback">
                                {errors.municipality.message}
                            </div>
                        )}
                    </div>

                    <div className='d-flex flex-column col-sm-6'>
                        <label className='label' htmlFor="key-words">Palavras chaves</label>
                        <fieldset name='key-words' className='d-flex flex-column form-control'>
                            <div>
                                <input
                                    {...register("keyWords.inCompanyName")}
                                    type="checkbox"
                                    id="in-company-name"
                                />
                                <label htmlFor="in-company-name">Na razão social</label>
                            </div>
                            <div>
                                <input
                                    {...register("keyWords.inFantasyName")}
                                    type="checkbox"
                                    id="in-fantasy-name"
                                />
                                <label htmlFor="in-fantasy-name">No nome fantasia</label>
                            </div>
                        </fieldset>
                    </div>

                    <div className='d-flex flex-column col-sm-6'>
                        <label htmlFor="search-term">Termos na busca</label>
                        <input
                            {...register("searchTerm")}
                            type='text'
                            className="form-control"
                            id="search-term"
                            placeholder="Digite os termos de busca"
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className='d-flex flex-column'>
                        <label htmlFor="cnaes">CNAEs</label>
                        <select
                            {...register("cnaes")}
                            className='form-control'
                            id="cnaes"
                            size={4}
                            multiple
                        >
                            <option value={4672900}>teste</option>
                            <option value={4744001}>teste1</option>
                            <option value={1099603}>teste2</option>
                            <option value={4912402}>teste3</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='row d-flex justify-content-center'>
                <button className='btn btn-primary' type='submit'>Filtrar</button>
                <p className='text-center'>{credits} créditos disponíveis</p>
            </div>
        </form>
    )
}