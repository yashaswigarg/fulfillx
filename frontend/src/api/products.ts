import apiClient from "./client";
import type {
    Product,
    ProductPage,
} from "../types/api";

export interface CreateProductInput {
    name: string;
    description: string;
    sku: string;
    price: number;
    category: string;
    stockQuantity: number;
    artisanName?: string;
    originTown?: string;
    originState?: string;
    craftType?: string;
    imageUrl?: string;
}

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

export async function createProduct(
    input: CreateProductInput
): Promise<Product> {
    const response = await apiClient.post<Product>(
        "/products",
        input
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