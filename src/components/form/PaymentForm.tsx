"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { Check, CheckCircleIcon, Copy, Router } from "lucide-react";
import { Button } from "../ui/button";
import { updateReserveStore } from "../store/reserve-store";
import { useRouter, useSearchParams } from "next/navigation";
import { reserveRoomAction } from "@/actions/reserveRoomAction";
import { useToast } from "@/hooks/use-toast";
import { PaymentMethod } from "@prisma/client";

const PAYMENT_TYPES = [
	{ name: "Cash Payment", key: PaymentMethod.CASH },
	{ name: "POS Payment", key: PaymentMethod.POS },
	{ name: "Remita", key: PaymentMethod.REMITA },
	{ name: "Bank Transfer", key: PaymentMethod.TRANSFER },
] as const;

interface PaymentFormProps {
	subTotal: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ subTotal }) => {
	const [isPending, startTransition] = React.useTransition();
	const [selected, setSelected] = useState(PAYMENT_TYPES[3]);
	const [copiedState, setCopiedState] = useState({
		account: false,
		amount: false,
	});

	const { setUpdateReserve, updateReserve, clearReserve } =
		updateReserveStore();
	const params = useSearchParams();
	const { toast } = useToast();
	const router = useRouter();

	const campusType =
		params.get("campus") === "CAMPUS" ? "Hostel" : "Off Campus Apartment";

	const BANK_DETAILS = {
		name: "Heritage Bank Plc",
		accountName: "Federal University of Petroleum Resources Effurun",
		accountNumber: "0123456789",
	};

	const handleCopy = useCallback(
		(text: string, field: "account" | "amount") => {
			navigator.clipboard.writeText(text);
			setCopiedState((prev) => ({ ...prev, [field]: true }));

			const timer = setTimeout(() => {
				setCopiedState((prev) => ({ ...prev, [field]: false }));
			}, 1000);

			return () => clearTimeout(timer);
		},
		[]
	);

	useEffect(() => {
		setUpdateReserve({
			paymentType: selected.key,
			amount: subTotal,
		});
	}, [selected, subTotal, updateReserve]);

	const handleSubmit = () => {
		if (!updateReserve.campus || !updateReserve.amount) {
			toast({
				title: "Incomplete Reservation",
				description: "Please complete your profile first",
			});
			return;
		}

		const formData = new FormData();
		formData.append("id", updateReserve.id!);
		formData.append("campus", updateReserve.campus!);
		formData.append("location", updateReserve.location!);
		formData.append("paymentMethod", updateReserve.paymentType!);
		formData.append("amount", subTotal.toString());

		startTransition(async () => {
			try {
				const result = await reserveRoomAction(formData);
				toast({
					title: result.success
						? "Reservation Successful"
						: "Reservation Failed",
					description: result.message,
				});

				if (result.success) {
					clearReserve();
					router.push("/profile");
				}
			} catch (error) {
				toast({
					title: "Error",
					description: "An unexpected error occurred",
				});
			}
		});
	};

	return (
		<div className="flex flex-col w-full my-4 space-y-4">
			<div>
				<h2 className="text-lg">
					You're about to make payment for <strong>{campusType}</strong>
				</h2>
			</div>

			<div>
				<h2 className="text-sm uppercase font-bold">SELECT PAYMENT OPTION</h2>
				<p className="text-sm text-red-400">
					Note: Select a payment type to proceed.
				</p>
			</div>

			<RadioGroup
				value={selected}
				onChange={setSelected}
				aria-label="Payment Type"
				className="space-y-3"
			>
				{PAYMENT_TYPES.map((type) => (
					<Radio
						key={type.key}
						value={type}
						className="group relative flex cursor-pointer rounded-lg bg-white/5 px-4 py-3 w-full text-gray-600 transition border data-[checked]:bg-brand data-[checked]:text-white"
					>
						<div className="flex items-center justify-between w-full">
							<p className="font-bold uppercase text-sm">{type.name}</p>
							<CheckCircleIcon className="size-6 fill-brand opacity-0 transition group-data-[checked]:opacity-100" />
						</div>
					</Radio>
				))}
			</RadioGroup>

			{selected.key === PaymentMethod.TRANSFER && (
				<div className="bg-gray-100 rounded-lg p-4 space-y-4">
					<div className="space-y-2">
						{Object.entries(BANK_DETAILS).map(([key, value]) => (
							<div key={key} className="flex flex-col">
								<h4 className="uppercase text-[12px] text-neutral-600 mb-1">
									{key.replace(/([A-Z])/g, " $1").toUpperCase()}
								</h4>
								<p className="text-[14px] font-medium">{value}</p>
							</div>
						))}

						<div className="flex justify-between items-center">
							<span className="text-[14px] font-medium">
								{BANK_DETAILS.accountNumber}
							</span>
							<Button
								onClick={() =>
									handleCopy(BANK_DETAILS.accountNumber, "account")
								}
								variant="ghost"
								size="icon"
							>
								{copiedState.account ? (
									<Check className="w-4 h-4 text-green-400" />
								) : (
									<Copy className="w-4 h-4" />
								)}
							</Button>
						</div>

						<div className="flex justify-between items-center">
							<span className="text-[14px] font-medium">{subTotal}</span>
							<Button
								onClick={() => handleCopy(subTotal.toString(), "amount")}
								variant="ghost"
								size="icon"
							>
								{copiedState.amount ? (
									<Check className="w-4 h-4 text-green-400" />
								) : (
									<Copy className="w-4 h-4" />
								)}
							</Button>
						</div>
					</div>

					<p className="text-[14px] text-red-400">
						Ensure you send the exact amount to avoid failed orders.
					</p>
				</div>
			)}

			<Button onClick={handleSubmit} disabled={isPending} className="w-full">
				{isPending ? "Processing..." : "Reserve Now"}
			</Button>
		</div>
	);
};

export default PaymentForm;
