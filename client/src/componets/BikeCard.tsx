import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import BikeApi from '../apis/BikeApis';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import ReservationApi from '../apis/ReservationApi';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export type BikeCardType = {
    avgRating: string;
    color: string;
    id: number;
    imageURL: string;
    isAvailable: boolean;
    location: string;
    model: string;
}

const bikeUpdateSchema = z.object({
    model: z.string(),
    imageURL: z.string(),
    isAvailable: z.boolean(),
    location: z.string(),
});

const bookingSchema = z.object({
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
});

const BikeCard = ({ bikeDetails, handleDelete }: {
    bikeDetails: BikeCardType,
    handleDelete: (id: number) => void,
}) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [isBooking, setIsBooking] = useState<boolean>(false);
    const { isManager } = useAuth()!;
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<z.infer<typeof bikeUpdateSchema>>({
        resolver: zodResolver(bikeUpdateSchema),
    });

    const { register: registerBooking, handleSubmit: handleBookingSubmit, formState: { errors: bookingErrors, isSubmitting: isBookingSubmitting }, watch: watchBooking } = useForm<z.infer<typeof bookingSchema>>({
        resolver: zodResolver(bookingSchema),
    });

    const onSubmit = async (values: z.infer<typeof bikeUpdateSchema>) => {
        const [error, data] = await BikeApi.updateBike(bikeDetails.id, values);
        if (error) {
            toast.error('Failed to update bike.');
            return;
        }
        toast.success('Bike updated successfully');
        setEdit(false);
    };

    const onBookingSubmit = async (values: z.infer<typeof bookingSchema>) => {
        const startDate = new Date(values.startDate).toISOString();
        const endDate = new Date(values.endDate).toISOString();

        const bookingData = {
            bikeId: bikeDetails.id,
            startDate,
            endDate,
        };
        const [error, data] = await ReservationApi.createReservation(bookingData);
        console.log(error)
        if (error) {
            // @ts-ignore
            toast(error.response?.data.message)
            return;
        }
        setIsBooking(false);
        toast.success('Bike booked successfully!');
        navigate('/reservations')
    };

    const handleEdit = () => {
        reset({
            model: bikeDetails.model,
            imageURL: bikeDetails.imageURL,
            isAvailable: bikeDetails.isAvailable,
            location: bikeDetails.location,
        });
        setEdit(true);
    };
    const startDateValue = watchBooking("startDate");

    if (isBooking) {
        return (
            <Card sx={{ width: 345 }}>
                <form onSubmit={handleBookingSubmit(onBookingSubmit)} className='flex flex-col gap-4 p-4'>
                    <TextField
                        id="startDate"
                        label="Start Date"
                        type="date"
                        variant="outlined"
                        {...registerBooking('startDate')}
                        error={!!bookingErrors.startDate}
                        helperText={bookingErrors.startDate?.message}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                            min: new Date().toISOString().split("T")[0] // Sets today's date as the minimum
                        }}
                    />
                    <TextField
                        id="endDate"
                        label="End Date"
                        type="date"
                        variant="outlined"
                        {...registerBooking('endDate')}
                        error={!!bookingErrors.endDate}
                        helperText={bookingErrors.endDate?.message}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                            min: startDateValue || new Date().toISOString().split("T")[0]
                        }}

                    />
                    <div className='flex items-center justify-end'>
                        <Button type='button' onClick={() => setIsBooking(false)}>❌</Button>
                        <Button type='submit' disabled={isBookingSubmitting}>
                            {isBookingSubmitting ? 'Booking...' : '✓'}
                        </Button>
                    </div>
                </form>
            </Card>
        );
    }

    if (edit) {
        return (
            <Card sx={{ width: 345 }}>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-4'>
                    <TextField
                        id="model"
                        label="Model"
                        variant="outlined"
                        {...register('model')}
                        error={!!errors.model}
                        helperText={errors.model?.message}
                    />
                    <TextField
                        id="imageURL"
                        label="Image URL"
                        variant="outlined"
                        {...register('imageURL')}
                        error={!!errors.imageURL}
                        helperText={errors.imageURL?.message}
                    />
                    <TextField
                        id="location"
                        label="Location"
                        variant="outlined"
                        {...register('location')}
                        error={!!errors.location}
                        helperText={errors.location?.message}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                {...register('isAvailable')}
                                color="primary"
                                defaultChecked={bikeDetails.isAvailable}
                            />
                        }
                        label="Available"
                    />
                    <div className='flex items-center justify-end'>
                        <Button type='button' onClick={() => {
                            reset();
                            setEdit(false);
                        }}>❌</Button>
                        <Button type='submit' disabled={isSubmitting}>
                            {isSubmitting ? 'Updating...' : '✓'}
                        </Button>
                    </div>
                </form>
            </Card>
        );
    }

    return (
        <Card sx={{ width: 345 }}>
            {bikeDetails.imageURL && (
                <CardMedia
                    component="img"
                    alt="Bike image"
                    height="140"
                    image={bikeDetails.imageURL}
                />
            )}

            <CardContent>
                <Typography variant='h4'>{bikeDetails.model}</Typography>
                <Box>
                    <Box className='flex items-center justify-between' sx={{ color: 'text.secondary' }}>
                        <Typography variant="body2">Color: {bikeDetails.color}</Typography>
                        {isManager && <Typography variant="body2">Available: {bikeDetails.isAvailable ? "Available" : "Not Available"}</Typography>}
                    </Box>
                    <Box>
                        <Typography variant="body2">Rating: {bikeDetails.avgRating} ⭐</Typography>
                    </Box>
                </Box>
            </CardContent>
            <CardActions>
                {bikeDetails.isAvailable && <Button size="small" onClick={() => setIsBooking(true)}>Book now</Button>}
                {isManager && (
                    <div>
                        <Button size="small" onClick={() => handleDelete(bikeDetails.id)}>Delete bike</Button>
                        <Button size="small" onClick={handleEdit}>Edit bike</Button>
                    </div>
                )}
            </CardActions>
        </Card>
    );
}

export default BikeCard;
