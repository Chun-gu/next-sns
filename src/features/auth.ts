import { getTokens as _getTokens } from "next-firebase-auth-edge";
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged as _onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut as _signOut,
} from "firebase/auth";

import { firebaseConfig, firebaseAuth } from "@/shared/config/firebase";

import { getUserById } from "./user";

import type { User } from "firebase/auth";

export async function getTokens() {
	const { cookies } = await import("next/headers");

	return await _getTokens(cookies(), {
		apiKey: firebaseConfig.app.apiKey,
		cookieName: firebaseConfig.cookie.name,
		cookieSignatureKeys: firebaseConfig.cookie.signatureKeys,
		serviceAccount: firebaseConfig.serviceAccount,
	});
}

export function onAuthStateChanged(cb: (user: User | null) => void) {
	return _onAuthStateChanged(firebaseAuth, cb);
}

export function signUpWithEmail(email: string, password: string) {
	return createUserWithEmailAndPassword(firebaseAuth, email, password);
}

export function signInWithEmail(email: string, password: string) {
	return signInWithEmailAndPassword(firebaseAuth, email, password);
}

export function signInWithGoogle() {
	const googleAuthProvider = new GoogleAuthProvider();

	return signInWithPopup(firebaseAuth, googleAuthProvider);
}

export async function getCurrentUser() {
	const tokens = await getTokens();

	return tokens ? await getUserById(tokens.decodedToken.uid) : null;
}

export async function signOut() {
	await _signOut(firebaseAuth);
	await fetch("/api/logout");
}
