import { createContext, useContext } from "react";

import type { User } from "@/resources/user";

export interface AuthContextValue {
	user: User | null;
}

export const AuthContext = createContext<AuthContextValue>({
	user: null,
});

export function useAuth() {
	return useContext(AuthContext);
}
