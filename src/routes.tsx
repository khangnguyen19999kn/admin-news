import LayoutContainer from "@/elements/layoutContainer/LayoutContainer";
import AddNews from "@/pages/AddNews/AddNews";
import ListNews from "@/pages/ListNews/ListNews";
import { paths } from "@/services/paths";

import { Outlet, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    errorElement: (
      <LayoutContainer>
        <p>Wrong</p>
      </LayoutContainer>
    ),
    children: [
      {
        path: "",
        element: (
          <LayoutContainer>
            <Outlet />
          </LayoutContainer>
        ),
        children: [
          {
            path: paths.home,
            element: <p>Home</p>,
          },
          {
            path: paths.news.list,
            element: <ListNews />,
          },
          {
            path: paths.news.addNews,
            element: <AddNews />,
          },
          {
            path: paths.users,
            element: <p>Users</p>,
          },
          {
            path: paths.reports,
            element: <p>Reports</p>,
          },
        ],
      },
    ],
  },
]);

export default router;
