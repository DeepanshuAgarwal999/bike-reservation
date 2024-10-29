import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Container, FormControlLabel, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import ReservationApi from '../apis/ReservationApi';
import BikeApi from '../apis/BikeApis';
import { toast } from 'react-toastify';

const bikeSchema = z.object({
    model: z.string(),
    color: z.string(),
    location: z.string(),
    isAvailable: z.boolean(),
    imageURL: z.string().optional()
})

export const CreateBike = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<z.infer<typeof bikeSchema>>({
        resolver: zodResolver(bikeSchema),
    });
    const navigate = useNavigate()
    async function onSubmit(values: z.infer<typeof bikeSchema>) {
        const [error, data] = await BikeApi.createBike(values)
        console.log(data)
        if (data) {
            navigate('/')
            toast("created successfully")
        }
        else{
            toast(error.message)
        }
    }
    return (
        <Container className='flex items-center h-screen justify-center'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='shadow-lg w-[400px] p-6'>
                    <Typography variant='h3' color='primary' sx={{ textAlign: "center", mb: "20px" }}>Create Bike</Typography>
                    <Stack gap={4}>
                        <TextField
                            id="model"
                            label="model"
                            variant="outlined"
                            {...register('model')}
                            error={!!errors.model}
                            helperText={errors.model?.message}
                        />
                        <TextField
                            id="location"
                            label="location"
                            type="text"
                            variant="outlined"
                            {...register('location')}
                            error={!!errors.location}
                            helperText={errors.location?.message}
                        />
                        <TextField
                            id="color"
                            label="color"
                            type="text"
                            variant="outlined"
                            {...register('color')}
                            error={!!errors.color}
                            helperText={errors.color?.message}
                        />
                        <TextField
                            id="imageURL"
                            label="Image URL"
                            type="text"
                            variant="outlined"
                            {...register('imageURL')}
                            error={!!errors.imageURL}
                            helperText={errors.imageURL?.message}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    {...register('isAvailable')} // Register the checkbox
                                    color="primary"
                                />
                            }
                            label="Available"
                        />
                        <Button variant='contained' type='submit' disabled={isSubmitting} className='block'>
                            {isSubmitting ? 'Submitting...' : 'submit'}
                        </Button>
                    </Stack>
                </div>
            </form>
        </Container>
    )
}
