import { useEffect, useState, useCallback, type FormEvent } from "react";
import { getProducts, updateProductStock, createProduct } from "../api/products";
import type { Product } from "../types/api";
import { Package, AlertTriangle, Layers, Plus, Check, MapPin, RefreshCw, X } from "lucide-react";

function AdminDashboardPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [creating, setCreating] = useState(false);

    // Form state for creating product
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [sku, setSku] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("woodcraft");
    const [stockQuantity, setStockQuantity] = useState("15");
    const [artisanName, setArtisanName] = useState("");
    const [originTown, setOriginTown] = useState("");
    const [originState, setOriginState] = useState("");
    const [craftType, setCraftType] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const loadProducts = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getProducts(0, 100);
            setProducts(data.content);
        } catch {
            setError("Unable to load inventory. Please ensure backend is running.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    async function handleStockUpdate(productId: number, quantity: number) {
        if (quantity < 0) return;

        try {
            const updatedProduct = await updateProductStock(productId, quantity);
            setProducts((curr) =>
                curr.map((p) => (p.id === productId ? updatedProduct : p))
            );
        } catch {
            setError("Unable to update stock quantity.");
        }
    }

    async function handleCreateProduct(e: FormEvent) {
        e.preventDefault();
        setCreating(true);
        setError("");

        try {
            const newProduct = await createProduct({
                name,
                description,
                sku,
                price: Number(price),
                category,
                stockQuantity: Number(stockQuantity),
                artisanName: artisanName || undefined,
                originTown: originTown || undefined,
                originState: originState || undefined,
                craftType: craftType || undefined,
                imageUrl: imageUrl || undefined,
            });

            setProducts((curr) => [newProduct, ...curr]);
            setShowAddModal(false);
            // Reset form
            setName("");
            setDescription("");
            setSku("");
            setPrice("");
            setArtisanName("");
            setOriginTown("");
            setOriginState("");
            setImageUrl("");
        } catch {
            setError("Failed to create product. Make sure SKU is unique.");
        } finally {
            setCreating(false);
        }
    }

    const totalProducts = products.length;
    const lowStockProducts = products.filter((p) => p.stockQuantity <= 5).length;
    const totalInventoryUnits = products.reduce((sum, p) => sum + p.stockQuantity, 0);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                        Artisan Operations & Cluster Management
                    </span>
                    <h1 className="font-serif text-3xl font-bold text-stone-900 mt-0.5">
                        Artisan Portal Dashboard
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={loadProducts}
                        className="p-2.5 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
                        title="Refresh Inventory"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-4 py-2.5 rounded-xl bg-artisan-600 hover:bg-artisan-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add New Handcraft</span>
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 rounded-xl bg-red-50 text-red-800 border border-red-200 text-xs font-semibold">
                    {error}
                </div>
            )}

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-artisan-100 text-artisan-700 flex items-center justify-center">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-xs text-stone-500 font-medium">Total Listed Crafts</div>
                        <div className="font-serif text-2xl font-bold text-stone-900">{totalProducts}</div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-xs text-stone-500 font-medium">Low Stock (&le; 5 units)</div>
                        <div className="font-serif text-2xl font-bold text-amber-900">{lowStockProducts}</div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Layers className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-xs text-stone-500 font-medium">Total Handcrafted Units</div>
                        <div className="font-serif text-2xl font-bold text-emerald-900">{totalInventoryUnits}</div>
                    </div>
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                <div className="p-5 border-b border-stone-100">
                    <h2 className="font-serif font-bold text-lg text-stone-900">
                        Regional Craft Inventory & Stock Control
                    </h2>
                    <p className="text-xs text-stone-500">
                        Pessimistic row-locking protects concurrent customer checkouts against overselling
                    </p>
                </div>

                {loading ? (
                    <div className="py-16 text-center text-xs text-stone-500">Loading cluster stock...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
                                <tr>
                                    <th className="p-4">Craft Name & Artisan</th>
                                    <th className="p-4">SKU</th>
                                    <th className="p-4">Origin Hub</th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4">Stock Status</th>
                                    <th className="p-4">Update Quantity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {products.map((product) => (
                                    <ProductInventoryRow
                                        key={product.id}
                                        product={product}
                                        onUpdate={handleStockUpdate}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Add Product Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl border border-stone-200 max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                            <div>
                                <h3 className="font-serif font-bold text-xl text-stone-900">List New Handcraft Item</h3>
                                <p className="text-xs text-stone-500">Add an authentic rural craft to the national catalog</p>
                            </div>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="p-2 text-stone-400 hover:text-stone-700 rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateProduct} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-stone-700">Product Title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Channapatna Wooden Horse"
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-artisan-500/20"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-stone-700">SKU Code *</label>
                                    <input
                                        type="text"
                                        required
                                        value={sku}
                                        onChange={(e) => setSku(e.target.value)}
                                        placeholder="e.g. CHN-HORSE-009"
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono focus:ring-2 focus:ring-artisan-500/20"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-stone-700">Craft Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe heritage methods, materials used, artisan background..."
                                    rows={2}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-artisan-500/20"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-stone-700">Price (INR) *</label>
                                    <input
                                        type="number"
                                        required
                                        step="0.01"
                                        min="1"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="999.00"
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-artisan-500/20"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-stone-700">Initial Stock *</label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        value={stockQuantity}
                                        onChange={(e) => setStockQuantity(e.target.value)}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-artisan-500/20"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-stone-700">Category *</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-artisan-500/20"
                                    >
                                        <option value="woodcraft">Woodcraft</option>
                                        <option value="pottery">Pottery & Ceramics</option>
                                        <option value="textiles">Handloom & Textiles</option>
                                        <option value="metalcraft">Tribal Metalcraft</option>
                                        <option value="painting">Folk Art & Clay</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-stone-700">Artisan / Guild Name</label>
                                    <input
                                        type="text"
                                        value={artisanName}
                                        onChange={(e) => setArtisanName(e.target.value)}
                                        placeholder="e.g. Master Somanna"
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-stone-700">Origin Town</label>
                                    <input
                                        type="text"
                                        value={originTown}
                                        onChange={(e) => setOriginTown(e.target.value)}
                                        placeholder="e.g. Channapatna"
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-stone-700">Origin State</label>
                                    <input
                                        type="text"
                                        value={originState}
                                        onChange={(e) => setOriginState(e.target.value)}
                                        placeholder="e.g. Karnataka"
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-stone-700">Craft Technique / Tradition</label>
                                    <input
                                        type="text"
                                        value={craftType}
                                        onChange={(e) => setCraftType(e.target.value)}
                                        placeholder="e.g. Lacquerware Turning, Rogan Art"
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-stone-700">Handcraft Image URL</label>
                                    <input
                                        type="url"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="https://images.unsplash.com/..."
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-3 border-t border-stone-100">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={creating}
                                    className="px-5 py-2 text-xs font-bold text-white bg-artisan-600 hover:bg-artisan-700 rounded-xl shadow-xs"
                                >
                                    {creating ? "Publishing..." : "Publish Handcraft"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

interface ProductInventoryRowProps {
    product: Product;
    onUpdate: (productId: number, quantity: number) => Promise<void>;
}

function ProductInventoryRow({ product, onUpdate }: ProductInventoryRowProps) {
    const [quantity, setQuantity] = useState(product.stockQuantity);
    const [saved, setSaved] = useState(false);
    const [updating, setUpdating] = useState(false);

    async function handleSave() {
        setUpdating(true);
        await onUpdate(product.id, quantity);
        setUpdating(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    return (
        <tr className="hover:bg-stone-50/70 transition-colors">
            <td className="p-4">
                <div className="font-semibold text-stone-900">{product.name}</div>
                <div className="text-[11px] text-artisan-700 flex items-center gap-1 mt-0.5">
                    <span>By {product.artisanName || "Rural Maker"}</span>
                </div>
            </td>

            <td className="p-4 font-mono text-stone-600">{product.sku}</td>

            <td className="p-4">
                <span className="inline-flex items-center gap-1 text-[11px] text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md">
                    <MapPin className="w-3 h-3 text-artisan-600" />
                    <span>{product.originTown ? `${product.originTown}, ${product.originState}` : "Pan-India"}</span>
                </span>
            </td>

            <td className="p-4 font-serif font-bold text-stone-900">
                ₹{Number(product.price).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </td>

            <td className="p-4">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">{product.stockQuantity} units</span>
                    {product.stockQuantity <= 5 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            LOW
                        </span>
                    )}
                </div>
            </td>

            <td className="p-4">
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        min="0"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-20 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1 text-xs font-semibold focus:ring-2 focus:ring-artisan-500/20"
                    />
                    <button
                        onClick={handleSave}
                        disabled={updating}
                        className="px-3 py-1 rounded-lg bg-stone-900 hover:bg-artisan-700 text-white font-semibold transition-colors flex items-center gap-1 text-xs"
                    >
                        {saved ? (
                            <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Saved</span>
                            </>
                        ) : (
                            <span>Update</span>
                        )}
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default AdminDashboardPage;