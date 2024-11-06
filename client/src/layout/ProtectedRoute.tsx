import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isAuthenticated, hasUserFetched } = useAuth()!;
    const navigate = useNavigate()
    console.log({ user, isAuthenticated })

    useEffect(() => {
        debugger
        if (!isAuthenticated && !user && hasUserFetched) {
            navigate('/login')
        }
    }, [user, isAuthenticated])

    return (
        <div>
            {children}
        </div>
    )
}

export default ProtectedRoute