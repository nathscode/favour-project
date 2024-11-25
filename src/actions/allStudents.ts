import { db } from "@/config/db.config";
import { SafeStudent } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

export async function getAllStudents(): Promise<SafeStudent[] | null> {
	noStore();

	try {
		const students = await db.student.findMany({
			orderBy: { updatedAt: "desc" },
		});

		if (!students) return [];
		const plainStudents = JSON.parse(JSON.stringify(students));
		return plainStudents;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch students");
	}
}
