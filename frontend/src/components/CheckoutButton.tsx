import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkout } from "../api/orders";
import { useCart } from "../context/CartContext";
import { Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";

function CheckoutButton() {
    const navigate = useNavigate();
    const { refreshCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleCheckout() {
        setLoading(true);
        setError("");

        try {
            const order = await checkout();
            await refreshCart();
            navigate(`/orders/${order.id}`);
        } catch {
            setError("Checkout failed. Please ensure your cart has valid items and try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-3">
            {error && (
                <div
                    role="alert"
                    className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2"
                >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <button
                disabled={loading}
                onClick={handleCheckout}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-artisan-600 to-amber-600 hover:from-artisan-700 hover:to-amber-700 text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Reserving Inventory & Securing Order...</span>
                    </>
                ) : (
                    <>
                        <Lock className="w-4 h-4" />
                        <span>Place Order & Pay Securely</span>
                        <ArrowRight className="w-4 h-4" />
                    </>
                )}
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 font-medium">
                <span>✓ Guaranteed Authentic</span>
                <span>•</span>
                <span>✓ Idempotent Checkout</span>
                <span>•</span>
                <span>✓ Direct Payout to Artisans</span>
            </div>
        </div>
    );
}

export default CheckoutButton;