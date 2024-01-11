import PrivateRoute from "@/elements/PrivateRoute/PrivateRoute";
import AddNews from "@/pages/AddUpdateNews/AddNews";
import ListNews from "@/pages/ListNews/ListNews";
import Login from "@/pages/Login/Login";
import { paths } from "@/services/paths";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    errorElement: <p>Wrong</p>,

    children: [
      {
        path: paths.home,
        element: <Login />,
      },
      {
        path: "",
        element: <PrivateRoute />,
        children: [
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
