import './App.css'
import Header from './components/Header/Header'
import ConsultFilter from './components/ConsultFilter/ConsultFilter'
import ShowData from './components/ShowData/ShowData'
import { useEffect, useState } from 'react'

function App() {
  const [cnpjs, setCnpjs] = useState<any>({})

  useEffect(() => {
    console.log(cnpjs)
  }, [cnpjs])
  return (
    <>
      <Header
        title="Consulta de CNPJ"
      />
      <div className='d-flex flex-column'>
        <ConsultFilter
          setCnpjs={setCnpjs}
        />
        <ShowData
          cnpjs={cnpjs}
        />
      </div>
    </>
  )
}

export default App
