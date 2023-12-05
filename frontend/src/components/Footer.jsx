import React, { useEffect, useState } from 'react'

const Footer = () => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            setUser(parsedUser)
        }
        
    }, [])

    return (
        <div className='p-4'>
            <h1>
            Poker Income Tracker (Created by: Eugene Chang)
            </h1>
        </div>
        
    )
}

export default Footer