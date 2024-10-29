import React, { useEffect, useState } from 'react'
import ReservationApi from '../apis/ReservationApi'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ReservationCard from '../componets/ReservationCard'

const ReservationsByUser = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [reservation, setReservation] = useState<ReservationResponse[] | null>(null)
    useEffect(() => {
        if (!id || isNaN(+id)) {
            navigate('/')
        }
        (async () => {
            if (id) {
                const [error, data] = await ReservationApi.getReservationsById(+id)
                if (error) {
                    // @ts-ignore
                    toast.error(error.response?.data.message)
                    return
                }
                setReservation(data)

            }
        })()
    }, [])
    return (
        <div className='flex items-center gap-4 justify-between max-w-5xl mx-auto'>
            {
                reservation && reservation.length !== 0 && reservation.map((reservation) => (
                    <ReservationCard key={reservation.id} reservation={reservation} />
                ))


            }

        </div>
    )
}

export default ReservationsByUser