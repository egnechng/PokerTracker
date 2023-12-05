import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner.jsx'
import { useSnackbar } from 'notistack'
import BackButton from '../components/BackButton.jsx'
import authService from '../services/AuthService.jsx'

const Login = () => {

    const [loading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()

    const handleLogout = async () => {
        setLoading(true)
        try {
            const response = authService.logout();
            console.log(response); // Handle the response from the server
            setLoading(false)
            enqueueSnackbar('Logout Success', { variant: 'success' })
            navigate('/login') 
        } catch (error) {
            setLoading(false)
            enqueueSnackbar('Logout Error: ' + error.response.data.message, { variant: 'error' })
            console.log('Logout error', error);
        }

    }

    return (
         <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Log Out</h1>
            { loading ? <Spinner /> : ''}
            <div className='flex flex-col items-center border-2 border-sky-400 rounded-x1 w-[600px] p-8 mx-auto'>
                <h3 className='text-2xl'>Are you sure you want to logout?</h3>
                <button className='p-4 bg-red-600 text-white m-8 w-full'
                    onClick={handleLogout}
                >
                   Log Out
                </button>
            </div>
        </div>
    )
}

export default Login