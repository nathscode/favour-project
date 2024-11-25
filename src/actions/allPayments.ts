import { db } from "@/config/db.config";
import { SafePayment } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

export async function getAllPayments(): Promise<SafePayment[] | null> {
	noStore();

	try {
		const payments = await db.payment.findMany({});

		if (!payments) return [];
		const plainPayments = JSON.parse(JSON.stringify(payments));
		return plainPayments;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch payments");
	}
}
