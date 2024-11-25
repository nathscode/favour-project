"use server";
import { db } from "@/config/db.config";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import checkIsAdmin from "./checkIsAdmin";
import { AttachRoomSchema } from "@/lib/validators/hostel";

export async function attachRoomAction(
	values: z.infer<typeof AttachRoomSchema>
) {
	const isAdmin = await checkIsAdmin();
	if (!isAdmin) {
		return { message: "Unauthorized and access denied" };
	}

	const validatedFields = AttachRoomSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields. Failed to Update Post.",
		};
	}

	const { id, roomId } = validatedFields.data;

	if (!id) {
		return { message: "Hostel id needed" };
	}

	const room = await db.room.findUnique({
		where: {
			id: roomId,
		},
	});

	if (!room) {
		return { message: "room id not found.." };
	}
	try {
		const newReservationUpdate = await db.reservation.update({
			where: {
				id: id,
			},
			data: {
				roomId: room.id,
				status: "CONFIRMED",
			},
		});

		if (newReservationUpdate) {
			await db.room.update({
				where: { id: room.id },
				data: {
					availability: false,
				},
			});
		}
		revalidatePath(`/dashboard/reservations/${newReservationUpdate.id}`);
		return { message: "Room assigned successfully." };
	} catch (error) {
		return { message: "Database Error: Failed to create room." };
	}
}
