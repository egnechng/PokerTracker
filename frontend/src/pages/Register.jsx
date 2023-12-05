import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner.jsx'
import { useSnackbar } from 'notistack'
import BackButton from '../components/BackButton.jsx'
import authService from '../services/AuthService.jsx'

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })

    const [loading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()

    const handleRegister = async () => {
        const { username, email, password, password2 } = formData
        setLoading(true)
        if (password !== password2) {
            enqueueSnackbar('Passwords do not match.', { variant: 'error' })
            setLoading(false)
        } else {
            const userData = {
                username,
                email,
                password
            }

            try {
                const response = await authService.register(userData);
                console.log(response); // Handle the response from the server
                setLoading(false)
                enqueueSnackbar('Registration Success', { variant: 'success' })
                navigate('/') // redirect to home
            } catch (error) {
                setLoading(false)
                enqueueSnackbar('Registration Error: ' + error.response.data.message, { variant: 'error' })
                console.log('Registration error', error);
            }
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
            <h1 className='text-3xl my-4'>Register</h1>
            { loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <input 
                        type='text' 
                        value={formData.username}
                        placeholder='Enter username' 
                        name='username'
                        onChange={onChange}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />  
                </div>
                <div className='my-4'>
                    <input 
                        type='email' 
                        value={formData.email}
                        name='email'
                        placeholder='Enter email' 
                        onChange={onChange}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />  
                </div>
                <div className='my-4'>
                    <input 
                    type='password' 
                    value={formData.password}
                    name='password'
                    placeholder='Enter password' 
                    onChange={onChange}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                    />  
                </div>
                <div className='my-4'>
                    <input 
                    type='password' 
                    value={formData.password2}
                    name='password2'
                    placeholder='Re-enter password' 
                    onChange={onChange}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                    />  
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleRegister}>Register</button>
            </div>

        </div>

  )
}

export default Register