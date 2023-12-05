import axios from 'axios'

const API_URL = import.meta.env.VITE_REACT_APP_BASE_URL

// register user
const register = async (userData) => {
    const res = await axios.post(`${API_URL}/auth/register`, userData)

    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}

// login user
const login = async (userData) => {
    const res  = await axios.post(`${API_URL}/auth/login`, userData)

    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}

// logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout
}

export default authService