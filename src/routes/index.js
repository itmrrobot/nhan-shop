import Home from "../pages/Home";
import Login from "../components/Login";
import Product from "../components/Product";
import ProductsPage from "../pages/Products";
import Cart from "../components/Cart";
import ListProduct from "../components/ListProduct";
import AddProduct from "../components/AddProduct";
import Dashboard from "../components/Dashboard";
import Resgister from "../components/Resgister";
import EditProduct from "../components/EditProduct";


export const publicRoutes = [
    {path: '/',Component: Home},
    {path: '/login',Component: Login},
    {path: '/register',Component: Resgister},
    {path:'/products',Component: ProductsPage},
    {path:'/products/:id',Component: Product},
    {path:'/cart',Component: Cart}
]

export const privateRoutes = [
    {path: '/login/admin',Component: Dashboard},
    {path: '/login/admin/products',Component: ListProduct},
    {path: '/login/admin/products/create',Component: AddProduct},
    {path: '/login/admin/products/edit/:id',Component: EditProduct}
]