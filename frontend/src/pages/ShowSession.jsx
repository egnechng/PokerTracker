import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton.jsx'
import Spinner from '../components/Spinner.jsx'
import { useSnackbar } from 'notistack'

const API_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const ShowSession = () => {
    const [session, setSession] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const { id } = useParams() 

    const formattedDate = session.date ? session.date.split('T')[0] : ''
    const createdAt = session.createdAt ? new Date(session.createdAt).toString().split(" ") : []
    const createAtDate = createdAt[0] + " " + createdAt[1] + " " + createdAt[2] + " " + createdAt[3] + " " + createdAt[4]

    useEffect(() => {
        setLoading(true)
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            const config = {
                headers: {
                    Authorization: `Bearer ${parsedUser.token}`
                }
            }
            console.log('id is:', id)
            axios.get(`${API_URL}/sessions/${id}`, config)
                .then((res) => {
                    setSession(res.data) // res.data or res.data.data?
                    setLoading(false)
                }).catch((error) => {
                    setLoading(false)
                    console.log('error here', error)
                    enqueueSnackbar('Error: ' + error.response.data.message, { variant: 'error' })
                    navigate('/')
            })  
        } else{
            navigate('/login')
        }
        
    }, []) 

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Session Details</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-x1 mr-4 text-gray-500'>Date</span>
                        <span>{formattedDate}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-x1 mr-4 text-gray-500'>Location</span>
                        <span>{session.location}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-x1 mr-4 text-gray-500'>Game</span>
                        <span>{session.gameType}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-x1 mr-4 text-gray-500'>Blinds</span>
                        <span>{session.blinds}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-x1 mr-4 text-gray-500'>Buy In</span>
                        <span>{session.buyIn}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-x1 mr-4 text-gray-500'>Cash Out</span>
                        <span>{session.cashOut}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-x1 mr-4 text-gray-500'>P/L</span>
                        <span className={`${session.cashOut - session.buyIn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {session.cashOut - session.buyIn > 0 ? '+$' : '-$'}
                        {Math.abs(session.cashOut - session.buyIn).toLocaleString()}
                        </span>
                    </div>
                    <div className='my-4'>
                        <span className='text-x1 mr-4 text-gray-500'>Duration</span>
                        <span>{session.duration}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-x1 mr-4 text-gray-500'>Create Time</span>
                        <span>{createAtDate}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShowSession