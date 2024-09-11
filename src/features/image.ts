import { v7 as uuid } from "uuid";
import {
	deleteObject,
	getDownloadURL,
	getMetadata,
	ref,
	uploadBytes,
} from "firebase/storage";
import { FirebaseError } from "firebase/app";

import { firebaseStorage } from "@/shared/config/firebase";

import type { StorageReference } from "firebase/storage";

export type ImageName = string;

const ERROR = {
	storage: {
		notFound: "storage/object-not-found",
	},
};

export async function createImage(imageFile: File): Promise<ImageName> {
	const imageName = await generateImageName();
	const snapshot = await uploadBytes(imageStorage(imageName), imageFile);

	return snapshot.metadata.name;
}

export function getImageURL(imageName: ImageName): Promise<ImageName> {
	return getDownloadURL(imageStorage(imageName));
}

export async function deleteImage(imageName: ImageName) {
	await deleteObject(imageStorage(imageName));
}

async function generateImageName(): Promise<ImageName> {
	while (true) {
		let imageName = uuid();

		if (await isUniqueImageName(imageName)) return imageName;
	}
}

async function isUniqueImageName(imageName: ImageName): Promise<boolean> {
	try {
		await getMetadata(imageStorage(imageName));
	} catch (error) {
		if (error instanceof FirebaseError && error.code === ERROR.storage.notFound)
			return true;
		else throw error;
	}

	return false;
}

function imageStorage(imageName: ImageName): StorageReference {
	return ref(firebaseStorage, `images/${imageName}`);
}
