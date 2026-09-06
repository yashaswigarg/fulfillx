import type { Product } from "../types/api";

interface ProductCardProps {
    product: Product;
    onAddToCart: (productId: number) => void;
    adding: boolean;
}

function ProductCard({
    product,
    onAddToCart,
    adding,
}: ProductCardProps) {
    const outOfStock =
        product.stockQuantity <= 0;

    return (
        <article>
            <h2>{product.name}</h2>

            <p>
                {product.description}
            </p>

            <p>
                <strong>
                    ₹{product.price.toFixed(2)}
                </strong>
            </p>

            <p>
                Category: {product.category}
            </p>

            <p>
                {outOfStock
                    ? "Out of stock"
                    : `${product.stockQuantity} available`}
            </p>

            <button
                disabled={outOfStock || adding}
                onClick={() =>
                    onAddToCart(product.id)
                }
            >
                {adding
                    ? "Adding..."
                    : "Add to Cart"}
            </button>
        </article>
    );
}

export default ProductCard;