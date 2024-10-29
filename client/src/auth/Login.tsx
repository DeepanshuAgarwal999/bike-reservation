import React from 'react'
import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const Login = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const user = useAuth()

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        const res = await user?.login(values)
        console.log(res)
        if (res) {
            toast("login successfully")
        }

    }

    return (
        <Container className='flex items-center h-screen justify-center'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='shadow-lg w-[400px] p-6'>
                    <Typography variant='h3' color='primary' sx={{ textAlign: "center", mb: "20px" }}>Login</Typography>
                    <Stack gap={4}>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            {...register('email')}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            {...register('password')}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        <Typography>New to Bike rent.com? <Link to='/register' className='text-blue-500 underline'>Register now</Link> </Typography>
                        <Button variant='contained' type='submit' disabled={isSubmitting} className='block'>
                            {isSubmitting ? 'Submitting...' : 'Login'}
                        </Button>
                    </Stack>
                </div>
            </form>
        </Container>
    )
}
