import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import {
  MainLayout,
  AuthLayout,
  IntroductionLayout
} from './layouts';

import Landing from './pages/Landing';
import TalkingAboutUs from './pages/TalkingAboutUs';
import NotFound from './pages/NotFound';
import {
  Login,
  Register,
  ForgotPassword,
  UpdatePassword,
  Welcome,
} from './pages';
import { IAM, StartingStatement } from './pages';

import { generateMilestoneRoutes } from './routes/MilestoneRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Landing /> },
    ]
  },

  { path: "/welcome", element: <Welcome /> },
  {
    path: "introduction",
    element: <IntroductionLayout />,
    children: [
      { path: "iam", element: <IAM /> },
      { path: "starting-statement", element: <StartingStatement /> },
    ]
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "update-password", element: <UpdatePassword /> },
      { path: "about", element: <TalkingAboutUs /> },
    ],
  },

  // {
  //   path: "/dashboard",
  //   element: <MainLayout />,
  //   children: [{ index: true, element: <Dashboard /> }],
  // },
  ...generateMilestoneRoutes(),

  { path: "*", element: <NotFound /> },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "", color: "#5c5c5c", padding: "16px 20px", fontSize: "14px", fontWeight: "700", margin: "20px" },
          duration: 4000,
        }}
      />
    </AuthProvider>
  );
}
