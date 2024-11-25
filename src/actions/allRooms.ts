import { db } from "@/config/db.config";
import { SafeRoom } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

export async function getAllRooms(): Promise<SafeRoom[] | null> {
	noStore();

	try {
		const rooms = await db.room.findMany({});

		if (!rooms) return [];
		const plainRooms = JSON.parse(JSON.stringify(rooms));
		return plainRooms;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch rooms");
	}
}
