import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../api/orders";
import type { Order } from "../types/api";

function OrdersPage() {
    const [orders, setOrders] =
        useState<Order[]>([]);

    const [page, setPage] =
        useState(0);

    const [totalPages, setTotalPages] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const loadOrders = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getOrders(
                page,
                10
            );

            setOrders(data.content);
            setTotalPages(data.totalPages);
        } catch {
            setError(
                "Unable to load your orders."
            );
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadOrders();
    }, [loadOrders]);

    if (loading) {
        return <p>Loading orders...</p>;
    }

    return (
        <section>
            <h1>My Orders</h1>

            {error && (
                <p role="alert">
                    {error}
                </p>
            )}

            {orders.length === 0 ? (
                <p>
                    You haven't placed any orders yet.
                </p>
            ) : (
                <>
                    {orders.map((order) => (
                        <article key={order.id}>
                            <h2>
                                Order #{order.id}
                            </h2>

                            <p>
                                Status:{" "}
                                <strong>
                                    {order.status}
                                </strong>
                            </p>

                            <p>
                                Total: ₹
                                {Number(
                                    order.totalAmount
                                ).toFixed(2)}
                            </p>

                            <p>
                                {new Date(
                                    order.createdAt
                                ).toLocaleString()}
                            </p>

                            <Link
                                to={`/orders/${order.id}`}
                            >
                                View Order
                            </Link>
                        </article>
                    ))}
                </>
            )}

            {totalPages > 1 && (
                <div>
                    <button
                        disabled={page === 0}
                        onClick={() =>
                            setPage((p) => p - 1)
                        }
                    >
                        Previous
                    </button>

                    <span>
                        {" "}
                        Page {page + 1} of{" "}
                        {totalPages}{" "}
                    </span>

                    <button
                        disabled={
                            page >= totalPages - 1
                        }
                        onClick={() =>
                            setPage((p) => p + 1)
                        }
                    >
                        Next
                    </button>
                </div>
            )}
        </section>
    );
}

export default OrdersPage;