import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { addToCart } from "../api/cart";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/api";

function ProductsPage() {
    const [products, setProducts] =
        useState<Product[]>([]);

    const [page, setPage] =
        useState(0);

    const [totalPages, setTotalPages] =
        useState(0);

    const [category, setCategory] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [addingProductId, setAddingProductId] =
        useState<number | null>(null);

    async function loadProducts() {
        setLoading(true);
        setError("");

        try {
            const response = await getProducts(
                page,
                8,
                category || undefined
            );

            setProducts(response.content);
            setTotalPages(
                response.totalPages
            );
        } catch {
            setError(
                "Unable to load products."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProducts();
    }, [page, category]);

    async function handleAddToCart(
        productId: number
    ) {
        setAddingProductId(productId);

        try {
            await addToCart(productId, 1);
            alert("Product added to cart.");
        } catch {
            alert(
                "Please login before adding products to your cart."
            );
        } finally {
            setAddingProductId(null);
        }
    }

    function handleCategoryChange(
        value: string
    ) {
        setCategory(value);
        setPage(0);
    }

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section>
            <h1>Products</h1>

            <div>
                <label htmlFor="category">
                    Category:
                </label>

                <select
                    id="category"
                    value={category}
                    onChange={(event) =>
                        handleCategoryChange(
                            event.target.value
                        )
                    }
                >
                    <option value="">
                        All
                    </option>

                    <option value="electronics">
                        Electronics
                    </option>

                    <option value="furniture">
                        Furniture
                    </option>
                </select>
            </div>

            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div>
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={
                                handleAddToCart
                            }
                            adding={
                                addingProductId ===
                                product.id
                            }
                        />
                    ))}
                </div>
            )}

            <div>
                <button
                    disabled={page === 0}
                    onClick={() =>
                        setPage((current) =>
                            current - 1
                        )
                    }
                >
                    Previous
                </button>

                <span>
                    {" "}
                    Page {page + 1} of{" "}
                    {Math.max(totalPages, 1)}{" "}
                </span>

                <button
                    disabled={
                        page >= totalPages - 1
                    }
                    onClick={() =>
                        setPage((current) =>
                            current + 1
                        )
                    }
                >
                    Next
                </button>
            </div>
        </section>
    );
}

export default ProductsPage;