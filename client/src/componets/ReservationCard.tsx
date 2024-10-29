import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { formatReadableDate } from '../lib/utils'
import { useAuth } from '../context/AuthContext'
import Rating from './Rating'

const ReservationCard = ({ reservation, handleCancelReservation }: { reservation: ReservationResponse, handleCancelReservation?: (id: number) => void }) => {
    const currDate = new Date(Date.now())
    const status = currDate > new Date(reservation.endDate) || !reservation.disabled
    const { isManager } = useAuth()!
    return (
        <Card sx={{ maxWidth: 400, padding: 2 }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={"center"}>
                <Typography>{reservation.id}</Typography>
                <Box>
                    status : {
                        status ? "active" : "inactive"
                    }
                </Box>
            </Stack>
            <CardContent>
                <Typography>
                    StartDate: {formatReadableDate(reservation.startDate)}
                </Typography>
                <Typography>
                    EndDate: {
                        formatReadableDate(reservation.endDate)
                    }

                </Typography>
                <Stack justifyContent={'space-between'} direction={'row'} className='mt-8 gap-4'>
                    <Box>
                        <Typography variant='h5'>User Details</Typography>
                        <Typography variant='body2'>
                            email: {reservation.user.email}
                        </Typography>
                        <Typography variant='body2'>
                            name: {reservation.user.name}
                        </Typography>

                    </Box>
                    <Box>
                        <Typography variant='h5'>Bike Details</Typography>
                        <Typography variant='body2'>
                            bike Model: {reservation.bike.model}
                        </Typography>
                        <Typography variant='body2'>
                            bike color: {reservation.bike.color}
                        </Typography>

                    </Box>
                </Stack>
                {
                    (reservation.rating || reservation.disabled) ? null : <Rating reservation={reservation} />
                }

                {handleCancelReservation && <Stack>

                    {
                        status && isManager && <Button onClick={() => handleCancelReservation(reservation.id)}>Cancel Reservation</Button>
                    }
                </Stack>}
            </CardContent>
        </Card>
    )
}

export default ReservationCard