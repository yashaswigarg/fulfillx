import { CheckCircle2, Clock, Truck, Package, Home, Sparkles } from "lucide-react";

interface FulfillmentStatusProps {
    status: string;
    trackingNumber?: string;
    originHub?: string;
}

interface Step {
    key: string;
    label: string;
    description: string;
    icon: typeof Package;
}

const steps: Step[] = [
    {
        key: "PENDING",
        label: "Order Verified",
        description: "Payment confirmed, routed to artisan cluster",
        icon: Sparkles,
    },
    {
        key: "PROCESSING",
        label: "Handcraft Inspection",
        description: "Quality verification at local village center",
        icon: Package,
    },
    {
        key: "PACKED",
        label: "Secured Packaging",
        description: "Artisan bubble-wrapped with authenticity certificate",
        icon: Package,
    },
    {
        key: "SHIPPED",
        label: "In Transit",
        description: "Dispatched from regional cluster to destination hub",
        icon: Truck,
    },
    {
        key: "DELIVERED",
        label: "Delivered",
        description: "Safely received at customer doorstep",
        icon: Home,
    },
];

function FulfillmentStatus({ status, trackingNumber, originHub }: FulfillmentStatusProps) {
    const rawStatus = (status || "PENDING").toUpperCase();
    const isCancelled = rawStatus === "CANCELLED";

    let activeStepIndex = steps.findIndex((s) => s.key === rawStatus);
    if (activeStepIndex === -1) {
        activeStepIndex = 0;
    }

    return (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
                <div>
                    <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                        <Truck className="w-5 h-5 text-artisan-600" />
                        <span>Fulfillment & Delivery Pipeline</span>
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                        {originHub ? `Origin Cluster: ${originHub}` : "Routed through Regional Rural Sorting Hub"}
                    </p>
                </div>
                {trackingNumber && (
                    <div className="inline-flex items-center gap-1.5 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200/80">
                        <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">Tracking ID:</span>
                        <span className="font-mono text-xs font-bold text-stone-800">{trackingNumber}</span>
                    </div>
                )}
            </div>

            {isCancelled ? (
                <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm font-medium border border-red-200 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>This fulfillment was cancelled.</span>
                </div>
            ) : (
                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {steps.map((step, idx) => {
                            const isCompleted = idx <= activeStepIndex;
                            const isCurrent = idx === activeStepIndex;
                            const IconComponent = step.icon;

                            return (
                                <div key={step.key} className="relative flex md:flex-col items-start gap-3 md:gap-2">
                                    {/* Indicator Dot */}
                                    <div className="flex items-center">
                                        <div
                                            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                                                isCompleted
                                                    ? isCurrent
                                                        ? "bg-artisan-600 text-white ring-4 ring-artisan-100 shadow-sm"
                                                        : "bg-emerald-600 text-white"
                                                    : "bg-stone-100 text-stone-400 border border-stone-300"
                                            }`}
                                        >
                                            {isCompleted && !isCurrent ? (
                                                <CheckCircle2 className="w-5 h-5" />
                                            ) : (
                                                <IconComponent className="w-4 h-4" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Text Info */}
                                    <div className="space-y-0.5">
                                        <div className="flex items-center gap-1.5">
                                            <span
                                                className={`text-xs font-bold ${
                                                    isCurrent
                                                        ? "text-artisan-700"
                                                        : isCompleted
                                                        ? "text-stone-900"
                                                        : "text-stone-400"
                                                }`}
                                            >
                                                {step.label}
                                            </span>
                                            {isCurrent && (
                                                <span className="inline-block w-2 h-2 rounded-full bg-artisan-500 animate-ping" />
                                            )}
                                        </div>
                                        <p className="text-[11px] text-stone-500 leading-tight">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default FulfillmentStatus;