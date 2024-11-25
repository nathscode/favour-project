"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import AddHostelForm from "../form/AddHostelForm";
import { Button } from "../ui/button";
type Props = {};

const AddHostelModal = (props: Props) => {
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
					Add Hostel
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-white text-black p-0 overflow-hidden">
				<DialogHeader className="pt-8 px-6">
					<DialogTitle className="text-xl text-center font-bold">
						Add Hostel
					</DialogTitle>
				</DialogHeader>
				<div>
					<AddHostelForm />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AddHostelModal;
