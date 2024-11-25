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

import { departments } from "@/data/departments";
import { useToast } from "@/hooks/use-toast";
import {
	ReserveRoomSchema,
	ReserveRoomSchemaInfer,
} from "@/lib/validators/hostel";
import { useRouter } from "next/navigation";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import LoadingButton from "../common/LoadingButton";
import { ScrollArea } from "../ui/scroll-area";
import { places } from "@/data/places";
import { updateReserveStore } from "../store/reserve-store";

const ReserveRoomForm = ({ id }: { id: string }) => {
	const { toast } = useToast();
	const router = useRouter();
	const { setUpdateReserve } = updateReserveStore();

	const form = useForm<ReserveRoomSchemaInfer>({
		resolver: zodResolver(ReserveRoomSchema),
		defaultValues: {
			id: id,
			campus: "",
			location: "",
		},
	});

	function onSubmit(values: ReserveRoomSchemaInfer) {
		setUpdateReserve({
			id: values.id,
			campus: values.campus,
			location: values.location,
		});
		router.push(`/payment?campus=${values.campus}`);
		form.reset();
	}
	const onFormError: SubmitErrorHandler<ReserveRoomSchemaInfer> = (e: any) => {
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
										name="location"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Location</FormLabel>
												<FormControl>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Select location" />
														</SelectTrigger>
														<SelectContent>
															<ScrollArea className="h-[150px] w-full">
																{places.toSorted().map((place, index) => (
																	<SelectItem
																		className="capitalize"
																		key={index}
																		value={place}
																	>
																		{place}
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

								<div className="relative w-full">
									<FormField
										control={form.control}
										name="campus"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Campus</FormLabel>
												<FormControl>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Select Campus" />
														</SelectTrigger>
														<SelectContent>
															{["CAMPUS", "OFFCAMPUS"].map((campus, index) => (
																<SelectItem key={index} value={campus}>
																	{campus}
																</SelectItem>
															))}
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
								loading={form.formState.isSubmitting}
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

export default ReserveRoomForm;
