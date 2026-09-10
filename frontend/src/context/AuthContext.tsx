import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { getCurrentUser } from "../api/users";

interface AuthContextValue {
    token: string | null;
    role: string | null;
    login: (token: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext =
    createContext<AuthContextValue | undefined>(
        undefined
    );

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [token, setToken] =
        useState<string | null>(
            localStorage.getItem("accessToken")
        );
    const [role, setRole] =
        useState<string | null>(null);

    useEffect(() => {
        if (!token) {
            return;
        }

        getCurrentUser()
            .then((user) => setRole(user.role))
            .catch(() => {
                localStorage.removeItem("accessToken");
                setToken(null);
                setRole(null);
            });
    }, [token]);

    async function login(newToken: string) {
        localStorage.setItem(
            "accessToken",
            newToken
        );

        setToken(newToken);
        try {
            const user = await getCurrentUser();
            setRole(user.role);
        } catch {
            setRole(null);
        }
    }

    function logout() {
        localStorage.removeItem(
            "accessToken"
        );

        setToken(null);
        setRole(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                login,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(
        AuthContext
    );

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}