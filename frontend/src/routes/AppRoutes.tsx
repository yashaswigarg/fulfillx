import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage";
import OrderDetailPage from "../pages/OrderDetailPage";
import OrdersPage from "../pages/OrdersPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import { useAuth } from "../context/AuthContext";

function AppRoutes() {
    const { role } = useAuth();

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

                <Route
                    path="/cart"
                    element={<CartPage />}
                />

                <Route element={<ProtectedRoute />}>

                    <Route
                        path="/orders"
                        element={<OrdersPage />}
                    />

                    <Route
                        path="/orders/:orderId"
                        element={<OrderDetailPage />}
                    />

                    <Route element={<AdminRoute role={role} />}>
                        <Route
                            path="/admin"
                            element={<AdminDashboardPage />}
                        />
                    </Route>

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