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
      {window.ethereum ? (
        <RouterProvider router={router} />
      ) : (
        <div>
          <h1 className="text-bold text-2xl">Please install Metamask first!</h1>
        </div>
      )}
    </Layout>
  );
}

export default App;
