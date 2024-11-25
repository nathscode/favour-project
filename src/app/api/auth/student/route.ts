import { db } from "@/config/db.config";
import { handlerNativeResponse } from "@/lib/backend/utils";
import { StudentSchema, StudentSchemaInfer } from "@/lib/validators/auth";
import { CustomSession } from "@/types";
import { RoleType } from "@prisma/client";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { authOptions } from "../[...nextauth]/options";

export async function POST(req: NextRequest) {
	const session: CustomSession | null = await getServerSession(authOptions);
	if (!session) {
		return handlerNativeResponse(
			{
				status: 401, // Unauthorized
				errors: {
					message: "Unauthorized user",
				},
			},
			401
		);
	}
	try {
		const body: StudentSchemaInfer = await req.json();

		const payload = StudentSchema.safeParse(body);
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

		const { level, department } = payload.data;

		const newUser = await db.student.create({
			data: {
				userId: session?.user?.id!,
				level,
				department,
			},
		});
		if (!newUser) {
			return handlerNativeResponse(
				{ status: 400, message: "Student Profile not updated created" },
				400
			);
		}

		return NextResponse.json({ success: true });
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
