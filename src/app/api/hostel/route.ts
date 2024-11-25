import { handlerNativeResponse } from "@/lib/backend/utils";
import {
	AddHostelSchema,
	AddHostelSchemaSchemaInfer,
} from "@/lib/validators/hostel";
import { CustomSession } from "@/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { authOptions } from "../auth/[...nextauth]/options";
import { db } from "@/config/db.config";

export async function POST(req: NextRequest) {
	try {
		const body: AddHostelSchemaSchemaInfer = await req.json();
		const payload = AddHostelSchema.safeParse(body);
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
		const { name, location, description } = payload.data;

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
		// Check if the user is an admin or agent
		const user = await db.user.findFirst({
			where: { email: session.user?.email! },
		});

		if (!user || (user.role !== "PORTER" && user.role !== "ADMIN")) {
			return handlerNativeResponse(
				{
					status: 403, // Unauthorized
					errors: {
						message: "Not authorized to make this request",
					},
				},
				403
			);
		}
		const existingHostel = await db.hostel.findFirst({
			where: { name },
		});

		if (existingHostel) {
			return handlerNativeResponse(
				{
					status: 400,
					errors: {
						message: "Hostel name already exist, choose another one",
					},
				},
				400
			);
		}
		const formattedName = name.toLowerCase();
		const newHostel = await db.hostel.create({
			data: {
				userId: session?.user?.id!,
				name: formattedName,
				location,
				description,
			},
		});
		if (!newHostel) {
			return handlerNativeResponse(
				{ status: 400, message: "No Hostel created" },
				400
			);
		}

		return NextResponse.json(newHostel.id);
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
