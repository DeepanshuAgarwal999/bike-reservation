import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReservationApi from '../apis/ReservationApi';
import ReservationCard from '../componets/ReservationCard';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Reservations = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuth();
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getAllReservations = async () => {
    setLoading(true);
    try {
      let error, data;

      if (id && !isNaN(+id)) {
        [error, data] = await ReservationApi.getReservationsById(+id);
      } else if (user?.isManager) {
        [error, data] = await ReservationApi.getAllReservations();
      } else {
        [error, data] = await ReservationApi.getAllUsersReservations();
      }

      if (error) {
        toast.error(error.message);
      }
      setReservations(data || []);

    } catch (error) {
      console.error("Error fetching reservations:", error);
      toast.error("Failed to fetch reservations.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReservation = async (reservationId: number) => {
    try {
      const [error] = await ReservationApi.cancelReservation(reservationId);
      if (error) {
        toast.error(error.message);
        return;
      }
      getAllReservations();
      toast.success("Reservation cancelled successfully");
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      toast.error("Failed to cancel reservation.");
    }
  };

  useEffect(() => {
    getAllReservations();
  }, [id]);


  if (loading) {
    return <div className='text-3xl font-semibold text-center pt-20'>Loading reservations...</div>;
  }

  if (reservations.length === 0) {
    return <div className='text-3xl font-semibold text-center pt-20'>No reservations done yet!</div>;
  }

  return (
    <section className='container mx-auto'>
      <div className='flex flex-wrap gap-10 container'>
        {reservations.map((reservation) => (
          <ReservationCard
            reservation={reservation}
            key={reservation.id}
            handleCancelReservation={handleCancelReservation}
          />
        ))}
      </div>
    </section>
  );
};

export default Reservations;
