import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { Sparkles, Mail, Lock, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

function RegisterPage() {
    const navigate = useNavigate();
    const { login: saveToken } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await register({ email, password });
            await saveToken(response.accessToken);
            navigate("/products");
        } catch {
            setError("Registration failed. Please choose a strong password (minimum 8 characters) and try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-[calc(100vh-250px)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-xl space-y-7">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-artisan-600 to-amber-600 text-white flex items-center justify-center mx-auto shadow-md shadow-artisan-600/20">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                        Join KarigarSetu
                    </h1>
                    <p className="text-xs text-stone-500">
                        Discover authentic handicrafts directly from generational rural makers
                    </p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-700" htmlFor="email">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-artisan-500/20 focus:border-artisan-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-700" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="At least 8 characters"
                                required
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-artisan-500/20 focus:border-artisan-500 transition-all"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 rounded-xl bg-artisan-600 hover:bg-artisan-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Creating Account...</span>
                            </>
                        ) : (
                            <>
                                <span>Create Account</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer Switch */}
                <div className="pt-4 border-t border-stone-100 text-center text-xs text-stone-500">
                    <span>Already have an account? </span>
                    <Link to="/login" className="font-bold text-artisan-700 hover:underline">
                        Sign in instead
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;