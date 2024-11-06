import React from "react";
import { Route, Routes as Router } from "react-router-dom";
import CommonLayout from "./layout/CommonLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./layout/ProtectedRoute";
import Reservations from "./pages/Reservations";
import CreateBike from "./pages/CreateBike";
import Users from "./pages/Users";
import ReservationsByUser from "./pages/ReservationsByUser";

const Routes = () => {
  return (<Router>
    <Route path="/" index element={<CommonLayout><Home /></CommonLayout>} />
    <Route path="/login" element={<><Login /></>} />
    <Route path="/register" element={<><Register /></>} />
    <Route path="/reservations" element={<CommonLayout><Reservations /></CommonLayout>} />
    <Route path='/reservations/:id' element={<CommonLayout><ProtectedRoute><ReservationsByUser /></ProtectedRoute></CommonLayout>} />
    <Route path='/create-bike' element={<CommonLayout><ProtectedRoute><CreateBike /></ProtectedRoute></CommonLayout>} />
    <Route path='/users' element={<CommonLayout><><Users /></></CommonLayout>} />

  </Router>);
};

export default Routes;
