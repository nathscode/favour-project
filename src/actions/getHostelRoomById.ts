import { db } from "@/config/db.config";
import { SafeRoom } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

export default async function getHostelRoomById(
	id: string
): Promise<SafeRoom[] | null | undefined> {
	noStore();
	if (!id) {
		return null;
	}
	try {
		const rooms = await db.room.findMany({
			where: { hostelId: id },
		});

		if (!rooms) {
			return null;
		}

		const plainRoom = JSON.parse(JSON.stringify(rooms));
		return plainRoom;
	} catch (error) {
		console.log("ERROR_ROOM_ID", error);
		return null;
	}
}
