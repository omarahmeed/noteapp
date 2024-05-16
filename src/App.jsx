import "./App.css";
import Home from "./Components/Home/Home";
import Sidebar from "./Components/Sidebar/Sidebar";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Note from "./Components/Note/Note";
import Layout from "./Components/Layout/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import InverseProtectedRoute from "./Components/InverseProtectedRoute/InverseProtectedRoute.jsx";
let routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <InverseProtectedRoute>
            {" "}
            <Register />
          </InverseProtectedRoute>
        ),
      },
      { path: "home", element: <Home /> },
      {
        path: "login",
        element: (
          <InverseProtectedRoute>
            <Login />
          </InverseProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RecoilRoot>
        <RouterProvider router={routes}></RouterProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
