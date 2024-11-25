"use client";
import React from "react";
import { CustomUser } from "@/types";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getFirstTwoLetters } from "@/lib/utils";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

type Props = {
	session: CustomUser;
};

const NavBarDropdown = ({ session }: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className="flex flex-col justify-center items-center size-10 rounded-full bg-black sm:bg-white text-white sm:text-gray-900">
					<span className="font-bold text-lg uppercase">
						{getFirstTwoLetters(session?.email!)}
					</span>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>
					<Link href={"/profile"}>My Profile</Link>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Button
						onClick={() => signOut({ callbackUrl: "/" })}
						type="button"
						variant={"link"}
					>
						Log out
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default NavBarDropdown;
