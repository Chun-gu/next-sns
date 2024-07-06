import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
	app: {
		appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
		apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	},
	cookie: {
		name: process.env.AUTH_COOKIE_NAME!,
		signatureKeys: [
			process.env.AUTH_COOKIE_SIGNATURE_KEY_CURRENT!,
			process.env.AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS!,
		],
		serializeOptions: {
			path: "/",
			httpOnly: true,
			secure: process.env.USE_SECURE_COOKIES === "true",
			sameSite: "lax" as const,
			maxAge: 12 * 60 * 60 * 24,
		},
	},
	serviceAccount: {
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
		privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
		clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
	},
};

export const firebaseApp =
	getApps().length === 0 ? initializeApp(firebaseConfig.app) : getApp();

export const firebaseDB = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
