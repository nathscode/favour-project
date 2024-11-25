"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema, LoginSchemaInfer } from "@/lib/validators/auth";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import LoadingButton from "../common/LoadingButton";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
	const params = useSearchParams();
	const callback = params.get("callbackUrl");
	const { toast } = useToast();
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const form = useForm<LoginSchemaInfer>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { mutate: LoginFunc, isPending } = useMutation({
		mutationFn: async ({ email, password }: LoginSchemaInfer) => {
			const { data } = await axios.post("/api/auth/login", {
				email,
				password,
			});
			return data;
		},
	});

	function onSubmit(values: LoginSchemaInfer) {
		LoginFunc(
			{
				email: values.email.toLowerCase(),
				password: values.password,
			},
			{
				onSuccess: (data) => {
					if (data.status == 200) {
						signIn("credentials", {
							email: values.email.toLowerCase(),
							password: values.password,
							callbackUrl: callback ?? "/profile",
							redirect: true,
						});
					}
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
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	return (
		<div className="flex justify-start flex-col w-full">
			<div className="flex justify-start gap-y-4 flex-col md:flex-row w-full">
				<div className="flex flex-col flex-1 shadow-xl rounded-lg px-5 py-8 border bg-white w-full">
					<h2 className="text-2xl font-semibold leading-tight text-foreground sm:text-2xl">
						Login
					</h2>{" "}
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full mt-4"
						>
							<div className="space-y-4">
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
							<div className="mt-5 flex justify-end w-full">
								<Button variant="link" asChild>
									<Link href="/account/forgot-password">Forget Password</Link>
								</Button>
							</div>
							<LoadingButton
								variant={"brand"}
								type="submit"
								loading={isPending}
								className="mt-6 w-full"
							>
								Log in
							</LoadingButton>
						</form>
						<div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
							or
						</div>

						<p className="text-center text-sm text-gray-600 mt-2">
							If you don&apos;t have an account, please&nbsp;
							<Link
								className="text-brand hover:underline"
								href="/auth/register"
							>
								Sign up
							</Link>
						</p>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
