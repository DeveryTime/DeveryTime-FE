import { createBrowserRouter, useParams } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { AuthLayout, RootLayout } from "../Layouts";
import { SignupPage } from "../pages/SignupPage/SignupPage";
import LandingPage from "../pages/landing-page.tsx";
import PostMainPage from "../features/posts/pages/PostMainPage.tsx";
import CategoryPage from "../features/posts/pages/CategoryPage.tsx";
import SearchPage from "../pages/search-page.tsx";

const CATEGORY_NAMES: Record<number, string> = {
  1: "전공",
  2: "일상",
  3: "교과",
  4: "급식",
  5: "프로젝트",
  6: "기숙사",
  7: "분실물",
};

const CategoryRouteWrapper = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const id = Number(categoryId) || 1;
  const categoryName = CATEGORY_NAMES[id] || "전공";

  return <CategoryPage categoryId={id} categoryName={categoryName} />;
};

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
        path: "/signup/:step",
        element: <SignupPage />,
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
            path: "/category/:categoryId",
            element: <CategoryRouteWrapper/>,
          },

          {
            path: "/search",
            element: <SearchPage/>
          }
        ],
      },
    ],
  },
]);
