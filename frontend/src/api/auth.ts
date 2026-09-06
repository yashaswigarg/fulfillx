import apiClient from "./client";
import type { AuthResponse } from "../types/api";

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    email: string;
    password: string;
}

export async function login(
    request: LoginRequest
): Promise<AuthResponse> {
    const response =
        await apiClient.post<AuthResponse>(
            "/auth/login",
            request
        );

    return response.data;
}

export async function register(
    request: RegisterRequest
): Promise<AuthResponse> {
    const response =
        await apiClient.post<AuthResponse>(
            "/auth/register",
            request
        );

    return response.data;
}