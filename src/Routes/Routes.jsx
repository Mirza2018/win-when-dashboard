/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { createBrowserRouter, useNavigate } from "react-router-dom";

import DashboardLayout from "../Components/Layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

//* Auth
import ForgotPassword from "../Pages/Auth/ForgetPassword";
import OtpPage from "../Pages/Auth/OtpPage";
import SignIn from "../Pages/Auth/SignIn";
import UpdatePassword from "../Pages/Auth/UpdatePassword";

//* Common

import Notifications from "../Components/Dashboard/Notifications";
import EditProfile from "../Pages/Common/EditProfile";
import Profile from "../Pages/Common/Profile";
import PrivacyPolicy from "../Pages/Common/settings/PrivacyPolicy";
import SettingsChangePassword from "../Pages/Common/settings/SettingsChangePassword";
import SettingsForgotPassword from "../Pages/Common/settings/SettingsForgotPassword";
import SettingsOtpPage from "../Pages/Common/settings/SettingsOtpPage";
import SettingsUpdatePassword from "../Pages/Common/settings/SettingsUpdatePassword";
import TermsOfService from "../Pages/Common/settings/TermsOfService";

//* Admin Dashboard
import AdminDashboard from "../Pages/Admin/AdminDashboard";

//* Company Dashboard

import CategoriesPage from "../Components/Modal/Admin/CategoriesPage";
import Loading from "../Components/UI/Loading";
import SettingsPage from "../Pages/Admin/SettingsPage";
import UsersPage from "../Pages/Admin/UsersPage";
import AboutUs from "../Pages/Common/settings/AboutUs";

function AuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("home_care_user"));
    if (user && user.role) {
      navigate(`/${user.role}/dashboard`, { replace: true });
    } else {
      navigate("/signin", { replace: true });
    }
  }, [navigate]);

  // Optionally display a loading indicator
  return <Loading />;
}

const router = createBrowserRouter([
  {
    path: "/",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "/dashboard",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "edit-profile",
        element: <EditProfile />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },

      {
        path: "settings/change-password",
        element: <SettingsChangePassword />,
      },
      {
        path: "settings/forgot-password",
        element: <SettingsForgotPassword />,
      },
      {
        path: "settings/otp-page",
        element: <SettingsOtpPage />,
      },
      {
        path: "settings/update-password",
        element: <SettingsUpdatePassword />,
      },
      {
        path: "settings/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "settings/terms-and-condition",
        element: <TermsOfService />,
      },
      {
        path: "settings/about-us",
        element: <AboutUs />,
      },

      {
        path: "notifications",
        element: <Notifications />,
      },
      ,
    ],
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "verify-otp",
    element: <OtpPage />,
  },
  {
    path: "update-password",
    element: <UpdatePassword />,
  },
]);

export default router;
