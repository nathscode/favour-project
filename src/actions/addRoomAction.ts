"use server";
import { db } from "@/config/db.config";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import checkIsAdmin from "./checkIsAdmin";
import { AddRoomSchema } from "@/lib/validators/hostel";

export async function addRoomAction(values: z.infer<typeof AddRoomSchema>) {
	const isAdmin = await checkIsAdmin();
	if (!isAdmin) {
		return { message: "Unauthorized and access denied" };
	}

	const validatedFields = AddRoomSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields. Failed to Update Post.",
		};
	}

	const { roomNumber, capacity, id } = validatedFields.data;

	if (!id) {
		return { message: "Hostel id needed" };
	}

	const hostel = await db.hostel.findUnique({
		where: {
			id,
		},
		include: {
			user: true,
		},
	});

	if (!hostel) {
		return { message: "hostel id not found.." };
	}
	try {
		const newRoom = await db.room.create({
			data: {
				hostelId: hostel.id,
				roomNumber,
				capacity: Number(capacity),
			},
		});
		if (!newRoom) {
			return { message: "Room not created, Try again" };
		}
		revalidatePath(`/dashboard/hostels/${id}`);
		return { message: "Room created successfully." };
	} catch (error) {
		return { message: "Database Error: Failed to create room." };
	}
}
