import { db } from "@/config/db.config";
import { handlerNativeResponse } from "@/lib/backend/utils";
import { RegisterSchema, RegisterSchemaInfer } from "@/lib/validators/auth";
import { RoleType } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
	try {
		const body: RegisterSchemaInfer = await req.json();
		const payload = RegisterSchema.safeParse(body);
		if (!payload.success) {
			return handlerNativeResponse(
				{
					status: 400,
					errors: {
						message: payload.error.message,
					},
				},
				400
			);
		}

		const { email, name, mobileNumber, gender, role, password } = payload.data;
		const formattedEmail = email.toLowerCase();

		const isEmailExist = await db.user.findUnique({
			where: {
				email: formattedEmail,
			},
			select: {
				id: true,
			},
		});

		if (isEmailExist) {
			return handlerNativeResponse(
				{
					status: 409,
					errors: {
						message: "Email already taken. please use another email.",
					},
				},
				400
			);
		}

		// * Check username if it already exist
		const isMobileExist = await db.user.findUnique({
			where: {
				mobileNumber: mobileNumber,
			},
			select: {
				id: true,
			},
		});

		if (isMobileExist) {
			return handlerNativeResponse(
				{
					status: 409,
					errors: {
						message: "Username already taken. please use another username.",
					},
				},
				400
			);
		}

		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);
		let userRole =
			role === null || role === "" || role !== RoleType.LANDLORD
				? RoleType.STUDENT
				: RoleType.LANDLORD;
		const newUser = await db.user.create({
			data: {
				name,
				email: formattedEmail,
				mobileNumber,
				gender,
				password: hashedPassword,
				role: userRole,
			},
		});
		if (!newUser) {
			return handlerNativeResponse(
				{ status: 400, message: "No user created" },
				400
			);
		}

		return NextResponse.json(newUser.email);
	} catch (error: any) {
		console.log(error);
		let message: any = "Something went wrong";
		let status = 500;
		if (error instanceof ZodError) {
			message = error.message;
			status = 422;
		}
		return handlerNativeResponse({ status, message }, status);
	}
}
