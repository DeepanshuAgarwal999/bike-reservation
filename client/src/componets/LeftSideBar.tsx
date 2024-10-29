import { Checkbox, FormControlLabel, Slider, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useAuth } from '../context/AuthContext'

const LeftSideBar = ({ filters, handleFilterChange, handleAvailabilityChange }: { filters: filterType, handleAvailabilityChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }) => {
    const { isManager } = useAuth()!
    return (
        <div className='w-[260px] bg-white shadow-xl sticky top-10 left-0 h-[calc(100vh-10px)] pt-10  px-6'>

            <Typography variant='h4'>Filters</Typography>
            <Stack spacing={2} >
                <TextField
                    label="Rating"
                    name="avgRating"
                    value={filters.avgRating}
                    onChange={handleFilterChange}
                    variant="outlined"
                />
                <TextField
                    label="Color"
                    name="color"
                    value={filters.color}
                    onChange={handleFilterChange}
                    variant="outlined"
                />
                <TextField
                    label="Location"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    variant="outlined"
                />
                <TextField
                    label="Model"
                    name="model"
                    value={filters.model}
                    onChange={handleFilterChange}
                    variant="outlined"
                />
                {
                    isManager && <FormControlLabel
                        control={
                            <Checkbox
                                checked={filters.isAvailable}
                                onChange={handleAvailabilityChange}
                                color="primary"
                            />
                        }
                        label="Available"
                    />
                }

                <TextField
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
            </Stack>
        </div>

    )
}

export default LeftSideBar