declare interface Bike {
  id: number;
  color: string;
  imageURL?: string;
  isAvailable: boolean;
  location: string;
  model: string;
  avgRating: number;
}
type BikeWithoutRatingAndId = Omit<Bike, "avgRating", "id">;

type User = {
  email: string;
  id: number;
  name: string;
  isManager: boolean;
};

type ReservationResponse = {
  startDate: string;
  endDate: string;
  user: User;
  bike: Bike;
  disabled: boolean;
  rating: number;
  id: number;
};

type reservationCredentials = {
  startDate: string;
  endDate: string;
  bikeId: number;
};

type filterType = {
  avgRating: string;
  color: string;
  isAvailable: boolean;
  location: string;
  model: string;
  startDate: string;
  endDate: string;
};
