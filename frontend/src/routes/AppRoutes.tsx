import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

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

function LoginPage() {
    return <h1>Login</h1>;
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
                    path="/products"
                    element={<ProductsPage />}
                />

                <Route
                    path="/cart"
                    element={<CartPage />}
                />

                <Route
                    path="/orders"
                    element={<OrdersPage />}
                />

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