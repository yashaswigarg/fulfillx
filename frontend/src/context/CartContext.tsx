import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { getCart, addToCart as apiAddToCart, removeCartItem as apiRemoveCartItem, updateCartItem as apiUpdateCartItem } from "../api/cart";
import { useAuth } from "./AuthContext";
import type { Cart } from "../types/api";

interface CartContextValue {
    cart: Cart | null;
    totalItems: number;
    loading: boolean;
    refreshCart: () => Promise<void>;
    addItem: (productId: number, quantity: number) => Promise<void>;
    updateQuantity: (itemId: number, quantity: number) => Promise<void>;
    removeItem: (itemId: number) => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function normalizeCart(data: any): Cart | null {
    if (!data) return null;
    const items = (data.items || []).map((item: any) => ({
        ...item,
        unitPrice: Number(item.unitPrice || 0),
        subtotal: Number(item.subtotal ?? (Number(item.unitPrice || 0) * Number(item.quantity || 1))),
        quantity: Number(item.quantity || 1),
    }));
    const totalAmount = Number(
        data.totalAmount ??
        data.total ??
        items.reduce((sum: number, it: any) => sum + it.subtotal, 0)
    );
    return {
        ...data,
        id: data.id ?? data.cartId ?? 1,
        cartId: data.cartId ?? data.id ?? 1,
        items,
        total: totalAmount,
        totalAmount,
    };
}

export function CartProvider({ children }: { children: ReactNode }) {
    const { isAuthenticated } = useAuth();
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(false);

    const refreshCart = async () => {
        if (!isAuthenticated) {
            setCart(null);
            return;
        }
        try {
            setLoading(true);
            const data = await getCart();
            setCart(normalizeCart(data));
        } catch {
            setCart(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshCart();
    }, [isAuthenticated]);

    const addItem = async (productId: number, quantity: number) => {
        const updated = await apiAddToCart(productId, quantity);
        setCart(normalizeCart(updated));
    };

    const updateQuantity = async (itemId: number, quantity: number) => {
        const updated = await apiUpdateCartItem(itemId, quantity);
        setCart(normalizeCart(updated));
    };

    const removeItem = async (itemId: number) => {
        const updated = await apiRemoveCartItem(itemId);
        setCart(normalizeCart(updated));
    };

    const totalItems = cart?.items?.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0) || 0;

    return (
        <CartContext.Provider
            value={{
                cart,
                totalItems,
                loading,
                refreshCart,
                addItem,
                updateQuantity,
                removeItem,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }
    return context;
}
