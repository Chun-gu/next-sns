"use client";

import { createContext, useContext } from "react";

import type { User } from "@/resources/user";

export interface AuthContextValue {
	user: User;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
	const authContextValue = useContext(AuthContext);

	if (!authContextValue) {
		throw new Error("useAuth should be used within <AuthProvider>");
	}

	return authContextValue;
}
