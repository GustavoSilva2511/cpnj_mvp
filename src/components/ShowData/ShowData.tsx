import { useState } from "react"
// import { CSVLink } from 'react-csv'
import * as XLSX from 'xlsx'
import type { object } from "zod"
interface Props {
  cnpjs: object
}

export default function ShowData({ cnpjs }: Props) {
    const [pagination, setPagination] = useState<number>(0)
    const [csvData, setCsvData] = useState<Array<object>>([])

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
        const processedData = cnpjs?.dados.map(item => ({
            "Cnpj": item.cnpj,
            "Razão Social": item.razao_social,
            "Enderço completo": `${item.endereco.tipo}, ${item.endereco.logradouro}, ${item.endereco.numero}, ${item.endereco?.complemento}, ${item.endereco.bairro}, ${item.endereco.municipio}, ${item.endereco.uf}, ${item.endereco.cep}`,
            "Membros": item.membros ? item.membros?.map(membro => `${membro.nome}, ${membro.qualificacao_descricao}`).join(' | '): ""
        }))
        const workbook = XLSX.utils.book_new();

        // Converter JSON para worksheet
        const worksheet = XLSX.utils.json_to_sheet(processedData);

        // Adicionar o worksheet ao workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados');

        // Gerar o arquivo e fazer download
        const fileName = `dados_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    };


    // const fileName = "cnpjs-export.csv"
    // const headers = [
    //     {label: "cnpj", key:"cnpj"},
    //     {label: "name", key:"name"},
    // ]

    return (
        <>
            <div className='container bg-light rounded mb-2 p-2 border'>
                <div className='w-100 d-flex justify-content-end m-2'>
                    <button
                        className='btn btn-primary m-2 btn-sm'
                        onClick={exportToExcel}
                    >exportar
                        {/* <CSVLink
                            headers={headers}
                            data={csvData}
                            filename={fileName}
                            style={{ "textDecoration": "none", "color": "#fff" }}
                        >Exportar
                        </CSVLink> */}
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
                        {cnpjs.dados?.slice((pagination*paginationSize), (pagination*paginationSize)+paginationSize).map((item: any, index: number, ) => (
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