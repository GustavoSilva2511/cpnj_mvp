import './MunicipalityFilter.css'
import React, { useEffect, useState } from "react"
import type{ States } from "../../types/State"
import type { Municipalities } from "../../types/Municipality"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { getMunicipalities, getStates } from "../../services/MunicipalityService"
import type { MunicipalityFilters } from '../../types/MunicipalityFilters';

const schema = z.object({
    state: z.string().min(1, "Estado é obrigatório"),
    municipality: z.string().min(1, "Municipio é obrigatório")
})

type FormData = z.infer<typeof schema>

type Props = {
    municipalityFilters: MunicipalityFilters,
    setMunicipalityFilters: React.Dispatch<React.SetStateAction<MunicipalityFilters>>
}

export function MunicipalityForm({ municipalityFilters, setMunicipalityFilters }: Props) {
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
            municipality: ""
        }
    })

    const selectedState = watch("state")

    const [allStates, setAllStates] = useState<States>([])
    const [allMunicipalities, setAllMunicipalities] = useState<Municipalities>([])

    const handleFilterForm = (data: FormData) => {
        let description = ""
        allMunicipalities.map(item => {
            if (String(item.codigo) == data.municipality) {
                description = item.nome
            }
        })
        const filter = {
            id: String(Date.now()),
            state: data.state,
            description: description,
            code: data.municipality,
        }
        setMunicipalityFilters([...municipalityFilters, filter])
        setValue('municipality', '')
        setValue('state', "")
    }

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
        setValue('municipality', '')
    }, [selectedState, setValue])

    useEffect(()=> {
        setAllStates(getStates())
    }, [])
    return (
        <div className="d-flex flex-column mb-2 p-2 border">
            <div className="row d-flex align-center">
                <div className="col-sm-12 row">
                    <div className='col-sm-12 col-md-5 mb-3'>
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

                    <div className='col-sm-12 col-md-5 mb-3'>
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
                                <option key={item.codigo} value={String(item.codigo)}>
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
                    <div className="d-flex justify-content-center col-sm-12 col-md-2">
                        <button onClick={handleSubmit(handleFilterForm)} className="btn btn-primary m-3">+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}