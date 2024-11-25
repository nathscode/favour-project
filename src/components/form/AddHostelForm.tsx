"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

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

import { Input } from "@/components/ui/input";
import { places } from "@/data/places";
import { useToast } from "@/hooks/use-toast";
import { AddHostelSchema, AddHostelSchemaInfer } from "@/lib/validators/hostel";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import LoadingButton from "../common/LoadingButton";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";

const AddHostelForm = () => {
	const { toast } = useToast();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const router = useRouter();

	const form = useForm<AddHostelSchemaInfer>({
		resolver: zodResolver(AddHostelSchema),
		defaultValues: {
			name: "",
			description: "",
			location: "",
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async ({
			name,
			location,
			description,
		}: AddHostelSchemaInfer) => {
			const payload: AddHostelSchemaInfer = {
				name,
				location,
				description,
			};
			const { data } = await axios.post("/api/hostel/", payload);
			return data;
		},
		onSuccess: () => {
			form.reset();
			router.refresh();
			return toast({
				title: "Success",
				description: "Hostel Created Successfully",
				variant: "default",
			});
		},
		onError: (err: any) => {
			if (err instanceof AxiosError) {
				if (err.response?.data?.status === 409) {
					return toast({
						title: "An error occurred.",
						description: `${err.response?.data?.errors?.message}`,
						variant: "destructive",
					});
				}

				if (err.response?.status === 422) {
					return toast({
						title: "Invalid credentials.",
						description: `${err.response.data?.errors?.message}`,
						variant: "destructive",
					});
				}
				toast({
					title: "There was an error",
					description:
						"Could not create request, check your network connections",
					variant: "destructive",
				});
			}
		},
	});

	function onSubmit(values: AddHostelSchemaInfer) {
		mutate(values);
		form.reset();
	}
	const onFormError: SubmitErrorHandler<AddHostelSchemaInfer> = (e: any) => {
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
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Hostel Name</FormLabel>
												<FormControl>
													<Input
														disabled={form.formState.isSubmitting}
														placeholder="Hostel Name"
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
																{places.toSorted().map((location, index) => (
																	<SelectItem
																		className="capitalize"
																		key={index}
																		value={location}
																	>
																		{location}
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
								<div className="relative full">
									<FormField
										control={form.control}
										name="description"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Description</FormLabel>
												<FormControl>
													<Textarea
														{...field}
														placeholder="Describe the hostel"
														className="h-full pt-5 px-5 rounded-2xl border-black placeholder:text-gray-400"
													/>
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
								loading={isPending}
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

export default AddHostelForm;
