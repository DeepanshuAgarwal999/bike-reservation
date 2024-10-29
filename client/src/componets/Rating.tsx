import { Box, Button, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import MuiRating from '@mui/material/Rating';
import ReservationApi from '../apis/ReservationApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const Rating = ({ reservation }: { reservation: ReservationResponse }) => {
    const [open, setOpen] = useState<boolean>(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()
    const handleRating = async (rating: number | null) => {
        if (!rating) {
            toast.error("Invalid rating")
            return
        }
        console.log(rating + " " + reservation.id)

        const [error, data] = await ReservationApi.rateReservation({ reservationId: reservation.id, rating: rating })
        if (error) {
            toast.error(error.response.data.message)
            return
        }
        toast.success('Thankyou for rating')
        handleClose()
        navigate('/')

    }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Rate your experience for our reservation
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <MuiRating
                            name="simple-controlled"
                            // value={rating}
                            onChange={(event, newValue) => {
                                handleRating(newValue)
                            }}
                        />
                    </Typography>
                </Box>
            </Modal>
            <Button onClick={handleOpen}>Rate Now</Button>
        </>)
}

export default Rating