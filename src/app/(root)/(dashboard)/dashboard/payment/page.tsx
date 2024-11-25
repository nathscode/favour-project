import { getAllPayments } from "@/actions/allPayments";
import { PaymentColumns } from "@/components/columns/PaymentColumns";
import { DataTable } from "@/components/common/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Receipt } from "lucide-react";

const PaymentSectionPage = async () => {
	const payments = await getAllPayments();
	return (
		<div className="px-10 py-5">
			<div className="flex items-center justify-between">
				<p className="text-2xl font-bold">payments</p>
			</div>
			<Separator className="bg-gray-200 my-4" />
			<div className="grid grid-cols-2 md:grid-cols-3 gap-10">
				<Card>
					<CardHeader className="flex flex-row justify-between items-center">
						<CardTitle className="text-lg">Total payments</CardTitle>
						<Receipt className="max-sm:hidden" />
					</CardHeader>
					<CardContent>
						<p className="text-body-bold"> {payments?.length}</p>
					</CardContent>
				</Card>
			</div>
			<DataTable
				columns={PaymentColumns}
				//@ts-ignore
				data={payments}
				searchKey="Name"
			/>
		</div>
	);
};

export const dynamic = "force-dynamic";

export default PaymentSectionPage;
