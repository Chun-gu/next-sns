/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { v7 as uuid } from "uuid";

import type { ChangeEvent } from "react";

type ImagePreview = {
	id: string;
	file: File;
	preview: string;
};

type ImageUploadPreviewProps = {
	multiple?: boolean;
};

export function ImageUploadPreview({
	multiple = false,
}: ImageUploadPreviewProps) {
	const imageInputRef = useRef<HTMLInputElement>(null);
	const [selectedImages, setSelectedImages] = useState<Array<ImagePreview>>([]);

	function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
		const files = e.target.files;

		if (files === null) return;

		const imagePreviews: Array<ImagePreview> = Array.from(files).map(
			(file) => ({
				id: uuid(),
				file,
				preview: URL.createObjectURL(file),
			}),
		);

		setSelectedImages((prevImages) => {
			if (multiple) return [...prevImages, ...imagePreviews];
			else {
				prevImages.forEach((img) => URL.revokeObjectURL(img.preview));

				return imagePreviews;
			}
		});
	}

	function handleClickDeletePreview(id: ImagePreview["id"]) {
		setSelectedImages((prevImages) => {
			const newImages = prevImages.filter((img) => img.id !== id);
			const removedImage = prevImages.find((img) => img.id === id);

			if (removedImage) URL.revokeObjectURL(removedImage.preview);

			if (imageInputRef.current) {
				const dt = new DataTransfer();
				newImages.forEach((img) => dt.items.add(img.file));
				imageInputRef.current.files = dt.files;
			}

			return newImages;
		});
	}

	useEffect(() => {
		return () => {
			selectedImages.forEach((img) => URL.revokeObjectURL(img.preview));
		};
	}, [selectedImages]);

	return (
		<div className="flex flex-col space-y-4">
			<div className="flex flex-col">
				<label htmlFor="postImage" className="mb-2 font-bold">
					이미지 첨부
				</label>
				<input
					type="file"
					id="postImage"
					name="postImage"
					accept="image/*"
					multiple={multiple}
					ref={imageInputRef}
					onChange={handleChangeImage}
					className="border p-2 rounded"
				/>
			</div>

			{selectedImages.length > 0 && (
				<div className="grid grid-cols-3 gap-4">
					{selectedImages.map((img) => (
						<div key={img.id} className="relative">
							<img
								src={img.preview}
								alt={`${img.file.name}의 미리보기 이미지`}
								className="w-full h-32 object-cover rounded"
							/>
							<button
								type="button"
								onClick={() => handleClickDeletePreview(img.id)}
								className="absolute top-0 right-0 bg-white text-red-400 font-bold border border-red-400 rounded-full w-6 h-6 flex items-center justify-center hover:text-white hover:bg-red-400"
							>
								<span aria-hidden>X</span>
								<span className="sr-only">이미지 제거하기</span>
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
