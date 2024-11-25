"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { SafeRoom } from "@/types";
import { useEffect, useState } from "react";
import AttachRoomForm from "../form/AttachRoomForm";
import { Button } from "../ui/button";
type Props = {};

const AttachRoomModal = ({ id, rooms }: { id: string; rooms: SafeRoom[] }) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default" size="lg" disabled={false}>
					Assign Room
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-white text-black p-0 overflow-hidden">
				<DialogHeader className="pt-8 px-6">
					<DialogTitle className="text-xl text-center font-bold">
						Assign Room
					</DialogTitle>
				</DialogHeader>
				<div>
					<AttachRoomForm id={id} rooms={rooms} />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AttachRoomModal;
