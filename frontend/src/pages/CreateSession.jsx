import React, { useState } from 'react'
import BackButton from '../components/BackButton.jsx'
import Spinner from '../components/Spinner.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const API_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const CreateSession = () => {
  // form stuff, states
  const today = new Date()
  const [date, setDate] = useState(today.toISOString().split('T')[0])
  const [gameType, setGameType] = useState('')
  const [blinds, setBlinds] = useState('')
  const [location, setLocation] = useState('')
  const [buyIn, setBuyIn] = useState('')
  const [cashOut, setCashOut] = useState('')
  const [duration, setDuration] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const handleSaveSession = () => {

    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      const config = {
          headers: {
              Authorization: `Bearer ${parsedUser.token}`
          }
      }
      const data = {
        gameType,
        blinds,
        location,
        buyIn,
        cashOut,
        duration,
        date
      }
      setLoading(true)
      axios.post(`${API_URL}/sessions`, data, config)
      .then(() => {
        setLoading(false)
        enqueueSnackbar('Session Added Successfully', { variant: 'success' })
        navigate('/') // redirect to home
      })
      .catch((error) => {
        setLoading(false)
        // alert('Error Occured. Check Console')
        enqueueSnackbar('Error: ' + error.response.data.message, { variant: 'error' })
        console.log(error)
      })

  } else {
      navigate('/login')
  }

  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Add Session</h1>
      { loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
        <div className='my-4'>
            <label className='text-x1 mr-4 text-gray-500'>Location</label>
            <input 
              type='text' 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />  
        </div>
        <div className='my-4'>
            <label className='text-x1 mr-4 text-gray-500'>Game</label>
            <select 
              value={gameType} 
              onChange={(e) => setGameType(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            >
              <option value=''></option>
              <option value='NLH'>NLH</option>
              <option value='PLO'>PLO</option>
              <option value='Mixed'>Mixed</option>
              <option value='Other'>Other</option>
            </select>
        </div>
        <div className='my-4'>
            <label className='text-x1 mr-4 text-gray-500'>Blinds</label>
            <input 
              type='text' 
              value={blinds} 
              onChange={(e) => setBlinds(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />  
        </div>
        <div className='my-4'>
            <label className='text-x1 mr-4 text-gray-500'>Buy In</label>
            <input 
              type='number' 
              value={buyIn} 
              onChange={(e) => setBuyIn(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />  
        </div>
        <div className='my-4'>
            <label className='text-x1 mr-4 text-gray-500'>Cash Out</label>
            <input 
              type='number' 
              value={cashOut} 
              onChange={(e) => setCashOut(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />  
        </div>
        <div className='my-4'>
            <label className='text-x1 mr-4 text-gray-500'>Date</label>
            <input 
              type='date' 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />  
        </div>
        <div className='my-4'>
            <label className='text-x1 mr-4 text-gray-500'>Duration</label>
            <input 
              type='number' 
              value={duration} 
              onChange={(e) => setDuration(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />  
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveSession}>Save</button>
      </div>
    </div>
  )
}

export default CreateSession