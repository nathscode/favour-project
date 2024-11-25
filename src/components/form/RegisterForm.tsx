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
import { useToast } from "@/hooks/use-toast";
import { RegisterSchema, RegisterSchemaInfer } from "@/lib/validators/auth";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import LoadingButton from "../common/LoadingButton";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
	const { toast } = useToast();
	const router = useRouter();
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const form = useForm<RegisterSchemaInfer>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: "",
			email: "",
			gender: "",
			role: "",
			mobileNumber: "",
			password: "",
		},
	});

	const { mutate: RegisterFunc, isPending } = useMutation({
		mutationFn: async ({
			name,
			email,
			gender,
			mobileNumber,
			role,
			password,
		}: RegisterSchemaInfer) => {
			const { data } = await axios.post("/api/auth/register", {
				name,
				email,
				gender,
				mobileNumber,
				role,
				password,
			});
			return data;
		},
	});

	function onSubmit(values: RegisterSchemaInfer) {
		RegisterFunc(
			{
				name: values.name.toLowerCase(),
				email: values.email.toLowerCase(),
				gender: values.gender.toLowerCase(),
				role: values.role.toUpperCase(),
				mobileNumber: values.mobileNumber.toLowerCase(),
				password: values.password,
			},
			{
				onSuccess: (data) => {
					router.push(`/profile`);
					form.reset();
					return toast({
						description: "Account created successfully, verify your account",
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
						if (err.response?.data?.status === 409) {
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
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	return (
		<div className="flex justify-start flex-col w-full">
			<div className="flex justify-start gap-y-4 flex-col md:flex-row w-full">
				<div className="flex flex-col flex-1 shadow-xl rounded-lg px-5 py-8 border bg-white w-full">
					<h2 className="text-2xl font-semibold leading-tight text-foreground sm:text-2xl">
						Register
					</h2>{" "}
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full mt-4"
						>
							<div className="space-y-4">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Full Name</FormLabel>
											<FormControl>
												<Input
													disabled={form.formState.isSubmitting}
													placeholder="John Doe"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													disabled={form.formState.isSubmitting}
													placeholder="mail@example.com"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex justify-between flex-col space-y-2 md:flex-row w-full md:space-x-2 md:space-y-0">
									<div className="w-full md:w-1/3">
										<FormField
											control={form.control}
											name="mobileNumber"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Phone Number</FormLabel>
													<FormControl>
														<Input
															disabled={form.formState.isSubmitting}
															placeholder="+234903493939"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="w-full md:w-1/3">
										<FormField
											control={form.control}
											name="gender"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Gender</FormLabel>
													<FormControl>
														<Select
															onValueChange={field.onChange}
															defaultValue={field.value}
														>
															<SelectTrigger className="w-full">
																<SelectValue placeholder="Gender" />
															</SelectTrigger>
															<SelectContent>
																{["Male", "Female"].map((gender, index) => (
																	<SelectItem key={index} value={gender}>
																		{gender}
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
									<div className="w-full md:w-1/3">
										<FormField
											control={form.control}
											name="role"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Role</FormLabel>
													<FormControl>
														<Select
															onValueChange={field.onChange}
															defaultValue={field.value}
														>
															<SelectTrigger className="w-full">
																<SelectValue placeholder="Select Role" />
															</SelectTrigger>
															<SelectContent>
																{["STUDENT", "LANDLORD"].map((role, index) => (
																	<SelectItem key={index} value={role}>
																		{role}
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

								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<div className="relative">
												<FormControl>
													<Input
														type={showPassword ? "text" : "password"}
														placeholder="Enter your password"
														disabled={form.formState.isSubmitting}
														{...field}
													/>
												</FormControl>
												<span className="absolute top-[10px] right-3">
													<button
														type="button"
														onClick={togglePasswordVisibility}
													>
														{showPassword ? (
															<Eye className="h-5 w-5" />
														) : (
															<EyeOff className="w-5 h-5" />
														)}{" "}
													</button>
												</span>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<LoadingButton
								variant={"brand"}
								type="submit"
								loading={isPending}
								className="mt-6 w-full"
							>
								Register
							</LoadingButton>
						</form>
						<div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
							or
						</div>

						<p className="text-center text-sm text-gray-600 mt-2">
							If you already have an account, please&nbsp;
							<Link className="text-brand hover:underline" href="/auth/login">
								Log in
							</Link>
						</p>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default RegisterForm;
