import './ConsultFilter.css'
import React, { useEffect, useState} from 'react'
import { getMunicipalities, getStates } from '../../services/MunicipalityService'
import type { Municipalities } from '../../types/Municipality'
import type { States } from '../../types/State'

export default function ConsultFilter() {
    const [allMunicipalities, setAllMunicipalities] = useState<Municipalities>([])
    const [allStates, setAllStates] = useState<States>(getStates())
    const [selectedState, setSelectedState] = useState<string>("")
    
    useEffect(() => {
        setAllStates(getStates())
        setAllMunicipalities([])
    }, [])

    const handleStateChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const state = event.target.value
        setSelectedState(state)
        getMunicipalities(state).then(municipalities => {
            setAllMunicipalities(municipalities)
        })

    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(event.target)
        console.log('Formulário enviado')
    }

    return (
        <form onSubmit={handleSubmit} className='container'>
            <div className='row mb-3'>
                <div className="row col-md-6">
                    <div className='d-flex flex-column col-sm-6'>
                        <label htmlFor="state">Estados</label>
                        <select
                            onChange={handleStateChange}
                            className="form-control" 
                            name="state" 
                            id="state"
                            value={selectedState}
                        >
                            {allStates.map(item => (
                                <option key={item.nome} value={item.nome}>{item.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className='d-flex flex-column col-sm-6'>
                        <label htmlFor="minitipities">Municipios</label>
                        <select 
                            className="form-control"
                            name="municipities" 
                            id="municipities"
                        >
                            {allMunicipalities.map(item => (
                                <option key={item.codigo} value={item.codigo}>{item.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className='d-flex flex-column col-sm-6'>
                        <label className='label' htmlFor="key-words">Palavras chaves</label>
                            <fieldset  name='key-words' className='d-flex flex-column form-control'>
                                <div>
                                    <input type="checkbox" name="in-company-name" id="in-company-name" />
                                    <label htmlFor="in-company-name">Na razão social</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="in-fantasy-name" id="in-fantasy-name" />
                                    <label htmlFor="in-fantasy-name">No nome fantasia</label>
                                </div>
                            </fieldset>
                    </div>
                    <div className='d-flex flex-column col-sm-6'>
                        <label htmlFor="search-term">Termos na busca</label>
                        <input type='text' className="form-control" name="search-term" id="search-term"/>
                    </div>

                </div>
                <div className="col-md-6">
                    <div className='d-flex flex-column'>
                        <label htmlFor="cnaes">CNAEs</label>
                        <select  className='form-control' name="cnaes" id="cnaes" size={4} multiple>
                            <option value="teste">teste</option>
                            <option value="teste1">teste1</option>
                            <option value="teste2">teste2</option>
                            <option value="teste3">teste3</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className='col-md-6'>
                    <input type="text" className="form-control" />
                </div>
            </div>
            <div className='row d-flex justify-content-center'>
                <button className='btn btn-primary' type='submit'>Filtrar</button>
                <p className='text-center'>20 creditos disponiveis</p>
            </div>
        </form>
    )
}