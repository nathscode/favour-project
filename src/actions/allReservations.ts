import { db } from "@/config/db.config";
import { SafeReservation } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

export async function getAllReservations(): Promise<SafeReservation[] | null> {
	noStore();

	try {
		const reservations = await db.reservation.findMany({
			orderBy: { createdAt: "desc" },
		});

		if (!reservations) return [];
		const plainReservations = JSON.parse(JSON.stringify(reservations));
		return plainReservations;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch reservations");
	}
}
