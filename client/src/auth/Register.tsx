import UserApi from '../apis/UserApi'
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, "Minimum 4 characters required"),
  name: z.string().min(4, 'Minimum 4 characters required').max(30, "Maximum 30 characters allowed")
})

export const Register = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "john"
    }
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const [error, data] = await UserApi.register(values)
    if (data) {
      navigate('/login')
      toast('register successfully')
    }
    else {
      toast(error?.message)
    }
  }

  return (
    <Container className='flex items-center h-screen justify-center'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className='shadow-lg w-[400px] p-6'>
          <Typography variant='h3' color='primary' sx={{ textAlign: "center", mb: "20px" }}>Register</Typography>
          <Stack gap={4}>
            <TextField
              id="name"
              label="Name"
              type="text"
              variant="outlined"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
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
            <Typography>Already a user? <Link to='/login' className='text-blue-500 underline'>Login now</Link> </Typography>
            <Button variant='contained' type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Register'}
            </Button>
          </Stack>
        </Box>
      </form>
    </Container>
  )
}
