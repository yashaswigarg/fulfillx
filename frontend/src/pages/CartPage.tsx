import { Link } from "react-router-dom";
import CheckoutButton from "../components/CheckoutButton";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, MapPin, LogIn } from "lucide-react";
import { useState } from "react";

function CartPage() {
    const { cart, loading, updateQuantity, removeItem } = useCart();
    const { isAuthenticated } = useAuth();
    const [pincode, setPincode] = useState("560001");
    const [pincodeChecked, setPincodeChecked] = useState(false);

    if (!isAuthenticated) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
                <div className="w-20 h-20 bg-amber-100/70 rounded-full flex items-center justify-center mx-auto text-artisan-700 shadow-xs">
                    <ShoppingBag className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                    <h1 className="font-serif text-3xl font-bold text-stone-900">Sign In to View Your Cart</h1>
                    <p className="text-stone-500 text-sm max-w-md mx-auto">
                        Please sign in to access your handcrafted items, checkout, or track your artisan deliveries.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <Link
                        to="/login"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-artisan-600 hover:bg-artisan-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                    >
                        <LogIn className="w-4 h-4" />
                        <span>Sign In</span>
                    </Link>
                    <Link
                        to="/products"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 font-semibold text-sm transition-all"
                    >
                        <span>Explore Crafts</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        );
    }

    if (loading && !cart) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-3">
                <div className="w-10 h-10 border-3 border-artisan-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-stone-500 text-sm">Loading your artisanal bag...</p>
            </div>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
                <div className="w-20 h-20 bg-amber-100/70 rounded-full flex items-center justify-center mx-auto text-artisan-700 shadow-xs">
                    <ShoppingBag className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                    <h1 className="font-serif text-3xl font-bold text-stone-900">Your Handcraft Bag is Empty</h1>
                    <p className="text-stone-500 text-sm max-w-md mx-auto">
                        Explore authentic creations by rural artisans from Karnataka, Rajasthan, Uttar Pradesh, and beyond.
                    </p>
                </div>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-artisan-600 hover:bg-artisan-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                    <span>Browse Artisanal Collections</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        );
    }

    const cartTotal = Number(cart.totalAmount ?? cart.total ?? 0);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="pb-4 border-b border-stone-200">
                <h1 className="font-serif text-3xl font-bold text-stone-900">Your Shopping Bag</h1>
                <p className="text-stone-500 text-xs mt-1">
                    {cart.items.length} unique handcrafted {cart.items.length === 1 ? "item" : "items"} reserved for checkout
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Cart Items List (2 cols on large) */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.items.map((item) => (
                        <article
                            key={item.id}
                            className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 hover:border-stone-300 transition-colors"
                        >
                            <div className="space-y-1.5 flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-mono font-semibold text-stone-400 bg-stone-100 px-2 py-0.5 rounded">
                                        {item.sku}
                                    </span>
                                    <span className="text-[11px] font-medium text-emerald-700 flex items-center gap-1">
                                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                        <span>Certified Handcrafted</span>
                                    </span>
                                </div>
                                <h3 className="font-serif font-bold text-lg text-stone-900">
                                    {item.productName}
                                </h3>
                                <p className="text-sm font-semibold text-stone-600">
                                    ₹{Number(item.unitPrice || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })} per piece
                                </p>
                            </div>

                            {/* Quantity & Subtotal Controls */}
                            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                                {/* Counter */}
                                <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden shadow-2xs">
                                    <button
                                        disabled={item.quantity <= 1}
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="p-2 text-stone-600 hover:bg-stone-200/70 disabled:opacity-30 transition-colors"
                                        title="Decrease quantity"
                                    >
                                        <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="px-3.5 text-xs font-bold text-stone-800">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="p-2 text-stone-600 hover:bg-stone-200/70 transition-colors"
                                        title="Increase quantity"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                {/* Subtotal */}
                                <div className="text-right min-w-[90px]">
                                    <div className="text-[11px] text-stone-400 font-medium">Subtotal</div>
                                    <div className="font-serif text-lg font-bold text-stone-900">
                                        ₹{Number(item.subtotal || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                    </div>
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Remove item"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </article>
                    ))}

                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex items-center gap-3 text-xs text-amber-900">
                        <Truck className="w-5 h-5 text-artisan-600 shrink-0" />
                        <span>
                            <strong>Pan-India Rural Logistics:</strong> Handcrafted items are inspected at regional craft clusters before dispatch.
                        </span>
                    </div>
                </div>

                {/* Right Column: Order Summary Card */}
                <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
                    <h2 className="font-serif font-bold text-xl text-stone-900 pb-3 border-b border-stone-100">
                        Order Summary
                    </h2>

                    {/* Delivery Pincode Checker */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-700 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-artisan-600" />
                            <span>Delivery Destination PIN Code:</span>
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono text-stone-800 focus:outline-none focus:ring-2 focus:ring-artisan-500/20"
                                maxLength={6}
                            />
                            <button
                                onClick={() => setPincodeChecked(true)}
                                className="px-3 py-2 bg-stone-100 hover:bg-stone-200 rounded-xl text-xs font-semibold text-stone-700"
                            >
                                Verify
                            </button>
                        </div>
                        {pincodeChecked && (
                            <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>Express rural fulfillment hub available for PIN {pincode}</span>
                            </p>
                        )}
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-3 pt-3 border-t border-stone-100 text-xs text-stone-600">
                        <div className="flex justify-between">
                            <span>Artisanal Items Subtotal</span>
                            <span className="font-semibold text-stone-900">
                                ₹{cartTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Insured Pan-India Shipping</span>
                            <span className="font-semibold text-emerald-700">FREE</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Authenticity Certificate & Packing</span>
                            <span className="font-semibold text-emerald-700">FREE</span>
                        </div>
                        <div className="pt-3 border-t border-stone-100 flex justify-between items-baseline">
                            <span className="font-serif text-base font-bold text-stone-900">Grand Total</span>
                            <span className="font-serif text-2xl font-bold text-stone-900">
                                ₹{cartTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <CheckoutButton />
                </div>
            </div>
        </div>
    );
}

export default CartPage;