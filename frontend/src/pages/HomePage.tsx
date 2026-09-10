import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, ShieldCheck, Truck, MapPin, Award } from "lucide-react";

export default function HomePage() {
    const craftClusters = [
        {
            town: "Patiala",
            state: "Punjab (North)",
            craft: "Phulkari Embroidery",
            image: "/images/crafts/phulkari.jpg",
            artisan: "Simranjeet Kaur & Self-Help Collective",
            description: "Colorful, geometric flower embroidery on coarse cotton and chanderi fabric."
        },
        {
            town: "Mysore",
            state: "Karnataka (South)",
            craft: "Mysore Wood Inlay",
            image: "/images/crafts/mysore_inlay.jpg",
            artisan: "Narayana Swamy Master Inlayer",
            description: "Embeds fine cuts of colored natural wood veneers into solid timber panels."
        },
        {
            town: "Madhubani",
            state: "Bihar (East)",
            craft: "Madhubani Painting",
            image: "/images/crafts/madhubani.jpg",
            artisan: "Sunita Devi (Mithila Mahila Sangh)",
            description: "Traditional folk paintings made with natural plant dyes depicting the sacred Tree of Life."
        },
        {
            town: "Bhuj",
            state: "Gujarat (West)",
            craft: "Kutch Mirror Work",
            image: "/images/crafts/kutch_mirrorwork.jpg",
            artisan: "Deviben Rabari Collective",
            description: "Vibrant threadwork embedded with tiny mirrors, popular in apparel and decor."
        }
    ];

    return (
        <div className="space-y-20 pb-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-amber-100/60 via-amber-50/40 to-stone-50 pt-16 pb-24 border-b border-amber-200/50">
                {/* Decorative glow */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-artisan-400/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        {/* Tag pill */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-artisan-200 text-artisan-800 text-xs font-semibold shadow-xs">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>Direct from Verified Rural Artisans & Tribal Guilds</span>
                        </div>

                        {/* Heading */}
                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
                            Authentic Indian Crafts,{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-artisan-700 via-amber-700 to-artisan-800">
                                Delivered from Small Towns
                            </span>{" "}
                            to Your Home
                        </h1>

                        {/* Subtext */}
                        <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                            Eliminating middlemen to empower generational craftspeople from Punjab, Kashmir, Rajasthan, Karnataka, Bihar, Assam, and Gujarat with direct fair-price access.
                        </p>

                        {/* CTA buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                            <Link
                                to="/products"
                                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-artisan-600 hover:bg-artisan-700 text-white font-bold text-base shadow-lg shadow-artisan-600/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                            >
                                <span>Explore Handcrafted Treasures</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                to="/orders"
                                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-semibold text-base border border-stone-300/80 shadow-xs hover:shadow transition-all flex items-center justify-center gap-2"
                            >
                                <Truck className="w-5 h-5 text-artisan-600" />
                                <span>Track Deliveries</span>
                            </Link>
                        </div>

                        {/* Metric stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-amber-200/60 max-w-3xl mx-auto">
                            <div className="p-3 bg-white/60 backdrop-blur-xs rounded-xl border border-stone-200/60">
                                <div className="font-serif text-2xl font-bold text-stone-900">Direct</div>
                                <div className="text-xs text-stone-500 font-medium">Artisan Collectives</div>
                            </div>
                            <div className="p-3 bg-white/60 backdrop-blur-xs rounded-xl border border-stone-200/60">
                                <div className="font-serif text-2xl font-bold text-stone-900">Pan-India</div>
                                <div className="text-xs text-stone-500 font-medium">Craft Traditions</div>
                            </div>
                            <div className="p-3 bg-white/60 backdrop-blur-xs rounded-xl border border-stone-200/60">
                                <div className="font-serif text-2xl font-bold text-stone-900">100%</div>
                                <div className="text-xs text-stone-500 font-medium">Fair Trade Direct</div>
                            </div>
                            <div className="p-3 bg-white/60 backdrop-blur-xs rounded-xl border border-stone-200/60">
                                <div className="font-serif text-2xl font-bold text-stone-900">AWS + SQS</div>
                                <div className="text-xs text-stone-500 font-medium">Reliable Pipeline</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Craft Clusters */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-artisan-700">Small Towns, Grand Heritage</span>
                        <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">Featured Rural Craft Clusters</h2>
                    </div>
                    <Link
                        to="/products"
                        className="text-sm font-semibold text-artisan-700 hover:text-artisan-800 flex items-center gap-1 group"
                    >
                        <span>View All Handcrafts</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {craftClusters.map((cluster) => (
                        <div
                            key={cluster.town}
                            className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                            <div className="aspect-4/3 overflow-hidden bg-stone-100 relative">
                                <img
                                    src={cluster.image}
                                    alt={cluster.craft}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-md">
                                    {cluster.craft}
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                                <div>
                                    <div className="flex items-center gap-1 text-xs text-artisan-700 font-semibold">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span>{cluster.town}, {cluster.state}</span>
                                    </div>
                                    <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                                        {cluster.description}
                                    </p>
                                </div>
                                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                                    <span className="text-stone-500 font-medium truncate">{cluster.artisan}</span>
                                    <Link
                                        to="/products"
                                        className="text-artisan-600 font-bold hover:underline"
                                    >
                                        Explore →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why KarigarSetu - Enterprise Architecture & Reliability Pillars */}
            <section className="bg-amber-50/50 py-16 border-y border-amber-200/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-xs font-bold uppercase tracking-wider text-artisan-700">Engineering & Ethics</span>
                        <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">Built with Enterprise-Grade Architecture</h2>
                        <p className="text-stone-600 text-sm mt-2">
                            A production-ready platform designed for extreme concurrency, distributed consistency, and seamless package tracking.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                            <div className="w-12 h-12 rounded-xl bg-artisan-100 text-artisan-700 flex items-center justify-center font-bold">
                                <Award className="w-6 h-6" />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-stone-900">Zero Middlemen, Direct Payout</h3>
                            <p className="text-xs text-stone-600 leading-relaxed">
                                Payments go directly to rural artisan collectives and self-help groups, preserving dying generational craft techniques.
                            </p>
                        </div>

                        <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-stone-900">Transactional Outbox & Idempotency</h3>
                            <p className="text-xs text-stone-600 leading-relaxed">
                                Prevents dual-write errors, double-charging, and duplicate fulfillment using client Idempotency Keys and consumer message deduplication.
                            </p>
                        </div>

                        <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                                <Truck className="w-6 h-6" />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-stone-900">AWS EventBridge & SQS Pipeline</h3>
                            <p className="text-xs text-stone-600 leading-relaxed">
                                Modeled on modern fulfillment center logistics. Order events are decoupled asynchronously into SQS with automated DLQ retry policies.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
