
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductDetails from "../pages/ProductDetails";
import ProductList from "../components/productList/ProductList";
import EditProductsPage from "../pages/EditProductsPage";

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
        },
        {
            path:"product/edit/:id",
            element:<EditProductsPage></EditProductsPage>
        }
    ]
}
])
export default router;