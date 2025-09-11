import './ConsultFilter.css'
import { useEffect, useMemo, useState } from 'react'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Cnaes } from '../../types/Cnae'
import { getCnaes } from '../../services/CnaesService'
import React from 'react'
import { getCredits } from '../../services/CreditsService'
import { MunicipalityForm } from '../MunicipalityForm/MunicipalityForm'
import type { MunicipalityFilters } from '../../types/MunicipalityFilters'
import type { BuscarResponse } from '../../types/BuscarResponse'


const schema = z.object({
    states: z.array(z.string()).optional(),
    municipalities: z.array(z.string()).optional(),
    keyWords: z.object({
        inCompanyName: z.boolean().optional(),
        inFantasyName: z.boolean().optional()
    }).optional(),
    searchTerm: z.string().optional(),
    cnaes: z.array(z.string()).optional()
})

type FormData = z.infer<typeof schema>

interface Props {
    setCnpjs: React.Dispatch<React.SetStateAction<object>>;
};

export default function ConsultFilter({ setCnpjs }: Props) {
    const [allCnaes, setAllCnaes] = useState<Cnaes>([])
    const [credits, setCredits] = useState<number>(0)

    const [municipalityFilters, setMunicipalityFilters ] = useState<MunicipalityFilters>([])
    const [selectedCnaes, setSelectedCenaes] = useState<Array<string>>([])

    const [apiLimitSize, setApiLimitSize] = useState<string>("")

    const {
        register,
        handleSubmit,
        setValue
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            states: [],
            municipalities: [],
            keyWords: {
                inCompanyName: false,
                inFantasyName: false
            },
            searchTerm: "",
            cnaes: []
        }
    })

    const removeMunicipalityFilter = (id: string) => {
        setMunicipalityFilters(municipalityFilters.filter(m => m.id != id))
    }

    const handleCheckboxChange = (optionId: string) => {
        setSelectedCenaes(prev => {
            if (prev.includes(optionId)) {
                return prev.filter(id => id !== optionId);
            } else {
                return [...prev, optionId];
            }
        });
    };

    // Carrega estados na inicialização
    useEffect(() => {
        getCnaes().then(data => setAllCnaes(data))
        getCredits().then(data => setCredits(data))
    }, [])

    useEffect(() => {
        setValue("cnaes", selectedCnaes)
    }, [selectedCnaes, setValue])

    useEffect(() => {
        setValue("states", municipalityFilters.map(m => m.state))
        setValue("municipalities", municipalityFilters.map(m => m.code))
    }, [municipalityFilters, setValue])

    // Filtra municípios quando o estado muda

    const handleFilterForm = (data: FormData) => {
        console.log("Dados do formulário:", data)
        const url = 'https://api.listacnae.com.br/v1/buscar';
        const bearerToken = import.meta.env.VITE_TOKEN_API
        const stfy = JSON.stringify;
        const terms = []
        if (data.keyWords?.inCompanyName) {
            terms.push({tipo: 'R', termo: data.searchTerm})
        }
        if (data.keyWords?.inFantasyName) {
            terms.push({tipo: 'F', termo: data.searchTerm})
        }
        const json = {
            inicio: "0",
            quantidade: apiLimitSize,
            email_obrigatorio: "false",
            simples_nacional: "false",
            termos_de_busca: stfy(terms),
            somente_matrizes: "true",
            data_inicio: "01/01/2000",
            data_fim: "01/01/2025",
            estados: stfy(data.states?.map((e) => e)),
            incluir_cnaes_secundarios: "false",
            cnaes: stfy(data.cnaes?.map((e) => parseInt(e))),
            municipios: stfy(data.municipalities?.map((e) => parseInt(e)))
        };

        const q = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${bearerToken}`
            }
        };
        const u = `${url}?${new URLSearchParams(json).toString()}`;
        fetch(u,q).then(r => r.json()).then(dados => {
            const res: BuscarResponse = dados
            setCnpjs(res)
            setCredits(res.creditos.disponivel)
        }).catch(erro => {
            console.log(erro);
        })
        // const res: BuscarResponse = {
        //     "mensagem":"Sucesso ao capturar dados solicitados.",
        //     "inicio":0,
        //     "quantidade_solicitada":2,
        //     "quantidade_encontrada":199,
        //     "quantidade_retornada":2,
        //     "identificador_busca":"5MUHVK6PGSEOS8E0TE760WNJRC6ELANM",
        //     "dados":[
        //         {
        //             "cnpj":"24899258000130",
        //             "tipo":"MATRIZ",
        //             "tipo_codigo":1,
        //             "natureza_juridica_codigo":2135,
        //             "natureza_juridica_descricao":"Empresário (Individual)",
        //             "razao_social":"ELISEU MAGNO ALMEIDA ARAUJO DIAS 71481010344",
        //             "nome_fantasia":null,
        //             "situacao":"ATIVA",
        //             "situacao_codigo":2,
        //             "situacao_data_evento":{
        //                 "formato_unix":1464663600000,
        //                 "formato_date": "2016-05-31T03:00:00.000Z"
        //             },
        //             "situacao_motivo_codigo":0,
        //             "situacao_motivo_descricao":"SEM MOTIVO",
        //             "inicio_atividade":{
        //                 "formato_unix":1464663600000,
        //                 "formato_date":"2016-05-31T03:00:00.000Z"
        //             },
        //             "cnae_primario":4744001,
        //             "cnaes_secundarios":[
        //                 4732600,
        //                 4742300,
        //                 4541206,
        //                 4744099
        //             ],
        //             "endereco":{
        //                 "tipo":"AVENIDA",
        //                 "logradouro":"ACRE",
        //                 "numero":"48",
        //                 "complemento":null,
        //                 "bairro":"CHACARA BRASIL",
        //                 "cep":"65066841",
        //                 "uf":"MA",
        //                 "municipio_codigo":921,
        //                 "municipio":"SAO LUIS"
        //             },
        //             "telefone_ddd_1":"98",
        //             "telefone_numero_1":"31997673",
        //             "telefone_ddd_2":null,
        //             "telefone_numero_2":null,
        //             "email":"maranhaoparafusos@gmail.com",
        //             "telefones_repetidos":2,
        //             "emails_repetidos":1,
        //             "qualificacao_responsavel":50,
        //             "capital_social":"5000,00",
        //             "porte_codigo":1,
        //             "porte":"MICRO EMPRESA",
        //             "simples":false,
        //             "simples_data_insercao":{
        //                 "formato_unix":1464663600000,
        //                 "formato_date":"2016-05-31T03:00:00.000Z"
        //             },
        //             "simples_data_exclusao":{
        //                 "formato_unix":1703991600000,
        //                 "formato_date":"2023-12-31T03:00:00.000Z"
        //             },
        //             "mei":false,
        //             "mei_data_insercao":{
        //                 "formato_unix":1464663600000,
        //                 "formato_date":"2016-05-31T03:00:00.000Z"
        //             },
        //             "mei_data_exclusao":{
        //                 "formato_unix":1703991600000,
        //                 "formato_date":"2023-12-31T03:00:00.000Z"
        //             },
        //             "situacao_especial":null,
        //             "situacao_especial_data":null
        //         },
        //     ],
        //     "creditos":{
        //         "disponivel":18
        //     }
        // }
        // setCnpjs(res)
        // setCredits(res.creditos.disponivel)

    }

    const [filterText, setFilterText] = useState('');

    // Filtrar os CNAEs baseado no texto digitado
    const filteredCnaes = useMemo(() => {
        if (!filterText.trim()) {
            return allCnaes;
        }
        return allCnaes?.filter(item =>
            item.descricao.toLowerCase().includes(filterText.toLowerCase()) ||
            String(item.codigo).includes(filterText)
        );
    }, [allCnaes, filterText]);

    return (
        <div className='container bg-light rounded mt-1 mb-1 p-2 border'>
            <div className='container bg-light rounded mt-1 p-2'>
                <MunicipalityForm
                    municipalityFilters={municipalityFilters}
                    setMunicipalityFilters={setMunicipalityFilters}
                />
                <ul className='list-group'>
                    {municipalityFilters.map(item => (
                        <li
                            key={item.id}
                            className='list-group-item d-flex justify-content-between'>{item.description} ({item.state})
                            <button
                                onClick={() => removeMunicipalityFilter(item.id)}
                                className='btn btn-danger'
                            >-</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='container'>
                <div className='d-flex flex-column mb-2 p-2 border'>
                    <div className="row col-sm-12 ">
                        <div className='d-flex flex-column col-sm-12 col-md-6'>
                            <label className='label' htmlFor="key-words">Palavras chaves</label>
                            <fieldset name='key-words' className='d-sm-flex flex-sm-column s-md-flex flex-md-row justify-content-around form-control align-center'>
                                <div className='d-flex in-company-name align-center'>
                                    <input
                                        {...register("keyWords.inCompanyName")}
                                        type="checkbox"
                                        id="in-company-name"
                                    />
                                    <label htmlFor="in-company-name">Na razão social</label>
                                </div>
                                <div className='d-flex in-fantasy-name align-center'>
                                    <input
                                        {...register("keyWords.inFantasyName")}
                                        type="checkbox"
                                        id="in-fantasy-name"
                                    />
                                    <label htmlFor="in-fantasy-name">No nome fantasia</label>
                                </div>
                            </fieldset>
                        </div>

                        <div className='d-flex flex-column col-sm-12 col-md-6'>
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
                </div>

                <div className="d-flex flex-column mb-2 p-2 border">
                    <label htmlFor="limit">Limite por requisição: <input className='form-control' type="number" onChange={(e) => setApiLimitSize(e.target.value)} value={apiLimitSize}/></label>
                    <input
                        className='form-range'
                        type="range"
                        min="1"
                        max="1000"
                        value={apiLimitSize}
                        id="limit-size"
                        name="limit-size"
                        onChange={(e) => setApiLimitSize(e.target.value)}
                    />
                </div>

                <div className='d-flex mb-2 p-2 border'>
                    <div className="col-sm-12 h-50">
                        <div className='d-flex flex-column m-1'>
                            <label htmlFor="cnaes">CNAEs</label>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Filtrar CNAEs por descrição ou código..."
                                    value={filterText}
                                    onChange={(e) => setFilterText(e.target.value)}
                                />
                            </div>
                            <div
                                className='list-group cnaes-list'
                                id="cnaes"
                                style={{ maxHeight: '300px', overflowY: 'auto' }}
                            >
                                {filteredCnaes?.map(item => (
                                    <label key={item.codigo} className="d-flex list-group-item">
                                        <input
                                            type="checkbox"
                                            className="me-2"
                                            checked={selectedCnaes.includes(String(item.codigo))}
                                            onChange={() => handleCheckboxChange(String(item.codigo))}
                                        />
                                        <span>
                                            <strong>{item.codigo}</strong> - {item.descricao}
                                        </span>
                                    </label>
                                ))}
                                {filteredCnaes?.length === 0 && (
                                    <div className="list-group-item text-muted text-center">
                                        Nenhum CNAE encontrado para o filtro "{filterText}"
                                    </div>
                                )}
                            </div>
                            <small className="text-muted mt-1">
                                Mostrando {filteredCnaes?.length || 0} de {allCnaes?.length || 0} CNAEs
                            </small>
                        </div>
                    </div>
                </div>

                <div className='row d-flex justify-content-center'>
                    <button
                        className='btn btn-primary'
                        onClick={handleSubmit(handleFilterForm)}
                    >Filtrar</button>
                    <p className='text-center'>{credits} créditos disponíveis</p>
                </div>
            </div>
        </div>
    )
}