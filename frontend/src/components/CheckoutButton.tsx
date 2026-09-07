import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkout } from "../api/orders";

function CheckoutButton() {
    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    async function handleCheckout() {
        setLoading(true);
        setError("");

        try {
            const order = await checkout();

            navigate(`/orders/${order.id}`);
        } catch {
            setError(
                "Checkout failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {error && (
                <p role="alert">{error}</p>
            )}

            <button
                disabled={loading}
                onClick={handleCheckout}
            >
                {loading
                    ? "Processing..."
                    : "Checkout"}
            </button>
        </div>
    );
}

export default CheckoutButton;