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
import { StudentSchema, StudentSchemaInfer } from "@/lib/validators/auth";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import LoadingButton from "../common/LoadingButton";
import { ScrollArea } from "../ui/scroll-area";

const StudentForm = () => {
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<StudentSchemaInfer>({
		resolver: zodResolver(StudentSchema),
		defaultValues: {
			level: "",
			department: "",
		},
	});

	const { mutate: StudentFunc, isPending } = useMutation({
		mutationFn: async ({ level, department }: StudentSchemaInfer) => {
			const { data } = await axios.post("/api/auth/student", {
				level,
				department,
			});
			return data;
		},
	});

	function onSubmit(values: StudentSchemaInfer) {
		StudentFunc(
			{
				department: values.department.toLowerCase(),
				level: values.level,
			},
			{
				onSuccess: () => {
					form.reset();
					router.refresh();
					return toast({
						title: "Success",
						description: "Profile Updated Successfully",
						variant: "default",
					});
				},
				onError: (err: any) => {
					if (err instanceof AxiosError) {
						if (err.response?.data?.status === 400) {
							return toast({
								title: "An error occurred.",
								description: `${err.response?.data?.errors?.message}`,
								variant: "destructive",
							});
						}
						if (err.response?.data?.status === 401) {
							return toast({
								title: "Unverified account",
								description: `${err.response?.data?.errors?.message}`,
								variant: "destructive",
							});
						}

						if (err.response?.data?.status === 404) {
							return toast({
								title: "Invalid credentials.",
								description: `${err.response.data?.errors?.message}`,
								variant: "destructive",
							});
						}
						toast({
							title: "There was an error",
							description: "Server error",
							variant: "destructive",
						});
					}
				},
			}
		);
	}

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
										name="department"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Department</FormLabel>
												<FormControl>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Select department" />
														</SelectTrigger>
														<SelectContent>
															<ScrollArea className="h-[150px] w-full">
																{departments
																	.toSorted()
																	.map((department, index) => (
																		<SelectItem
																			className="capitalize"
																			key={index}
																			value={department}
																		>
																			{department}
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
										name="level"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Level</FormLabel>
												<FormControl>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Level" />
														</SelectTrigger>
														<SelectContent>
															{["100", "200", "300", "400", "500"].map(
																(level, index) => (
																	<SelectItem key={index} value={level}>
																		{level}
																	</SelectItem>
																)
															)}
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

export default StudentForm;
