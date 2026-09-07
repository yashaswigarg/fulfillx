import { useParams } from "react-router-dom";

function OrderDetailPage() {
    const { orderId } = useParams();

    return (
        <section>
            <h1>Order Created</h1>

            <p>
                Order ID: {orderId}
            </p>

            <p>
                Your order has been submitted
                successfully.
            </p>
        </section>
    );
}

export default OrderDetailPage;