import './App.css'
import Header from './components/Header/Header'
import ConsultFilter from './components/ConsultFilter/ConsultFilter'

function App() {
  return (
    <>
      <Header
        title="Consulta de CNPJ"
      ></Header>
      <ConsultFilter />  
      <div>
        result
      </div>
    </>
  )
}

export default App
