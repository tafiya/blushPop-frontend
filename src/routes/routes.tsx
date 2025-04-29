
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductDetails from "../pages/ProductDetails";
import ProductList from "../components/productList/ProductList";

const router =createBrowserRouter([
{
    path:"/",
    element:<App></App>,
    errorElement:"",
    children:[
        {
            path:"/",
            element:<ProductList></ProductList>
        },
        {
            path:"product/:id",
            element:<ProductDetails></ProductDetails>
        }
    ]
}
])
export default router;