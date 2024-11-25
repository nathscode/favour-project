"use server";

import { z } from "zod";
import { db } from "@/config/db.config";
import { revalidatePath } from "next/cache";
import checkIsAdmin from "./checkIsAdmin";
import { ReserveRoomSchema } from "@/lib/validators/hostel";
import { PaymentMethod, ReservationType } from "@prisma/client";

export async function reserveRoomAction(formData: FormData) {
	// Validate admin access first
	const isAdmin = await checkIsAdmin();
	if (!isAdmin) {
		return { success: false, message: "Unauthorized access denied" };
	}

	// Validate and parse form data using Zod schema
	const validationResult = ReserveRoomSchema.safeParse({
		id: formData.get("id"),
		campus: formData.get("campus"),
		location: formData.get("location"),
		paymentMethod: formData.get("paymentMethod"),
		amount: formData.get("amount"),
	});

	// Handle validation errors
	if (!validationResult.success) {
		return {
			success: false,
			message: "Invalid input",
			errors: validationResult.error.flatten().fieldErrors,
		};
	}

	const { id, campus, paymentMethod, amount } = validationResult.data;

	// Find student with robust error handling
	const student = await db.student.findUnique({
		where: { id },
		include: { user: true },
	});

	if (!student) {
		return { success: false, message: "Student not found" };
	}

	// Determine reservation type with type safety
	const userReservationType =
		campus === ReservationType.OFFCAMPUS
			? ReservationType.OFFCAMPUS
			: ReservationType.ONCAMPUS;

	// Determine payment method with type safety
	const userPaymentType = Object.values(PaymentMethod).includes(
		paymentMethod as PaymentMethod
	)
		? (paymentMethod as PaymentMethod)
		: PaymentMethod.REMITA;

	try {
		// Use transaction for atomic operations
		const result = await db.$transaction(async (prisma) => {
			// Create reservation
			const newReserve = await prisma.reservation.create({
				data: {
					studentId: student.id,
					reservationType: userReservationType,
					checkInDate: new Date(),
					checkOutDate: new Date(new Date().setDate(new Date().getDate() + 30)),
				},
			});

			// Create order
			const newOrder = await prisma.order.create({
				data: {
					reservationId: newReserve.id,
					totalAmount: Number(amount),
				},
			});

			// Create payment
			await prisma.payment.create({
				data: {
					orderId: newOrder.id,
					paymentMethod: userPaymentType,
					amount: newOrder.totalAmount,
					paymentDate: new Date(),
				},
			});

			return newReserve;
		});

		return {
			success: true,
			message: "Room reserved successfully",
			reservationId: result.id,
		};
	} catch (error) {
		console.error("Reservation creation error:", error);
		return {
			success: false,
			message: "Failed to create room reservation",
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}
