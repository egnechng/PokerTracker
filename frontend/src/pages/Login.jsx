import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner.jsx'
import { useSnackbar } from 'notistack'
import BackButton from '../components/BackButton.jsx'
import authService from '../services/AuthService.jsx'

const Login = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const [loading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()

    const handleLogin = async () => {
        const { username, password } = formData
        setLoading(true)
        const userData = {
            username,
            password
        }
        try {
            const response = await authService.login(userData);
            console.log(response); // Handle the response from the server
            setLoading(false)
            enqueueSnackbar('Login Success', { variant: 'success' })
            navigate('/') // redirect to home
        } catch (error) {
            setLoading(false)
            enqueueSnackbar('Login Error: ' + error.response.data.message, { variant: 'error' })
            console.log('Login error', error);
        }
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    return (
         <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Login</h1>
            { loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <input 
                        type='text' 
                        value={formData.username}
                        placeholder='Username' 
                        name='username'
                        onChange={onChange}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />  
                </div>
                <div className='my-4'>
                    <input 
                    type='password' 
                    value={formData.password}
                    name='password'
                    placeholder='Password' 
                    onChange={onChange}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                    />  
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleLogin}>Login</button>
            </div>

        </div>
    )
}

export default Login