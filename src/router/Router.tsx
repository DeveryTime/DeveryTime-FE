import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { AuthLayout, RootLayout } from "../Layouts";
import { SignupPage } from "../pages/SignupPage/SignupPage";
import LandingPage from "../pages/landing-page.tsx";
import PostMainPage from "../features/posts/pages/PostMainPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,

    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },

      {
        element: <RootLayout />,

        children: [
          {
            index: true,
            element: <LandingPage />,
          },

          {
            path: "/main",
            element: <PostMainPage />,
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
