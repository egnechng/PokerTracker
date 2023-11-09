import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'

const API_URL = 'https://poker-tracker-backend.vercel.app'

const Home = () => {
    const [sessions, setSessions] = useState([])
    const [loading, setLoading] = useState(false)

    // This effect runs after every render (componentDidUpdate)
    useEffect(() => {
        setLoading(true)
        axios.get(API_URL + '/sessions')
            .then((res) => {
                setSessions(res.data.data)
                console.log('sessions', sessions)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            }) 
    }, [])
    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Sessions List</h1>
                <Link to='/sessions/add'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            { loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'>Game Type</th>
                            <th className='border border-slate-600 rounded-md'>Blinds</th>
                            <th className='border border-slate-600 rounded-md'>Location</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Duration</th>
                            <th className='border border-slate-600 rounded-md'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map((session, index) => (
                            <tr key={session._id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {index + 1}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {session.gameType}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {session.blinds}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {session.location}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {session.duration}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/sessions/details/${session._id}`}>
                                            <BsInfoCircle className='text-green-800 text-2xl' />
                                        </Link>
                                        <Link to={`/sessions/edit/${session._id}`}>
                                            <AiOutlineEdit className='text-yellow-600 text-2xl' />
                                        </Link>
                                        <Link to={`/sessions/delete/${session._id}`}>
                                            <MdOutlineDelete className='text-red-600 text-2xl' />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Home