"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {};

const RentButton = (props: Props) => {
	const router = useRouter();

	function RentOnClick() {
		console.log("clicked");
		router.push(`/payment?campus=OFFCAMPUS`);
	}
	return (
		<div className="flex flex-col mt-5">
			<Button
				variant={"default"}
				className="bg-brand"
				onClick={() => RentOnClick()}
			>
				Rent Now
			</Button>
		</div>
	);
};

export default RentButton;
