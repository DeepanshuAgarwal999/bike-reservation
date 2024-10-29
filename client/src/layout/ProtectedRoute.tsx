import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isAuthenticated } = useAuth()!;
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated])
    return (
        <div>
            {children}
        </div>
    )
}

export default ProtectedRoute