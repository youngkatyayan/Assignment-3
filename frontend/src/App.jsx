import { Route, Routes } from 'react-router-dom'
import './App.css'
import RegistrationForm from './pages/RegistrationForm.jsx'
import AddVoterForm from './pages/AddVoterForm.jsx'
import Testing from './pages/Testing.jsx'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' exact  element={<Testing />} />
        <Route path='/add' exact  element={<AddVoterForm />} />
        <Route path='/registration' exact element={<RegistrationForm />} />
      </Routes>
    </>
  )
}

export default App
