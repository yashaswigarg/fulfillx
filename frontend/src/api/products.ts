import apiClient from "./client";
import type { ProductPage } from "../types/api";

export async function getProducts(
    page = 0,
    size = 20,
    category?: string
): Promise<ProductPage> {
    const response = await apiClient.get<ProductPage>(
        "/products",
        {
            params: {
                page,
                size,
                category,
            },
        }
    );

    return response.data;
}