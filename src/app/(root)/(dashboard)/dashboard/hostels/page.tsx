import { getAllHostels } from "@/actions/allHostel";
import { HostelColumns } from "@/components/columns/HostelColumns";
import { DataTable } from "@/components/common/DataTable";
import AddHostelModal from "@/components/modal/AddHostelModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Receipt } from "lucide-react";

const HostelSectionPage = async () => {
	const hostels = await getAllHostels();
	return (
		<div className="px-10 py-5">
			<div className="flex items-center justify-between">
				<div className="text-2xl font-bold">hostels</div>
				<div className="justify-end">
					<AddHostelModal />
				</div>
			</div>
			<Separator className="bg-gray-200 my-4" />
			<div className="grid grid-cols-2 md:grid-cols-3 gap-10">
				<Card>
					<CardHeader className="flex flex-row justify-between items-center">
						<CardTitle className="text-lg">Total hostels</CardTitle>
						<Receipt className="max-sm:hidden" />
					</CardHeader>
					<CardContent>
						<p className="text-body-bold"> {hostels?.length}</p>
					</CardContent>
				</Card>
			</div>
			<DataTable
				columns={HostelColumns}
				//@ts-ignore
				data={hostels}
				searchKey="Name"
			/>
		</div>
	);
};

export const dynamic = "force-dynamic";

export default HostelSectionPage;
