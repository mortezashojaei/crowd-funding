import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, Protected } from "./components";
import { CreateFund, ProjectsList, Home } from "./pages";

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
        <ProjectsList />
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
