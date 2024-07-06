import Image from "next/image";
import { useRef, useState } from "react";

import { getImageURL, createImage } from "@/features/image";

import type { FormEvent } from "react";

export function ImageUploader() {
	const [imageURL, setImageURL] = useState("");

	const imageInputRef = useRef<HTMLInputElement>(null);

	async function handleSubmitImage(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const imageFile = imageInputRef.current!.files![0];
		const imageName = await createImage(imageFile);
		const imageURL = await getImageURL(imageName);

		setImageURL(imageURL);
	}

	return (
		<>
			<div>
				{imageURL && <Image src={imageURL} alt="" width={500} height={500} />}
			</div>

			<form onSubmit={handleSubmitImage}>
				<input ref={imageInputRef} type="file" name="image" accept="image/*" />
				<button>업로드</button>
			</form>
		</>
	);
}
