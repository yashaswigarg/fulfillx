import { useEffect, useState, useCallback, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../api/products";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/api";
import { Sparkles, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Layers, Search, X, MapPin } from "lucide-react";

const CRAFT_CATEGORIES = [
    { label: "All Crafts", value: "" },
    { label: "Woodcraft & Inlay", value: "woodcraft" },
    { label: "Ceramics & Pottery", value: "pottery" },
    { label: "Handloom & Textiles", value: "textiles" },
    { label: "Metalcraft & Bidri", value: "metalcraft" },
    { label: "Folk Painting & Scrolls", value: "painting" },
];

const REGIONAL_ZONES = [
    { label: "All Regions", value: "" },
    { label: "Northern India", value: "north" },
    { label: "Southern India", value: "south" },
    { label: "Eastern & North-Eastern", value: "east" },
    { label: "Western & Central", value: "west" },
];

function ProductsPage() {
    const { addItem } = useCart();
    const { isAuthenticated } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();

    const searchQuery = searchParams.get("search") || "";
    const [searchInput, setSearchInput] = useState(searchQuery);

    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [category, setCategory] = useState("");
    const [region, setRegion] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [addingProductId, setAddingProductId] = useState<number | null>(null);
    const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        setSearchInput(searchParams.get("search") || "");
    }, [searchParams]);

    const loadProducts = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            // Load up to 50 items so category and search filtering feel instantaneous
            const response = await getProducts(page, 50, category || undefined);
            setProducts(response.content);
            setTotalPages(response.totalPages);
        } catch {
            setError("Unable to load handcrafted products. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [page, category]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    async function handleAddToCart(productId: number) {
        if (!isAuthenticated) {
            setToastMessage({
                text: "Please sign in to add handcrafted items to your cart.",
                type: "error",
            });
            setTimeout(() => setToastMessage(null), 4000);
            return;
        }

        setAddingProductId(productId);

        try {
            await addItem(productId, 1);
            setToastMessage({
                text: "Item added to your cart successfully!",
                type: "success",
            });
            setTimeout(() => setToastMessage(null), 3000);
        } catch {
            setToastMessage({
                text: "Could not add item to cart. Please retry.",
                type: "error",
            });
            setTimeout(() => setToastMessage(null), 4000);
        } finally {
            setAddingProductId(null);
        }
    }

    function handleCategorySelect(val: string) {
        setCategory(val);
        setPage(0);
    }

    function handleRegionSelect(val: string) {
        setRegion(val);
        setPage(0);
    }

    function handleSearchSubmit(e: FormEvent) {
        e.preventDefault();
        const next = new URLSearchParams(searchParams);
        if (searchInput.trim()) {
            next.set("search", searchInput.trim());
        } else {
            next.delete("search");
        }
        setSearchParams(next);
        setPage(0);
    }

    function handleClearSearch() {
        setSearchInput("");
        const next = new URLSearchParams(searchParams);
        next.delete("search");
        setSearchParams(next);
        setPage(0);
    }

    // Real-time client search filtering across multiple artisan attributes and regional zones
    const filteredProducts = products.filter((product) => {
        if (region === "north") {
            const state = (product.originState || "").toLowerCase();
            if (!state.includes("punjab") && !state.includes("rajasthan") && !state.includes("kashmir")) return false;
        } else if (region === "south") {
            const state = (product.originState || "").toLowerCase();
            if (!state.includes("karnataka") && !state.includes("tamil")) return false;
        } else if (region === "east") {
            const state = (product.originState || "").toLowerCase();
            if (!state.includes("bihar") && !state.includes("odisha") && !state.includes("assam")) return false;
        } else if (region === "west") {
            const state = (product.originState || "").toLowerCase();
            if (!state.includes("gujarat") && !state.includes("chhattisgarh") && !state.includes("bengal")) return false;
        }

        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase().trim();
        return (
            (product.name && product.name.toLowerCase().includes(q)) ||
            (product.description && product.description.toLowerCase().includes(q)) ||
            (product.craftType && product.craftType.toLowerCase().includes(q)) ||
            (product.artisanName && product.artisanName.toLowerCase().includes(q)) ||
            (product.originTown && product.originTown.toLowerCase().includes(q)) ||
            (product.originState && product.originState.toLowerCase().includes(q)) ||
            (product.category && product.category.toLowerCase().includes(q))
        );
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            {/* Toast Notification */}
            {toastMessage && (
                <div
                    className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-xl border flex items-center gap-3 transition-all animate-slide-up ${
                        toastMessage.type === "success"
                            ? "bg-stone-900 text-white border-stone-700"
                            : "bg-red-50 text-red-800 border-red-200"
                    }`}
                >
                    {toastMessage.type === "success" ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="text-xs font-semibold">{toastMessage.text}</span>
                </div>
            )}

            {/* Header Title Banner */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
                <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-artisan-700 mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Curated Artisanal Catalog</span>
                    </div>
                    <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900">
                        Explore Handcrafted Treasures
                    </h1>
                    <p className="text-stone-500 text-sm mt-1 max-w-xl">
                        Directly sourced from verified rural artisans and family-run workshops across Indian craft clusters.
                    </p>
                </div>

                <div className="text-xs text-stone-500 font-medium">
                    Showing {filteredProducts.length} crafted items
                </div>
            </div>

            {/* Search Bar & Active Search Tag */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-lg">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search crafts, artisans, towns (e.g. Phulkari, Pashmina, Bidriware)..."
                        className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-10 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-artisan-500/30 focus:border-artisan-500 shadow-2xs transition-all"
                    />
                    {searchInput && (
                        <button
                            type="button"
                            onClick={handleClearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </form>

                {searchQuery && (
                    <div className="flex items-center gap-2 bg-amber-100/70 border border-amber-300 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-semibold w-fit">
                        <span>Filter: "{searchQuery}"</span>
                        <button
                            onClick={handleClearSearch}
                            className="hover:text-red-600 transition-colors"
                            title="Clear search filter"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                )}
            </div>

            {/* Regional Zone Filter Pills */}
            <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-artisan-600" />
                        <span>Region:</span>
                    </span>
                    {REGIONAL_ZONES.map((z) => {
                        const isActive = region === z.value;
                        return (
                            <button
                                key={z.value}
                                onClick={() => handleRegionSelect(z.value)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                                    isActive
                                        ? "bg-amber-800 text-white shadow-sm ring-2 ring-amber-800/20"
                                        : "bg-white text-stone-700 border border-stone-200 hover:border-amber-400 hover:text-amber-800"
                                }`}
                            >
                                {z.label}
                            </button>
                        );
                    })}
                </div>

                {/* Craft Category Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Craft:</span>
                    </span>
                    {CRAFT_CATEGORIES.map((cat) => {
                        const isActive = category === cat.value;
                        return (
                            <button
                                key={cat.value}
                                onClick={() => handleCategorySelect(cat.value)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                                    isActive
                                        ? "bg-artisan-700 text-white shadow-sm ring-2 ring-artisan-700/20"
                                        : "bg-white text-stone-700 border border-stone-200 hover:border-artisan-400 hover:text-artisan-700"
                                }`}
                            >
                                {cat.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content States */}
            {loading ? (
                <div className="py-24 text-center space-y-3">
                    <div className="w-10 h-10 border-3 border-artisan-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-stone-500 text-sm font-medium">Loading artisanal creations...</p>
                </div>
            ) : error ? (
                <div className="p-8 rounded-2xl bg-red-50 border border-red-200 text-center space-y-3 max-w-md mx-auto">
                    <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
                    <p className="text-red-800 text-sm font-semibold">{error}</p>
                    <button
                        onClick={loadProducts}
                        className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700"
                    >
                        Try Again
                    </button>
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-stone-200 p-8">
                    <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                        <Layers className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-serif text-xl font-bold text-stone-800">
                            {searchQuery
                                ? `No crafts found matching "${searchQuery}"`
                                : "No crafts found in this selection"}
                        </h3>
                        <p className="text-xs text-stone-500">
                            {searchQuery
                                ? "Try searching for another craft, region (e.g. Phulkari, Kashmir, Bidriware), or clear the search."
                                : "Try clearing your region or craft filter."}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            handleClearSearch();
                            handleCategorySelect("");
                            handleRegionSelect("");
                        }}
                        className="px-5 py-2.5 rounded-xl bg-artisan-600 text-white text-xs font-bold hover:bg-artisan-700"
                    >
                        View All Crafts
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={handleAddToCart}
                            adding={addingProductId === product.id}
                        />
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && !searchQuery && !region && (
                <div className="pt-8 border-t border-stone-200 flex items-center justify-between">
                    <button
                        disabled={page === 0}
                        onClick={() => setPage((curr) => curr - 1)}
                        className="px-4 py-2 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-2xs"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                    </button>

                    <span className="text-xs font-semibold text-stone-500">
                        Page <strong className="text-stone-900">{page + 1}</strong> of{" "}
                        <strong className="text-stone-900">{totalPages}</strong>
                    </span>

                    <button
                        disabled={page >= totalPages - 1}
                        onClick={() => setPage((curr) => curr + 1)}
                        className="px-4 py-2 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-2xs"
                    >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProductsPage;