"use client";

import { AuthContext } from "./auth-context";

import type { ReactNode } from "react";
import type { User } from "@/resources/user";

export type AuthProviderProps = {
	user: User | null;
	children: ReactNode;
};

export function AuthProvider({ user, children }: AuthProviderProps) {
	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
}
