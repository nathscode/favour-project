import { db } from "@/config/db.config";
import { SafeStudent } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

export default async function getStudentById(
	id: string
): Promise<SafeStudent | null | undefined> {
	noStore();
	if (!id) {
		return null;
	}
	try {
		const student = await db.student.findUnique({
			where: { userId: id },
			include: {
				reservations: true,
			},
		});

		if (!student) {
			return null;
		}

		const plainHostel = JSON.parse(JSON.stringify(student));
		return plainHostel;
	} catch (error) {
		console.log("ERROR_STUDENT_ID", error);
		return null;
	}
}
