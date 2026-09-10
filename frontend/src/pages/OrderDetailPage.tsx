import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrder } from "../api/orders";
import type { Order } from "../types/api";
import FulfillmentStatus from "../components/FulfillmentStatus";
import { ArrowLeft, Calendar, ShieldCheck } from "lucide-react";

function OrderDetailPage() {
    const { orderId } = useParams();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadOrder() {
            if (!orderId) return;

            try {
                const data = await getOrder(Number(orderId));
                setOrder(data);
            } catch {
                setError("Unable to load order details. Please verify the order ID.");
            } finally {
                setLoading(false);
            }
        }

        loadOrder();
    }, [orderId]);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-3">
                <div className="w-10 h-10 border-3 border-artisan-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-stone-500 text-sm">Loading order tracking details...</p>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="max-w-lg mx-auto px-4 py-20 text-center space-y-4">
                <h1 className="font-serif text-2xl font-bold text-stone-900">Order Not Found</h1>
                <p className="text-stone-500 text-xs">{error || "We could not find the requested order."}</p>
                <Link
                    to="/orders"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-artisan-700 hover:underline"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Orders</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            {/* Back to Orders */}
            <Link
                to="/orders"
                className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Orders</span>
            </Link>

            {/* Order Header */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                        <h1 className="font-serif text-2xl font-bold text-stone-900">
                            Order #{order.id}
                        </h1>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            {order.status}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Placed on {new Date(order.createdAt).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" })}</span>
                    </div>
                </div>

                <div className="sm:text-right">
                    <div className="text-xs text-stone-400 font-medium">Grand Total Paid</div>
                    <div className="font-serif text-2xl font-bold text-stone-900">
                        ₹{Number(order.totalAmount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </div>
                </div>
            </div>

            {/* Order Fulfillment Timeline */}
            <FulfillmentStatus
                status={order.fulfillmentStatus || "PENDING"}
                trackingNumber={order.trackingNumber}
                originHub={order.originHub}
            />

            {/* Items Summary Table */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                <div className="p-5 border-b border-stone-100 flex items-center justify-between">
                    <h2 className="font-serif font-bold text-lg text-stone-900">Handcrafted Items in This Shipment</h2>
                    <span className="text-xs text-stone-400">{order.items.length} pieces</span>
                </div>

                <div className="divide-y divide-stone-100">
                    {order.items.map((item) => (
                        <div
                            key={item.id}
                            className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors"
                        >
                            <div className="space-y-1">
                                <div className="text-[11px] font-mono text-stone-400 font-medium">SKU: {item.sku}</div>
                                <h3 className="font-serif font-bold text-stone-900 text-base">{item.productName}</h3>
                                <div className="text-xs text-stone-500">
                                    ₹{Number(item.unitPrice).toLocaleString("en-IN", { minimumFractionDigits: 2 })} × {item.quantity} units
                                </div>
                            </div>

                            <div className="text-right sm:self-center">
                                <div className="text-xs text-stone-400 font-medium">Item Subtotal</div>
                                <div className="font-serif font-bold text-stone-900 text-lg">
                                    ₹{Number(item.subtotal).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Price Summary Footer */}
                <div className="p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-emerald-800 font-medium">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Payment verified via simulated merchant gateway • 100% Guaranteed</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-stone-500 font-medium">Total Billed:</span>
                        <span className="font-serif text-xl font-bold text-stone-900">
                            ₹{Number(order.totalAmount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailPage;