import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string().email().min(1, {
		message: "Invalid email address",
	}),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must have than 8 characters"),
});

export type LoginSchemaInfer = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
	name: z.string().min(1, {
		message: "Name is Required",
	}),
	mobileNumber: z.string().min(1, {
		message: "Mobile Number is Required",
	}),
	role: z.string().min(1, {
		message: "Role is Required",
	}),
	gender: z.string().min(1, {
		message: "Gender is Required",
	}),
	email: z.string().email().min(1, {
		message: "Invalid email address",
	}),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must have than 8 characters"),
});

export type RegisterSchemaInfer = z.infer<typeof RegisterSchema>;

export const StudentSchema = z.object({
	level: z.string().min(1, {
		message: "Invalid level",
	}),
	department: z.string().min(1, {
		message: "Invalid department",
	}),
});

export type StudentSchemaInfer = z.infer<typeof StudentSchema>;
