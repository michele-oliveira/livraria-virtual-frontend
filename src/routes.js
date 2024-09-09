import { createBrowserRouter } from "react-router-dom";
import App from "./pages/App";
import Form from "./pages/Form";
import Heart from "./pages/Heart";
import Login from "./pages/Login";
import Book from "./pages/Book";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/form",
        element: <Form/>,
    },
    {
        path: "/favorites",
        element: <Heart/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/book",
        element: <Book/>,
    },
]);

export default router;