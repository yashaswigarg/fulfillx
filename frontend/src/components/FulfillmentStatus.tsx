interface FulfillmentStatusProps {
    status: string;
}

const statuses = [
    "PENDING",
    "PROCESSING",
    "PACKED",
    "SHIPPED",
    "DELIVERED",
];

function FulfillmentStatus({
    status,
}: FulfillmentStatusProps) {
    const currentIndex =
        statuses.indexOf(status);

    return (
        <div>
            <h2>Fulfillment</h2>

            {statuses.map(
                (item, index) => (
                    <div key={item}>
                        <span>
                            {index <= currentIndex
                                ? "✓"
                                : "○"}
                        </span>{" "}
                        {item}
                    </div>
                )
            )}

            {status === "CANCELLED" && (
                <p>
                    Order cancelled
                </p>
            )}
        </div>
    );
}

export default FulfillmentStatus;