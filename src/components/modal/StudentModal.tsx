"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import StudentForm from "../form/StudentForm";
import { Button } from "../ui/button";
type Props = {};

const StudentModal = (props: Props) => {
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
					Complete your profile
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-white text-black p-0 overflow-hidden">
				<DialogHeader className="pt-8 px-6">
					<DialogTitle className="text-xl text-center font-bold">
						Complete Profile
					</DialogTitle>
				</DialogHeader>
				<div>
					<StudentForm />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default StudentModal;
