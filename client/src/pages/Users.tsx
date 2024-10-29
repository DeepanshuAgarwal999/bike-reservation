import React, { useEffect, useState } from 'react'
import UserApi from '../apis/UserApi'
import { useAuth } from '../context/AuthContext'
import { Box, Button, Checkbox, FormControlLabel, Stack, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'

type UserType = { id: number, email: string, name: string, isManager: boolean }
const userUpdateSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    isManager: z.boolean()
})

const Users = () => {
    const [users, setUsers] = useState<UserType[] | null>([])
    const [isEdit, setIsEdit] = useState<null | number>(null)
    const { isManager } = useAuth()!
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<z.infer<typeof userUpdateSchema>>({
        resolver: zodResolver(userUpdateSchema),
    });
    const onSubmit = async (values: z.infer<typeof userUpdateSchema>) => {
        console.log(values)
    }
    const getUsers = async () => {
        const [error, data] = await UserApi.getAllUsers()
        if (data) {
            setUsers(data)
        }
    }
    useEffect(() => {
        getUsers()
    }, [])

    const handleEdit = (user: UserType) => {
        setIsEdit(user.id);
        reset({
            name: user.name,
            email: user.email,
            isManager: user.isManager,
        });
    };

    const handleDelete = async (id: number) => {
        const [error, status] = await UserApi.deleteUser(id)
        console.log(status)
        if (status === 200) {
            getUsers()
        }
        else {
            console.log(error)
        }
    }

    return (
        <>

            <div className='flex flex-col gap-4 max-w-5xl mx-auto items-center'>
                {
                    users && users.map((user) => (
                        <div key={user.id} className='bg-white w-[350px] shadow-lg flex flex-col justify-between p-8 text-lg'>
                            <div>
                                {
                                    isEdit && isEdit === user.id ? <form onSubmit={handleSubmit(onSubmit)}>
                                        <Stack gap={4}>
                                            <p>
                                                id: {user.id}
                                            </p>
                                            <TextField
                                                id="email"
                                                label="email"
                                                type="email"
                                                variant="outlined"
                                                {...register('email')}
                                                error={!!errors.email}
                                                helperText={errors.email?.message}
                                            />
                                            <TextField
                                                id="name"
                                                label="name"
                                                type="text"
                                                variant="outlined"
                                                {...register('name')}
                                                error={!!errors.name}
                                                helperText={errors.name?.message}
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        {...register('isManager')} // Register the checkbox
                                                        color="primary"
                                                        defaultChecked={user.isManager}
                                                    />
                                                }
                                                label="Manager"
                                            />
                                        </Stack >
                                        <Button type='submit'>
                                            {isSubmitting ? "Updating..." : "update"}
                                        </Button>
                                    </form> : <>
                                        <p>Name: {user.name}</p>
                                        <p>Email: {user.email}</p>
                                        <p>Manager: {user.isManager ? "true" : "false"}</p>
                                        <Stack direction={'row'} className='mt-4' justifyContent={"space-between"}>
                                            <Button onClick={() => handleEdit(user)}>Edit</Button>
                                            <Button onClick={() => handleDelete(user.id)}>Delete</Button>
                                            <Link to={'/reservations/' + user.id}>
                                                <Button>Reservation</Button></Link>
                                        </Stack></>
                                }

                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Users
