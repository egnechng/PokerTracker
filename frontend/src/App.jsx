import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ShowSession from './pages/ShowSession.jsx'
import EditSession from './pages/EditSession.jsx'
import CreateSession from './pages/CreateSession.jsx'
import DeleteSession from './pages/DeleteSession.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sessions/add' element={<CreateSession />} />
      <Route path='/sessions/details/:id' element={<ShowSession />} />
      <Route path='/sessions/edit/:id' element={<EditSession />} />
      <Route path='/sessions/delete/:id' element={<DeleteSession />} />
    </Routes>
  )
}

export default App