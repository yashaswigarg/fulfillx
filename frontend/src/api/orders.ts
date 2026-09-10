import apiClient from "./client";
import type {
    Order,
    OrderPage,
} from "../types/api";

export async function checkout(): Promise<Order> {
    const idempotencyKey =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : `idemp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    const response =
        await apiClient.post<Order>(
            "/orders/checkout",
            {},
            {
                headers: {
                    "Idempotency-Key":
                        idempotencyKey,
                },
            }
        );

    return response.data;
}

export async function getOrders(
    page = 0,
    size = 10
): Promise<OrderPage> {
    const response =
        await apiClient.get<OrderPage>(
            "/orders",
            {
                params: {
                    page,
                    size,
                },
            }
        );

    return response.data;
}

export async function getOrder(
    orderId: number
): Promise<Order> {
    const response =
        await apiClient.get<Order>(
            `/orders/${orderId}`
        );

    return response.data;
}