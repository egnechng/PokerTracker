import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ShowSession from './pages/ShowSession.jsx'
import EditSession from './pages/EditSession.jsx'
import CreateSession from './pages/CreateSession.jsx'
import DeleteSession from './pages/DeleteSession.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Logout from './pages/Logout.jsx'

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sessions/add' element={<CreateSession />} />
        <Route path='/sessions/details/:id' element={<ShowSession />} />
        <Route path='/sessions/edit/:id' element={<EditSession />} />
        <Route path='/sessions/delete/:id' element={<DeleteSession />} />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
      <Footer />
    </div>
    
  )
}

export default App