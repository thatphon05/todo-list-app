import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout.jsx";
import { Todo } from "./pages/todo/Todo.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import ProtectedRoute from "./components/shares/ProtectedRoute.jsx";
import { Profile } from "./pages/Profile.jsx";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<AppLayout />}
    >
      <Route
        path="/"
        element={<Todo />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/register"
        element={
          <Register />
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Profile />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

const App = () => {

  return (
    <>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </>
  )
}

export default App
