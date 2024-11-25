import { getAllStudents } from "@/actions/allStudents";
import { StudentColumns } from "@/components/columns/StudentColumns";
import { DataTable } from "@/components/common/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Receipt } from "lucide-react";

const StudentSectionPage = async () => {
	const students = await getAllStudents();
	return (
		<div className="px-10 py-5">
			<div className="flex items-center justify-between">
				<p className="text-2xl font-bold">students</p>
			</div>
			<Separator className="bg-gray-200 my-4" />
			<div className="grid grid-cols-2 md:grid-cols-3 gap-10">
				<Card>
					<CardHeader className="flex flex-row justify-between items-center">
						<CardTitle className="text-lg">Total students</CardTitle>
						<Receipt className="max-sm:hidden" />
					</CardHeader>
					<CardContent>
						<p className="text-body-bold"> {students?.length}</p>
					</CardContent>
				</Card>
			</div>
			<DataTable
				columns={StudentColumns}
				//@ts-ignore
				data={students}
				searchKey="Name"
			/>
		</div>
	);
};

export const dynamic = "force-dynamic";

export default StudentSectionPage;
