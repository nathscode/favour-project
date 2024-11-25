import { db } from "@/config/db.config";
import { SafeHostel } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

export async function getAllHostels(): Promise<SafeHostel[] | null> {
	noStore();

	try {
		const hostels = await db.hostel.findMany({});

		if (!hostels) return [];
		const plainHostels = JSON.parse(JSON.stringify(hostels));
		return plainHostels;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch hostels");
	}
}
