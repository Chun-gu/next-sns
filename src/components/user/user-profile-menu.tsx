"use client";

import Image from "next/image";
import { getImageURL } from "@/features/image";
import { cn } from "@/shared/lib/utils";
import { UserRound } from "lucide-react";

import type { User } from "@/resources/user";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { useAuth } from "../auth/auth-context";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
	className?: string;
};

export const UserProfileMenu = ({ className }: Props) => {
	const [imageURL, setImageURL] = useState("");

	const { user } = useAuth();

	useEffect(() => {
		getImageURL(user.profileImageName).then((imageURL) =>
			setImageURL(imageURL),
		);
	}, [user.profileImageName]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button>
					<Avatar>
						<AvatarImage
							// src={`https://firebasestorage.googleapis.com/images/${user.profileImageName}`}
							src={imageURL}
							alt={user.nickname}
						/>
						<AvatarFallback>
							<UserRound />
						</AvatarFallback>
					</Avatar>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<DropdownMenuLabel>{user.nickname}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuLabel>
					<Link href={"/users/me"}>프로필</Link>
				</DropdownMenuLabel>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
