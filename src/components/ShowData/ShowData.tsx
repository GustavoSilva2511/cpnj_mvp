import { useState } from "react"
// import { CSVLink } from 'react-csv'
import * as XLSX from 'xlsx'
import type { BuscarResponse } from "../../types/BuscarResponse"
import type { Dado } from '../../types/BuscarResponse';
interface Props {
    cnpjs: BuscarResponse
}

export default function ShowData({ cnpjs }: Props) {
    const [pagination, setPagination] = useState<number>(0)

    const paginationSize: number = 20
    const decrement = () => {
        if (pagination > 0) {
            setPagination(pagination-1)
        }
    }

    const increment = () => {
        if (pagination < cnpjs.dados?.length/10 - 1) {
            setPagination(pagination+1)
        }
    }

    const exportToExcel = () => {
        if (cnpjs.dados?.length === 0) {
            alert('Nenhum dado para exportar!');
            return;
        }
        console.log(cnpjs)
        const processedData = cnpjs.dados.map((item: Dado) => ({
            "Cnpj": item.cnpj,
            "Razão Social": item.razao_social,
            "Enderço completo": `${item.endereco?.tipo}, ${item.endereco?.logradouro}, ${item.endereco?.numero}, ${item.endereco?.complemento}, ${item.endereco?.bairro}, ${item.endereco?.municipio}, ${item.endereco.uf}, ${item.endereco.cep}`,
            "Membros": item.membros ? item.membros?.map(membro => `${membro.nome}, ${membro.qualificacao_descricao}`).join(' | '): ""
        }))
        const workbook = XLSX.utils.book_new();

        const worksheet = XLSX.utils.json_to_sheet(processedData);

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados');

        const fileName = `dados_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    };


    return (
        <>
            <div className='container bg-light rounded mb-2 p-2 border'>
                <div className='w-100 d-flex justify-content-end m-2'>
                    <button
                        className='btn btn-primary m-2 btn-sm'
                        onClick={exportToExcel}
                    >exportar
                    </button>
                </div>
                <table className='table table-sm table-hover table-striped table-bordered'>
                    <thead>
                        <tr>
                        <th scope='col'>N°</th>
                        <th scope='col'>Cnpj</th>
                        <th scope='col'>Razao social</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cnpjs.dados?.slice((pagination*paginationSize), (pagination*paginationSize)+paginationSize).map((item: Dado, index: number, ) => (
                        <tr key={index}>
                            <th scope='row'>{index+(pagination*paginationSize)+1}</th>
                            <td>{item.cnpj}</td>
                            <td>{item.razao_social}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <div className='d-flex justify-content-center input-group'>
                    <button className='input-group-text' onClick={() => decrement()}>{"<"}</button>
                    <button className='input-group-text'>{(pagination*paginationSize)+1} - {(pagination*paginationSize)+paginationSize}</button>
                    <button className='input-group-text' onClick={() => increment()}>{">"}</button>
                </div>
            </div>
        </>
    )
}