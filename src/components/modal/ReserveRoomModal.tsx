"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import ReserveRoomForm from "../form/ReserveRoomForm";
import { Button } from "../ui/button";
type Props = {};

const ReserveRoomModal = ({ id }: { id: string }) => {
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
					Reserve Hostel Room
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-white text-black p-0 overflow-hidden">
				<DialogHeader className="pt-8 px-6">
					<DialogTitle className="text-xl text-center font-bold">
						Reserve Hostel Room
					</DialogTitle>
				</DialogHeader>
				<div>
					<ReserveRoomForm id={id} />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ReserveRoomModal;
