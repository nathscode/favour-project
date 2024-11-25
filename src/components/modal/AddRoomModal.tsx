"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import AddRoomForm from "../form/AddRoomForm";
import { Button } from "../ui/button";

const AddRoomModal = ({ id }: { id: string }) => {
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
					Add Room
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-white text-black p-0 overflow-hidden">
				<DialogHeader className="pt-8 px-6">
					<DialogTitle className="text-xl text-center font-bold">
						Add Room
					</DialogTitle>
				</DialogHeader>
				<div>
					<AddRoomForm id={id} />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AddRoomModal;
