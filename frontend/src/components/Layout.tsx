import { Link, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Package, ShieldCheck, LogOut, Sparkles, MapPin, Search } from "lucide-react";

function Layout() {
    const { isAuthenticated, role, logout } = useAuth();
    const { totalItems } = useCart();
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

    useEffect(() => {
        setSearchQuery(searchParams.get("search") || "");
    }, [searchParams]);

    function handleSearchSubmit(e: FormEvent) {
        e.preventDefault();
        const query = searchQuery.trim();
        if (query) {
            navigate(`/products?search=${encodeURIComponent(query)}`);
        } else {
            navigate("/products");
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans">
            {/* Top Announcement Bar */}
            <div className="bg-gradient-to-r from-artisan-800 via-artisan-700 to-amber-800 text-amber-50 text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Empowering Rural Artisans & Craft Collectives • 100% Authentic Handcrafted Treasures • Direct-to-Artisan Fair Payouts</span>
            </div>

            {/* Main Navigation */}
            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20 gap-4">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group shrink-0">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-artisan-600 to-amber-600 flex items-center justify-center text-white shadow-md shadow-artisan-600/20 group-hover:scale-105 transition-transform duration-200">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="font-serif font-bold text-2xl tracking-tight text-stone-900 group-hover:text-artisan-700 transition-colors">
                                    KarigarSetu
                                </span>
                                <span className="block text-[11px] font-semibold text-artisan-700 tracking-wider uppercase -mt-1">
                                    Artisan Marketplace
                                </span>
                            </div>
                        </Link>

                        {/* Search Bar */}
                        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-md mx-6">
                            <div className="relative w-full">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by craft, region (e.g. Channapatna, Varanasi, Pottery)..."
                                    className="w-full bg-stone-100/80 border border-stone-200 rounded-full pl-10 pr-4 py-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-artisan-500/30 focus:border-artisan-500 transition-all"
                                />
                            </div>
                        </form>

                        {/* Navigation Links */}
                        <nav className="flex items-center gap-1 sm:gap-2">
                            <Link
                                to="/products"
                                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    location.pathname === "/products"
                                        ? "text-artisan-700 bg-artisan-50 font-semibold"
                                        : "text-stone-700 hover:text-artisan-700 hover:bg-stone-100"
                                }`}
                            >
                                Explore Crafts
                            </Link>

                            <Link
                                to="/orders"
                                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                                    location.pathname.startsWith("/orders")
                                        ? "text-artisan-700 bg-artisan-50 font-semibold"
                                        : "text-stone-700 hover:text-artisan-700 hover:bg-stone-100"
                                }`}
                            >
                                <Package className="w-4 h-4" />
                                <span className="hidden sm:inline">My Orders</span>
                            </Link>

                            {role === "ADMIN" && (
                                <Link
                                    to="/admin"
                                    className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide uppercase transition-colors ${
                                        location.pathname === "/admin"
                                            ? "bg-amber-600 text-white"
                                            : "bg-amber-100 text-amber-900 hover:bg-amber-200"
                                    }`}
                                >
                                    Artisan Portal
                                </Link>
                            )}

                            {/* Cart Icon */}
                            <Link
                                to="/cart"
                                className="relative p-2.5 rounded-full text-stone-700 hover:text-artisan-700 hover:bg-stone-100 transition-colors ml-1"
                                title="Shopping Cart"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 bg-artisan-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-scale">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>

                            {/* Auth Controls */}
                            <div className="h-6 w-px bg-stone-200 mx-1 sm:mx-2" />

                            {isAuthenticated ? (
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-stone-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link
                                        to="/login"
                                        className="px-3 py-2 text-sm font-medium text-stone-700 hover:text-artisan-700 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-4 py-2 text-sm font-medium text-white bg-artisan-600 hover:bg-artisan-700 rounded-lg shadow-xs hover:shadow transition-all"
                                    >
                                        Join Us
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content Viewport */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        {/* Brand Column */}
                        <div className="md:col-span-1 space-y-3">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-lg bg-artisan-600 flex items-center justify-center text-white font-bold">
                                    KS
                                </div>
                                <span className="font-serif text-xl font-bold text-white tracking-tight">KarigarSetu</span>
                            </div>
                            <p className="text-xs text-stone-400 leading-relaxed">
                                Bridging generational Indian master craftspeople from rural villages directly to contemporary homes worldwide.
                            </p>
                            <div className="flex items-center gap-2 text-xs text-amber-400/90 pt-1">
                                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                                <span>100% Authentic Handcraft Guarantee</span>
                            </div>
                        </div>

                        {/* Craft Clusters */}
                        <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
                                Craft Clusters
                            </h4>
                            <ul className="space-y-2 text-xs text-stone-400">
                                <li className="hover:text-stone-200 transition-colors">Phulkari & Pashmina Shawls (North)</li>
                                <li className="hover:text-stone-200 transition-colors">Mysore Wood Inlay & Bidriware (South)</li>
                                <li className="hover:text-stone-200 transition-colors">Madhubani & Pattachitra (East)</li>
                                <li className="hover:text-stone-200 transition-colors">Bamboo & Cane Crafts (Assam / North-East)</li>
                                <li className="hover:text-stone-200 transition-colors">Kutch Mirror Work & Dhokra Bronze (West/Central)</li>
                            </ul>
                        </div>

                        {/* Distributed Engineering Architecture */}
                        <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
                                System Architecture
                            </h4>
                            <ul className="space-y-2 text-xs text-stone-400">
                                <li>• AWS EventBridge & SQS Fulfillment</li>
                                <li>• Transactional Outbox Reliability Pattern</li>
                                <li>• Pessimistic Locking Concurrency Control</li>
                                <li>• Double-Sided Idempotency (Client & Consumer)</li>
                                <li>• Spring Boot 4 + React 19 + PostgreSQL 16</li>
                            </ul>
                        </div>

                        {/* Fulfillment & Reliability */}
                        <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
                                Fulfillment & Reliability
                            </h4>
                            <p className="text-xs text-stone-400 leading-relaxed">
                                Modeled on high-throughput fulfillment center logistics, authentic artisan empowerment, and event-driven distributed systems standards.
                            </p>
                            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-800 text-stone-300 text-[11px] font-mono border border-stone-700">
                                <MapPin className="w-3.5 h-3.5 text-artisan-400" />
                                <span>All-India Rural Hub Routing</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
                        <p>© 2026 KarigarSetu • Designed & Developed by <span className="text-stone-300 font-semibold">Yashaswi Garg</span></p>
                        <p className="flex items-center gap-2">
                            <span>Designed with Tailwind CSS</span>
                            <span>•</span>
                            <span>Powered by Spring Boot & AWS</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Layout;