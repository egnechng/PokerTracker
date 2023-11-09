import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton.jsx'
import Spinner from '../components/Spinner.jsx'

const API_URL = 'http://localhost:5555'

const ShowSession = () => {
    const [session, setSession] = useState([])
    const [loading, setLoading] = useState(false)
    const { id } = useParams() 

    useEffect(() => {
        setLoading(true)
        console.log('id is:', id)
        axios.get(API_URL + `/sessions/${id}`)
            .then((res) => {
                setSession(res.data) // res.data or res.data.data?
                setLoading(false)
            }).catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }, []) 

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Show Session</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-x1 mr-4 text-gray-500'>ID</span>
                        <span>{session._id}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-x1 mr-4 text-gray-500'>Game Type</span>
                        <span>{session.gameType}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-x1 mr-4 text-gray-500'>Blinds</span>
                        <span>{session.blinds}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-x1 mr-4 text-gray-500'>Location</span>
                        <span>{session.location}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-x1 mr-4 text-gray-500'>Duration</span>
                        <span>{session.duration}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-x1 mr-4 text-gray-500'>Create Time</span>
                        <span>{new Date(session.createdAt).toString()}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShowSession