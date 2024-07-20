import { NextRequest, NextResponse } from "next/server";
import {
	authMiddleware,
	redirectToHome,
	redirectToLogin,
} from "next-firebase-auth-edge";

import { firebaseConfig } from "@/shared/config/firebase";

const PUBLIC_PATHS = ["/register", "/login"];

export async function middleware(request: NextRequest) {
	if (request.nextUrl.pathname === "/") {
		const url = request.nextUrl.clone();
		url.pathname = "/posts";
		return NextResponse.redirect(url);
	}
	return authMiddleware(request, {
		loginPath: "/api/login",
		logoutPath: "/api/logout",
		apiKey: firebaseConfig.app.apiKey,
		cookieName: firebaseConfig.cookie.name,
		cookieSignatureKeys: firebaseConfig.cookie.signatureKeys,
		cookieSerializeOptions: firebaseConfig.cookie.serializeOptions,
		serviceAccount: firebaseConfig.serviceAccount,

		handleValidToken: async ({ token, decodedToken }, headers) => {
			if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
				return redirectToHome(request);
			}

			return NextResponse.next({ request: { headers } });
		},

		handleInvalidToken: async (reason) => {
			console.info("Access with Invalid Token", { reason });

			return redirectToLogin(request, {
				path: "/login",
				publicPaths: PUBLIC_PATHS,
			});
		},

		handleError: async (error) => {
			console.error("Unknown Error at Middleware", { error });

			return redirectToLogin(request, {
				path: "/login",
				publicPaths: PUBLIC_PATHS,
			});
		},
	});
}

export const config = {
	matcher: [
		"/",
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
		"/api/login",
		"/api/logout",
	],
};
