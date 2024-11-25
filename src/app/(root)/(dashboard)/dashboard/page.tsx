import { getAllReservations } from "@/actions/allReservations";
import { getAllRooms } from "@/actions/allRooms";
import { getAllStudents } from "@/actions/allStudents";
import { StudentChart } from "@/components/charts/StudentChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircleDollarSign, HouseIcon, Mail, Users2 } from "lucide-react";

export default async function DashboardPage() {
	const [reservations, rooms, students] = await Promise.all([
		getAllReservations(),
		getAllRooms(),
		getAllStudents(),
	]);
	return (
		<div className="px-8 py-10">
			<p className="font-bold text-2xl">Admin Dashboard</p>
			<Separator className="bg-grey-1 my-5" />
			<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
				<Card>
					<CardHeader className="flex flex-row justify-between items-center">
						<CardTitle className="text-lg">Total Reservations</CardTitle>
						<HouseIcon className="max-sm:hidden" />
					</CardHeader>
					<CardContent>
						<p className="text-xl font-bold">{reservations?.length}</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row justify-between items-center">
						<CardTitle className="text-lg">Total Rooms</CardTitle>
						<HouseIcon className="max-sm:hidden" />
					</CardHeader>
					<CardContent>
						<p className="text-xl font-bold">{rooms?.length}</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row justify-between items-center">
						<CardTitle className="text-lg">Total Students</CardTitle>
						<Users2 className="max-sm:hidden" />
					</CardHeader>
					<CardContent>
						<p className="text-xl font-bold">{students?.length}</p>
					</CardContent>
				</Card>
			</div>
			<div className="flex flex-col w-full my-5">
				<StudentChart />
			</div>
		</div>
	);
}
