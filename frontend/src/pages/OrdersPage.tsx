import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../api/orders";
import type { Order } from "../types/api";
import { Package, ChevronRight, ChevronLeft, Calendar, ArrowRight, ShieldCheck, Truck } from "lucide-react";

function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadOrders = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getOrders(page, 10);
            setOrders(data.content);
            setTotalPages(data.totalPages);
        } catch {
            setError("Unable to load your orders. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    const getStatusBadge = (status: string) => {
        const s = status.toUpperCase();
        if (s === "PAID" || s === "DELIVERED") {
            return "bg-emerald-100 text-emerald-800 border-emerald-200";
        }
        if (s === "SHIPPED" || s === "PROCESSING") {
            return "bg-amber-100 text-amber-800 border-amber-200";
        }
        if (s === "CANCELLED") {
            return "bg-red-100 text-red-800 border-red-200";
        }
        return "bg-stone-100 text-stone-700 border-stone-200";
    };

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-24 text-center space-y-3">
                <div className="w-10 h-10 border-3 border-artisan-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-stone-500 text-sm">Fetching your artisan orders...</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="pb-4 border-b border-stone-200 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-stone-900">My Handcraft Orders</h1>
                    <p className="text-stone-500 text-xs mt-1">
                        Track your direct-from-artisan parcels and fulfillment progress
                    </p>
                </div>
                <div className="text-xs text-stone-500 font-medium">
                    {orders.length} orders recorded
                </div>
            </div>

            {error && (
                <div className="p-4 rounded-xl bg-red-50 text-red-800 border border-red-200 text-xs font-semibold">
                    {error}
                </div>
            )}

            {orders.length === 0 ? (
                <div className="py-20 text-center space-y-5 bg-white rounded-3xl border border-stone-200 p-8">
                    <div className="w-16 h-16 rounded-full bg-amber-100/70 text-artisan-700 flex items-center justify-center mx-auto">
                        <Package className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                        <h2 className="font-serif text-xl font-bold text-stone-800">You haven't placed any orders yet</h2>
                        <p className="text-xs text-stone-500 max-w-sm mx-auto">
                            Support rural creators by purchasing unique pottery, textiles, and wooden handicrafts.
                        </p>
                    </div>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-artisan-600 text-white text-xs font-bold hover:bg-artisan-700 shadow-sm"
                    >
                        <span>Start Shopping</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <article
                            key={order.id}
                            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:border-stone-300 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                        >
                            <div className="space-y-2 flex-1">
                                <div className="flex flex-wrap items-center gap-2.5">
                                    <span className="font-serif font-bold text-lg text-stone-900">
                                        Order #{order.id}
                                    </span>
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border uppercase tracking-wider ${getStatusBadge(
                                            order.status
                                        )}`}
                                    >
                                        {order.status}
                                    </span>
                                    {order.fulfillmentStatus && (
                                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1">
                                            <Truck className="w-3 h-3 text-artisan-600" />
                                            <span>Fulfillment: {order.fulfillmentStatus}</span>
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                                        <span>{new Date(order.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}</span>
                                    </span>
                                    <span>•</span>
                                    <span>{order.items.length} {order.items.length === 1 ? "handcrafted piece" : "handcrafted pieces"}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                        <span>Insured Dispatch</span>
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                                <div className="text-left sm:text-right">
                                    <div className="text-[11px] text-stone-400 font-medium">Total Billed</div>
                                    <div className="font-serif text-xl font-bold text-stone-900">
                                        ₹{Number(order.totalAmount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                    </div>
                                </div>

                                <Link
                                    to={`/orders/${order.id}`}
                                    className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-artisan-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
                                >
                                    <span>Track Order</span>
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className="pt-8 border-t border-stone-200 flex items-center justify-between">
                    <button
                        disabled={page === 0}
                        onClick={() => setPage((p) => p - 1)}
                        className="px-4 py-2 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 disabled:opacity-40 flex items-center gap-1"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                    </button>

                    <span className="text-xs font-semibold text-stone-500">
                        Page {page + 1} of {totalPages}
                    </span>

                    <button
                        disabled={page >= totalPages - 1}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-4 py-2 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 disabled:opacity-40 flex items-center gap-1"
                    >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}

export default OrdersPage;