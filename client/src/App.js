import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, Protected } from "./components";
import { CreateFund, FundsList, Home } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/new",
    element: (
      <Protected>
        <CreateFund />
      </Protected>
    ),
  },
  {
    path: "/list",
    element: (
      <Protected>
        <FundsList />
      </Protected>
    ),
  },
]);

function App() {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}

export default App;
