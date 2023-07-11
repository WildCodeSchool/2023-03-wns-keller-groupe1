import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import HomePage from "../screens/Dashboard/HomePage";
import Login from "../screens/UserConnexion/Login";
import Statistic from "../screens/Statistic/Statistic";
import SideBar from "../components/SideBar/SideBar";
import * as React from "react";
import Success from "../screens/Payment/Success";
import { gql, useQuery } from "@apollo/client";
import NotFound from "../screens/Error/404";
import DonationPage from "../screens/Donation/DonationPage";

export const VERIFY_TOKEN = gql`
  query Query($token: String!) {
    verifyToken(token: $token)
  }
`;

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<HomePage />} />}
        />
        <Route
          path="/statistic"
          element={<PrivateRoute element={<Statistic />} />}
        />
        <Route
          path="/payment/success"
          element={<PrivateRoute element={<Success />} />}
        />
        <Route
          path="/donations"
          element={<PrivateRoute element={<DonationPage />} />}
        />
        <Route 
          path="*" 
          element={<NotFound />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

function PrivateRoute({ element }: { element: React.ReactNode }) {
  const navigate = useNavigate();

  const { error } = useQuery(VERIFY_TOKEN, {
    variables: { token: sessionStorage.getItem("token") },
    fetchPolicy: "network-only",
  })

  if (error) navigate("/login");

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      {element}
    </div>
  );
}

export default App;
