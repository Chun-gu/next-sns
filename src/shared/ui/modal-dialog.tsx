"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import type { ComponentPropsWithRef } from "react";

type DialogProps = ComponentPropsWithRef<"dialog">;

export function Dialog({ children, ...props }: DialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const router = useRouter();

	function handleOpenDialog() {
		dialogRef.current?.showModal();
	}

	function handleCloseDialog() {
		router.back();
		// dialogRef.current?.close();
	}

	useEffect(() => {
		dialogRef.current?.showModal();

		function handleKeyDown(e: KeyboardEvent) {
			if (e.code === "Escape") router.back();
		}

		addEventListener("keydown", handleKeyDown);

		return () => {
			removeEventListener("keydown", handleKeyDown);
		};
	});

	return (
		<dialog ref={dialogRef} {...props}>
			{children}
			<button onClick={handleCloseDialog}>닫기</button>
		</dialog>
	);
}
