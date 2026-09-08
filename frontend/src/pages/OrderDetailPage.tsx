import { useEffect, useState } from "react";
import {
    Link,
    useParams,
} from "react-router-dom";

import { getOrder } from "../api/orders";
import type { Order } from "../types/api";
import FulfillmentStatus from "../components/FulfillmentStatus";

function OrderDetailPage() {
    const { orderId } = useParams();

    const [order, setOrder] =
        useState<Order | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        async function loadOrder() {
            if (!orderId) {
                return;
            }

            try {
                const data = await getOrder(
                    Number(orderId)
                );

                setOrder(data);
            } catch {
                setError(
                    "Unable to load order."
                );
            } finally {
                setLoading(false);
            }
        }

        loadOrder();
    }, [orderId]);

    if (loading) {
        return <p>Loading order...</p>;
    }

    if (error || !order) {
        return (
            <section>
                <h1>Order Not Found</h1>
                <p>
                    {error ||
                        "This order could not be found."}
                </p>
                <Link to="/orders">
                    Back to Orders
                </Link>
            </section>
        );
    }

    return (
        <section>
            <h1>
                Order #{order.id}
            </h1>

            <p>
                Status:{" "}
                <strong>
                    {order.status}
                </strong>
            </p>
            {order.fulfillmentStatus && (
                <FulfillmentStatus
                    status={order.fulfillmentStatus}
                />
            )}
            <p>
                Placed:{" "}
                {new Date(
                    order.createdAt
                ).toLocaleString()}
            </p>

            <hr />

            <h2>Items</h2>

            {order.items.map((item) => (
                <article key={item.id}>
                    <h3>
                        {item.productName}
                    </h3>

                    <p>
                        SKU: {item.sku}
                    </p>

                    <p>
                        Quantity: {item.quantity}
                    </p>

                    <p>
                        Unit Price: ₹
                        {Number(
                            item.unitPrice
                        ).toFixed(2)}
                    </p>

                    <p>
                        Subtotal: ₹
                        {Number(
                            item.subtotal
                        ).toFixed(2)}
                    </p>
                </article>
            ))}

            <hr />

            <h2>
                Total: ₹
                {Number(
                    order.totalAmount
                ).toFixed(2)}
            </h2>

            <Link to="/orders">
                Back to Orders
            </Link>
        </section>
    );
}

export default OrderDetailPage;