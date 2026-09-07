import { useEffect, useState } from "react";
import CheckoutButton from "../components/CheckoutButton";
import {
    getCart,
    updateCartItem,
    removeCartItem,
} from "../api/cart";
import type { Cart } from "../types/api";

function CartPage() {
    const [cart, setCart] = useState<Cart | null>(
        null
    );

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadCart() {
        setLoading(true);
        setError("");

        try {
            const data = await getCart();
            setCart(data);
        } catch {
            setError("Unable to load your cart.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadCart();
    }, []);

    async function handleQuantityChange(
        itemId: number,
        quantity: number
    ) {
        if (quantity < 1) {
            return;
        }

        try {
            const updatedCart =
                await updateCartItem(
                    itemId,
                    quantity
                );

            setCart(updatedCart);
        } catch {
            setError(
                "Unable to update cart item."
            );
        }
    }

    async function handleRemove(
        itemId: number
    ) {
        try {
            const updatedCart =
                await removeCartItem(itemId);

            setCart(updatedCart);
        } catch {
            setError(
                "Unable to remove cart item."
            );
        }
    }

    if (loading) {
        return <p>Loading cart...</p>;
    }

    if (error && !cart) {
        return <p>{error}</p>;
    }

    if (!cart || cart.items.length === 0) {
        return (
            <section>
                <h1>Your Cart</h1>
                <p>Your cart is empty.</p>
            </section>
        );
    }

    return (
        <section>
            <h1>Your Cart</h1>

            {error && (
                <p role="alert">{error}</p>
            )}

            <div>
                {cart.items.map((item) => (
                    <article key={item.id}>
                        <h2>{item.productName}</h2>

                        <p>
                            SKU: {item.sku}
                        </p>

                        <p>
                            ₹{item.unitPrice.toFixed(2)}
                        </p>

                        <div>
                            <button
                                disabled={item.quantity <= 1}
                                onClick={() =>
                                    handleQuantityChange(
                                        item.id,
                                        item.quantity - 1
                                    )
                                }
                            >
                                -
                            </button>

                            <span>
                                {" "}
                                {item.quantity}{" "}
                            </span>

                            <button
                                onClick={() =>
                                    handleQuantityChange(
                                        item.id,
                                        item.quantity + 1
                                    )
                                }
                            >
                                +
                            </button>
                        </div>

                        <p>
                            Subtotal: ₹
                            {item.subtotal.toFixed(2)}
                        </p>

                        <button
                            onClick={() =>
                                handleRemove(item.id)
                            }
                        >
                            Remove
                        </button>
                    </article>
                ))}
            </div>

            <hr />

            <h2>
                Total: ₹
                {cart.totalAmount.toFixed(2)}
            </h2>
            <CheckoutButton />
        </section>
    );
}

export default CartPage;