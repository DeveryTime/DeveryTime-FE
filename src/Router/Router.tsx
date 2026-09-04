import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { AuthLayout, RootLayout } from "../Layouts";
import { SignupPage } from "../pages/SignupPage/SignupPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,

    children: [
      {
        element: <RootLayout />,

        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },

          {
            path: "/signup/:step",
            element: <SignupPage />,
          },
        ],
      },
    ],
  },
]);
