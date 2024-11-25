import { db } from "@/config/db.config";
import { SafeReservation } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

export default async function getReservationById(
	id: string
): Promise<SafeReservation | null | undefined> {
	noStore();
	if (!id) {
		return null;
	}
	try {
		const reservations = await db.reservation.findUnique({
			where: { id },
			include: {
				student: true,
				room: true,
			},
		});

		if (!reservations) {
			return null;
		}

		const plainReservations = JSON.parse(JSON.stringify(reservations));
		return plainReservations;
	} catch (error) {
		console.log("ERROR_RESERVATION_ID", error);
		return null;
	}
}
