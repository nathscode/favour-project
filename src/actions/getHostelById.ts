import { db } from "@/config/db.config";
import { SafeHostel } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

export default async function getHostelById(
	id: string
): Promise<SafeHostel | null | undefined> {
	noStore();
	if (!id) {
		return null;
	}
	try {
		const hostels = await db.hostel.findUnique({
			where: { id },
			include: {
				user: true,
				rooms: true,
			},
		});

		if (!hostels) {
			return null;
		}

		const plainHostel = JSON.parse(JSON.stringify(hostels));
		return plainHostel;
	} catch (error) {
		console.log("ERROR_HOSTEL_ID", error);
		return null;
	}
}
