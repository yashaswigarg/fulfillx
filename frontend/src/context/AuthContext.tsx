import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

interface AuthContextValue {
    token: string | null;
    login: (token: string) => void;
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

    function login(newToken: string) {
        localStorage.setItem(
            "accessToken",
            newToken
        );

        setToken(newToken);
    }

    function logout() {
        localStorage.removeItem(
            "accessToken"
        );

        setToken(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
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