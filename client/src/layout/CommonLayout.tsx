import React from 'react'
import Navbar from '../componets/shared/Navbar'

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=''>
            <Navbar />
            <main className='pt-20'>
                {children}
            </main>
        </div>
    )
}

export default CommonLayout