import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Layout() {
    const {
        isAuthenticated,
        role,
        logout,
    } = useAuth();

    return (
        <>
            <header>
                <nav>
                    <Link to="/">FulfillX</Link>{" "}
                    <Link to="/products">
                        Products
                    </Link>{" "}
                    <Link to="/cart">
                        Cart
                    </Link>{" "}
                    <Link to="/orders">
                        Orders
                    </Link>{" "}
                    {role === "ADMIN" && (
                        <>
                            <Link to="/admin">
                                Admin
                            </Link>{" "}
                        </>
                    )}

                    {isAuthenticated ? (
                        <button onClick={logout}>
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login">
                                Login
                            </Link>{" "}
                            <Link to="/register">
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;