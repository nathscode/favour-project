"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";

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
import { addRoomAction } from "@/actions/addRoomAction";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AddRoomSchema, AddRoomSchemaInfer } from "@/lib/validators/hostel";
import { useRouter } from "next/navigation";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import LoadingButton from "../common/LoadingButton";
import { ScrollArea } from "../ui/scroll-area";

const AddRoomForm = ({ id }: { id: string }) => {
	const { toast } = useToast();
	const router = useRouter();
	const [isLoading, startTransition] = useTransition();

	const form = useForm<AddRoomSchemaInfer>({
		resolver: zodResolver(AddRoomSchema),
		defaultValues: {
			id: id,
			roomNumber: "",
			capacity: "4",
		},
	});

	function onSubmit(values: AddRoomSchemaInfer) {
		startTransition(async () => {
			const result = await addRoomAction(values);
			router.refresh();
			toast({ title: `${result?.message}` });
		});
		form.reset();
	}
	const onFormError: SubmitErrorHandler<AddRoomSchemaInfer> = (e: any) => {
		console.log(e);
	};

	return (
		<div className="flex justify-start flex-col w-full">
			<div className="flex justify-start gap-y-4 flex-col md:flex-row w-full">
				<div className="flex flex-col flex-1 shadow-xl rounded-lg px-5 py-8 border bg-white w-full">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit, onFormError)}
							className="w-full mt-4"
						>
							<div className="space-y-4">
								<div className="relative full">
									<FormField
										control={form.control}
										name="roomNumber"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Room Number</FormLabel>
												<FormControl>
													<Input
														disabled={form.formState.isSubmitting}
														placeholder="Room Number"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="relative w-full">
									<FormField
										control={form.control}
										name="capacity"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Capacity</FormLabel>
												<FormControl>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Room capacity" />
														</SelectTrigger>
														<SelectContent>
															<ScrollArea className="h-[150px]">
																{Array.from({ length: 10 }).map((_, index) => (
																	<SelectItem
																		key={index}
																		value={String(index + 1)}
																	>
																		{index + 1}
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

export default AddRoomForm;
