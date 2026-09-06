import apiClient from "./client";
import type { Order } from "../types/api";

export async function checkout(): Promise<Order> {
    const idempotencyKey =
        crypto.randomUUID();

    const response =
        await apiClient.post<Order>(
            "/orders/checkout",
            null,
            {
                headers: {
                    "Idempotency-Key":
                        idempotencyKey,
                },
            }
        );

    return response.data;
}

export async function getOrders(): Promise<Order[]> {
    const response =
        await apiClient.get<Order[]>("/orders");

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