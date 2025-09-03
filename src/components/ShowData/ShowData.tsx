import { useEffect, useState } from "react"
import { CSVLink } from 'react-csv'
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

    const fileName = "cnpjs-export.csv"
    const headers = [
        {label: "cnpj", key:"cnpj"},
        {label: "name", key:"name"},
    ]

    useEffect(() => {
        const dados: Array<object> = []
        cnpjs.dados?.map((item) => {
            dados.push({
                cnpj: item.cnpj,
                name: item.razao_social
            })
        })
        setCsvData(dados)
    }, [cnpjs])

    return (
        <>
            <div className='container border input-group p-2 '>
                <div className='w-100 d-flex justify-content-end m-2'>
                    <button className='btn btn-primary'>
                        <CSVLink
                            headers={headers}
                            data={csvData}
                            filename={fileName}
                            style={{ "textDecoration": "none", "color": "#fff" }}
                        >Export
                        </CSVLink>
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