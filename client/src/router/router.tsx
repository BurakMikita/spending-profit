import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Transactions, { transactionAction, transactionLoder } from "../pages/Transactions";
import Categories, { categoriesAction, categoryLoader } from "../pages/Categories";
import Auth from "../pages/Auth";
import ProtectedRouter from "../components/ProtectedRouter";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children:[
            {
                index: true,
                element: <Home/>
            },
            {
                path: "transactions",
                loader: transactionLoder,
                action: transactionAction,
                element: <ProtectedRouter><Transactions/></ProtectedRouter> 
            },
            {
                path: "categories",
                element: <ProtectedRouter><Categories/></ProtectedRouter>,
                action: categoriesAction,
                loader:categoryLoader,
                
            },
            {
                path: "auth",
                element:<Auth/>
            },

        ]
    }
])