import apiClient from "./client";
import type {
    Product,
    ProductPage,
} from "../types/api";
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
export async function updateProductStock(
    productId: number,
    quantity: number
): Promise<Product> {
    const response =
        await apiClient.put<Product>(
            `/products/${productId}/stock`,
            null,
            {
                params: {
                    quantity,
                },
            }
        );

    return response.data;
}