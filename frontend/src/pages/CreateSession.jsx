import React, { useState } from 'react'
import BackButton from '../components/BackButton.jsx'
import Spinner from '../components/Spinner.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API_URL = 'https://poker-tracker-backend.vercel.app'

const CreateSession = () => {
  // form stuff, states
  const [gameType, setGameType] = useState('')
  const [blinds, setBlinds] = useState('')
  const [location, setLocation] = useState('')
  const [duration, setDuration] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const handleSaveSession = () => {
    const data = {
      gameType,
      blinds,
      location,
      duration,
    }
    setLoading(true)
    axios.post(API_URL + '/sessions', data)
      .then(() => {
        setLoading(false)
        navigate('/') // redirect to home
      })
      .catch((error) => {
        setLoading(false)
        alert('Error Occured. Check Console')
        console.log(error)
      })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Add Session</h1>
      { loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
        <div className='my-4'>
            <label className='text-x1 mr-4 text-gray-500'>Game Type</label>
            <input 
              type='text' 
              value={gameType} 
              onChange={(e) => setGameType(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />  
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
            <label className='text-x1 mr-4 text-gray-500'>Location</label>
            <input 
              type='text' 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
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