import React, { useEffect, useState } from 'react'
import LeftSideBar from '../componets/LeftSideBar'
import { Box, Pagination, Stack } from '@mui/material'
import BikeApi from '../apis/BikeApis';
import BikeCard, { BikeCardType } from '../componets/BikeCard';

const Home = () => {
    const [page, setPage] = useState(1);
    const [bikes, setBikes] = useState<BikeCardType[] | null>([])
    const [filters, setFilters] = useState<filterType>({
        avgRating: '',
        color: '',
        isAvailable: true,
        location: '',
        model: '',
        startDate: '',
        endDate: ''
    });
    const [paginationDetails, setPaginationDetails] = useState<{ page: number, total: number, pageCount: number } | null>(null)

    const buildQueryParams = (filters: any, page: number) => {
        const params: URLSearchParams = new URLSearchParams();

        if (filters.color) params.append('color', filters.color);
        if (filters.isAvailable) params.append('isAvailable', String(filters.isAvailable));
        if (filters.location) params.append('location', filters.location);
        if (filters.avgRating) params.append('avgRating', filters.avgRating);
        if (filters.startDate) params.append('startDate', filters.startDate);
        if (filters.endDate) params.append('endDate', filters.endDate);
        if (filters.model) params.append('model', filters.model);
        params.append('page', String(page));

        return params.toString();
    };
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFilters((prev) => ({ ...prev, isAvailable: e.target.checked }));
    };

    


    const handleDeleteBike = async (id: number) => {
        const [error, status] = await BikeApi.deleteBike(id)
        if (status === 200) {
            getBikes()
        }
    }
    const url = `/bike?${buildQueryParams(filters, page)}`;

    const getBikes = async () => {
        const [error, data] = await BikeApi.getBikes(url);
        if (data) {
            setPaginationDetails({ page: data.page, total: data.total, pageCount: data.pageCount })
            setBikes(data.data)
        };
    }
    useEffect(() => {
        getBikes()
    }, [filters, page])
    console.log(filters.isAvailable)

    return (
        <div className='flex'>
            <LeftSideBar handleAvailabilityChange={handleAvailabilityChange} handleFilterChange={handleFilterChange} filters={filters} />
            <div className='px-8 flex-1 '>
                {
                    bikes?.length !== 0 ? <main className=''>
                        <div className='flex flex-wrap justify-between items-center gap-6 '>
                            {
                                bikes && bikes.length !== 0 && bikes.map((bike) => (
                                    <BikeCard bikeDetails={bike} key={bike.id} handleDelete={handleDeleteBike} />
                                ))
                            }
                        </div>

                        <Stack justifyContent={"center"} mt={4} direction={'row'}>
                            <Pagination count={paginationDetails?.pageCount || 1} page={page} onChange={(e, val) => setPage(val)} />
                        </Stack>
                    </main> : <h1 className='text-center mt-20 text-3xl'>No bike found</h1>
                }
            </div>
        </div>
    )
}
export default Home