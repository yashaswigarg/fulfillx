import type { Product } from "../types/api";
import { MapPin, Star, ShoppingBag, Check, ShieldCheck } from "lucide-react";

interface ProductCardProps {
    product: Product;
    onAddToCart: (productId: number) => void;
    adding: boolean;
}

const CRAFT_IMAGE_MAP: Record<string, string> = {
    "PB-PHUL-001": "/images/crafts/phulkari.jpg",
    "RJ-BLP-002": "/images/crafts/blue_pottery.jpg",
    "JK-PASH-003": "/images/crafts/pashmina.jpg",
    "KA-INLAY-004": "/images/crafts/mysore_inlay.jpg",
    "KA-BIDRI-005": "/images/crafts/bidriware.jpg",
    "BR-MADHU-006": "/images/crafts/madhubani.jpg",
    "OD-PATTA-007": "/images/crafts/pattachitra.jpg",
    "AS-BAMB-008": "/images/crafts/bamboo_craft.jpg",
    "GJ-KUTCH-009": "/images/crafts/kutch_mirrorwork.jpg",
    "CG-DHOK-010": "/images/crafts/dhokra.jpg",
    "WB-TERRA-011": "/images/crafts/terracotta.jpg",
};

function getCraftImage(product: Product): string {
    if (CRAFT_IMAGE_MAP[product.sku]) {
        return CRAFT_IMAGE_MAP[product.sku];
    }
    const name = (product.name || "").toLowerCase();
    const craft = (product.craftType || "").toLowerCase();
    if (name.includes("phulkari") || craft.includes("phulkari")) return "/images/crafts/phulkari.jpg";
    if (name.includes("blue pottery") || craft.includes("blue pottery")) return "/images/crafts/blue_pottery.jpg";
    if (name.includes("pashmina") || craft.includes("pashmina")) return "/images/crafts/pashmina.jpg";
    if (name.includes("inlay") || craft.includes("inlay")) return "/images/crafts/mysore_inlay.jpg";
    if (name.includes("bidri") || craft.includes("bidri")) return "/images/crafts/bidriware.jpg";
    if (name.includes("madhubani") || craft.includes("madhubani")) return "/images/crafts/madhubani.jpg";
    if (name.includes("patta") || craft.includes("patta")) return "/images/crafts/pattachitra.jpg";
    if (name.includes("bamboo") || craft.includes("bamboo")) return "/images/crafts/bamboo_craft.jpg";
    if (name.includes("kutch") || craft.includes("mirror")) return "/images/crafts/kutch_mirrorwork.jpg";
    if (name.includes("dhokra") || craft.includes("dhokra")) return "/images/crafts/dhokra.jpg";
    if (name.includes("terracotta") || craft.includes("terracotta")) return "/images/crafts/terracotta.jpg";

    return product.imageUrl || "/images/crafts/phulkari.jpg";
}

function ProductCard({ product, onAddToCart, adding }: ProductCardProps) {
    const outOfStock = product.stockQuantity <= 0;
    const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= 5;

    const displayImage = getCraftImage(product);

    return (
        <article className="group bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-artisan-300 transition-all duration-300 flex flex-col overflow-hidden">
            {/* Image & Badges Container */}
            <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img
                    src={displayImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />

                {/* Craft Type Badge */}
                <span className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-amber-300 text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-md shadow-xs">
                    {product.craftType || product.category}
                </span>

                {/* Regional Origin Pill */}
                {(product.originTown || product.originState) && (
                    <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-stone-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 border border-stone-100">
                        <MapPin className="w-3.5 h-3.5 text-artisan-600" />
                        <span>
                            {product.originTown ? `${product.originTown}, ` : ""}
                            {product.originState || "India"}
                        </span>
                    </span>
                )}

                {/* Rating */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full text-xs font-semibold text-stone-800 shadow-xs flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{product.rating ? Number(product.rating).toFixed(1) : "4.8"}</span>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                    {/* Artisan Signature */}
                    <div className="flex items-center gap-1.5 text-xs text-artisan-800 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">Handcrafted by {product.artisanName || "Master Artisan"}</span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-serif font-bold text-lg text-stone-900 line-clamp-1 group-hover:text-artisan-700 transition-colors">
                        {product.name}
                    </h3>

                    {/* Product Description */}
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>
                </div>

                {/* Price and Stock Footer */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                    <div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xs font-semibold text-stone-500">₹</span>
                            <span className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
                                {product.price.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                            </span>
                        </div>
                        <div className="text-[11px] font-medium mt-0.5">
                            {outOfStock ? (
                                <span className="text-red-600 font-semibold">Currently Out of Stock</span>
                            ) : isLowStock ? (
                                <span className="text-amber-700 font-semibold">Only {product.stockQuantity} pieces left</span>
                            ) : (
                                <span className="text-emerald-700 font-medium">In Stock ({product.stockQuantity} units)</span>
                            )}
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        disabled={outOfStock || adding}
                        onClick={() => onAddToCart(product.id)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-xs transition-all duration-200 ${
                            outOfStock
                                ? "bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200"
                                : adding
                                ? "bg-artisan-100 text-artisan-800 cursor-wait"
                                : "bg-artisan-600 hover:bg-artisan-700 text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                        }`}
                        title={outOfStock ? "Out of stock" : "Add to Cart"}
                    >
                        {adding ? (
                            <>
                                <Check className="w-4 h-4 animate-bounce text-artisan-700" />
                                <span>Adding</span>
                            </>
                        ) : (
                            <>
                                <ShoppingBag className="w-4 h-4" />
                                <span>Add</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ProductCard;