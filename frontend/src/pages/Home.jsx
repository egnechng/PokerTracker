import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { MdPostAdd } from "react-icons/md";
import Table from '../components/home/Table'
import Card from '../components/home/Card'

const API_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const Home = () => {
    const [sessions, setSessions] = useState([])
    const [loading, setLoading] = useState(false)
    const [showType, setShowType] = useState('table')
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const sortedSessions = sessions
        .slice() // Create a copy to avoid mutating the original array
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    const bankroll = sessions.reduce((a, b) => a + (b.cashOut - b.buyIn), 0)
    // This effect runs after every render (componentDidUpdate)
    useEffect(() => {
        setLoading(true)

        // check if user logged in, if not redirected to login
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            console.log(parsedUser)
            setUser(parsedUser)
            const config = {
                headers: {
                    Authorization: `Bearer ${parsedUser.token}`
                }
            }
            axios.get(API_URL + '/sessions', config)
            .then((res) => {
                setSessions(res.data.data)
                console.log('sessions', sessions)
                
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    
        } else {
            navigate('/login')
        }
       
    }, [])
    return (
        <div className='p-4'>
            <div className='flex justify-center items-center gap-x-4'>
                
                <button className='bg-sky-300 hover:bg-sky-600 py-1 px-4 rounded-lg'
                    onClick={() => setShowType('table')}
                >Table</button>
                <button className='bg-sky-300 hover:bg-sky-600 py-1 px-4 rounded-lg'
                    onClick={() => setShowType('card')}
                >Card</button>
            </div>
            <div className='flex justify-end items-center'>
                {user ? (
                <span className='text-sm mr-3'>Logged in as: {user.username}</span>
                ) : (
                <span className='text-sm mr-3'>Welcome</span>
                )}
            </div>
            <div className='flex justify-end items-center'>
                <span className='text-sm mr-3'>Total Bankroll: {bankroll >= 0 ? '' : '-'}${Math.abs(bankroll)}</span>
            </div>
            <div className='flex justify-between items-center'>
                <h2 className='text-3xl my-3 float-left'>My Sessions</h2>
                <div>
                    <Link to='/sessions/add' className='flex items-center'>
                        <h2 className='text-sky-800 text-2xl'>Add Session</h2>
                        <MdPostAdd className='text-sky-800 text-4xl ' />
                    </Link>
                </div>
                
            </div>
            {loading ? <Spinner /> : showType === 'table' ? (<Table sortedSessions={sortedSessions} />) 
            : (<Card sortedSessions={sortedSessions} />)}
        </div>
    )
}

export default Home