import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

import Layout from "../components/Layout";

function HomePage() {
    return (
        <div>
            <h1>FulfillX</h1>
            <p>
                Ecommerce and fulfillment platform
            </p>
        </div>
    );
}



function ProductsPage() {
    return <h1>Products</h1>;
}

function CartPage() {
    return <h1>Cart</h1>;
}

function OrdersPage() {
    return <h1>Orders</h1>;
}

function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>

                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                <Route
                    path="/products"
                    element={<ProductsPage />}
                />

                <Route element={<ProtectedRoute />}>

                    <Route
                        path="/cart"
                        element={<CartPage />}
                    />

                    <Route
                        path="/orders"
                        element={<OrdersPage />}
                    />

                </Route>

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Route>
        </Routes>
    );
}

export default AppRoutes;