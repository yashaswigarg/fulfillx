import { AlertCircle } from "lucide-react";

interface MessageProps {
    children: React.ReactNode;
    type?: "error" | "info" | "success";
}

function Message({ children, type = "error" }: MessageProps) {
    const styleMap = {
        error: "bg-red-50 text-red-700 border-red-200",
        info: "bg-blue-50 text-blue-700 border-blue-200",
        success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };

    return (
        <div
            role="alert"
            className={`p-3.5 rounded-xl border text-xs font-medium flex items-center gap-2.5 ${styleMap[type]}`}
        >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{children}</span>
        </div>
    );
}

export default Message;