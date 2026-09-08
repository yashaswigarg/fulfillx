import {
    Navigate,
    Outlet,
} from "react-router-dom";

interface AdminRouteProps {
    role: string | null;
}

function AdminRoute({
    role,
}: AdminRouteProps) {
    if (role !== "ADMIN") {
        return (
            <Navigate
                to="/products"
                replace
            />
        );
    }

    return <Outlet />;
}

export default AdminRoute;