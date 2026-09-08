import { useEffect, useState, useCallback } from "react";
import {
    getProducts,
    updateProductStock,
} from "../api/products";
import type { Product } from "../types/api";

function AdminDashboardPage() {
    const [products, setProducts] =
        useState<Product[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const loadProducts = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getProducts(
                0,
                100
            );

            setProducts(data.content);
        } catch {
            setError(
                "Unable to load inventory."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadProducts();
    }, [loadProducts]);

    async function handleStockUpdate(
        productId: number,
        quantity: number
    ) {
        if (quantity < 0) {
            return;
        }

        try {
            const updatedProduct =
                await updateProductStock(
                    productId,
                    quantity
                );

            setProducts((current) =>
                current.map((product) =>
                    product.id === productId
                        ? updatedProduct
                        : product
                )
            );
        } catch {
            setError(
                "Unable to update stock."
            );
        }
    }

    const totalProducts =
        products.length;

    const lowStockProducts =
        products.filter(
            (product) =>
                product.stockQuantity <= 5
        ).length;

    const totalInventoryUnits =
        products.reduce(
            (sum, product) =>
                sum + product.stockQuantity,
            0
        );

    if (loading) {
        return <p>Loading inventory...</p>;
    }

    return (
        <section>
            <h1>Admin Dashboard</h1>

            {error && (
                <p role="alert">
                    {error}
                </p>
            )}

            <div>
                <div>
                    <h3>Total Products</h3>
                    <p>{totalProducts}</p>
                </div>

                <div>
                    <h3>Low Stock</h3>
                    <p>{lowStockProducts}</p>
                </div>

                <div>
                    <h3>Inventory Units</h3>
                    <p>{totalInventoryUnits}</p>
                </div>
            </div>

            <h2>Inventory</h2>

            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>SKU</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Update</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <ProductInventoryRow
                            key={product.id}
                            product={product}
                            onUpdate={handleStockUpdate}
                        />
                    ))}
                </tbody>
            </table>
        </section>
    );
}

interface ProductInventoryRowProps {
    product: Product;
    onUpdate: (
        productId: number,
        quantity: number
    ) => Promise<void>;
}

function ProductInventoryRow({
    product,
    onUpdate,
}: ProductInventoryRowProps) {
    const [quantity, setQuantity] =
        useState(product.stockQuantity);

    return (
        <tr>
            <td>{product.name}</td>

            <td>{product.sku}</td>

            <td>{product.category}</td>

            <td>
                ₹{Number(product.price).toFixed(2)}
            </td>

            <td>
                <strong>
                    {product.stockQuantity}
                </strong>

                {product.stockQuantity <= 5 && (
                    <span>
                        {" "}
                        LOW STOCK
                    </span>
                )}
            </td>

            <td>
                <input
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={(event) =>
                        setQuantity(
                            Number(event.target.value)
                        )
                    }
                />

                <button
                    onClick={() =>
                        onUpdate(
                            product.id,
                            quantity
                        )
                    }
                >
                    Update
                </button>
            </td>
        </tr>
    );
}

export default AdminDashboardPage;