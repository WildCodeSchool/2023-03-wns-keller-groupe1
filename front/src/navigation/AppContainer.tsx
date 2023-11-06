import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import React, { ReactNode } from "react";
import HomePage from "../screens/Dashboard/HomePage";
import Login from "../screens/UserConnexion/Login";
import Statistic from "../screens/Statistic/Statistic";
import Social from "../screens/Social/Social";
import Success from "../screens/Payment/Success";
import { gql, useQuery } from "@apollo/client";
import NotFound from "../screens/Error/404";
import DonationPage from "../screens/Donation/DonationPage";
import Profile from "../screens/Profile/Profile";
import Chat from "../screens/Chat/Chat";
import MainLayout from "../screens/MainLayout/MainLayout";
import { MainLayoutProps } from "../interface/shared/MainLayoutProps";

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
          path="/social"
          element={<PrivateRoute title="Communautés" children={<Social />} />}
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute title="Dashboard" children={<HomePage />} />}
        />
        <Route
          path="/statistic"
          element={
            <PrivateRoute title="Statistiques" children={<Statistic />} />
          }
        />
        <Route
          path="/profile"
          element={<PrivateRoute title="Votre profil" children={<Profile />} />}
        />
        <Route
          path="/payment/success"
          element={<PrivateRoute title="TODO" children={<Success />} />}
        />
        <Route
          path="/donations"
          element={
            <PrivateRoute
              title="Soutenez Wild Carbon"
              children={<DonationPage />}
            />
          }
        />
        <Route
          path="/chat"
          element={<PrivateRoute title="TODO" children={<Chat />} />}
        />
        <Route path="*" element={<NotFound />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function PrivateRoute({ children, title }: MainLayoutProps) {
  const navigate = useNavigate();
  const { error } = useQuery(VERIFY_TOKEN, {
    variables: { token: sessionStorage.getItem("token") },
    fetchPolicy: "network-only",
  });

  React.useEffect(() => {
    if (error) navigate("/login");
  }, [error, navigate]);

  return <MainLayout title={title}>{children}</MainLayout>;
}

export default App;
