import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Layout() {
    const {
        isAuthenticated,
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

                    {isAuthenticated ? (
                        <button onClick={logout}>
                            Logout
                        </button>
                    ) : (
                        <Link to="/login">
                            Login
                        </Link>
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