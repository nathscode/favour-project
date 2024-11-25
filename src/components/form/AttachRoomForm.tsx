"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { attachRoomAction } from "@/actions/attachRoomAction";
import { useToast } from "@/hooks/use-toast";
import {
	AttachRoomSchema,
	AttachRoomSchemaInfer,
} from "@/lib/validators/hostel";
import { SafeRoom } from "@/types";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import LoadingButton from "../common/LoadingButton";
import { ScrollArea } from "../ui/scroll-area";

const AttachRoomForm = ({ id, rooms }: { id: string; rooms: SafeRoom[] }) => {
	const { toast } = useToast();
	const router = useRouter();
	const [isLoading, startTransition] = useTransition();

	const form = useForm<AttachRoomSchemaInfer>({
		resolver: zodResolver(AttachRoomSchema),
		defaultValues: {
			id: id,
			roomId: "",
		},
	});

	function onSubmit(values: AttachRoomSchemaInfer) {
		startTransition(async () => {
			const result = await attachRoomAction(values);
			router.refresh();
			toast({ title: `${result?.message}` });
		});
		form.reset();
	}
	const onFormError: SubmitErrorHandler<AttachRoomSchemaInfer> = (e: any) => {
		console.log(e);
	};

	return (
		<div className="flex justify-start flex-col w-full">
			<div className="flex justify-start gap-y-4 flex-col md:flex-row w-full">
				<div className="flex flex-col flex-1 shadow-xl rounded-lg px-5 py-8 border bg-white w-full">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full mt-4"
						>
							<div className="space-y-4">
								<div className="relative w-full">
									<FormField
										control={form.control}
										name="roomId"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Room</FormLabel>
												<FormControl>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Select rooms" />
														</SelectTrigger>
														<SelectContent>
															<ScrollArea className="h-[150px] w-full">
																{rooms.toSorted().map((room, index) => (
																	<SelectItem
																		className="capitalize"
																		key={index}
																		value={room.id}
																	>
																		{`${room.roomNumber} ${room[0].hostel.name}`}
																	</SelectItem>
																))}
															</ScrollArea>
														</SelectContent>
													</Select>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<LoadingButton
								variant={"brand"}
								type="submit"
								loading={isLoading}
								className="mt-6 w-full"
							>
								Submit
							</LoadingButton>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default AttachRoomForm;
