import { getAllReviews } from "@/actions/allReviews";
import { ReviewColumns } from "@/components/columns/ReviewColumns";
import { DataTable } from "@/components/common/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Receipt } from "lucide-react";

const ReviewSectionPage = async () => {
	const reviews = await getAllReviews();
	return (
		<div className="px-10 py-5">
			<div className="flex items-center justify-between">
				<p className="text-2xl font-bold">reviews</p>
			</div>
			<Separator className="bg-gray-200 my-4" />
			<div className="grid grid-cols-2 md:grid-cols-3 gap-10">
				<Card>
					<CardHeader className="flex flex-row justify-between items-center">
						<CardTitle className="text-lg">Total reviews</CardTitle>
						<Receipt className="max-sm:hidden" />
					</CardHeader>
					<CardContent>
						<p className="text-body-bold"> {reviews?.length}</p>
					</CardContent>
				</Card>
			</div>
			<DataTable
				columns={ReviewColumns}
				//@ts-ignore
				data={reviews}
				searchKey="Name"
			/>
		</div>
	);
};

export const dynamic = "force-dynamic";

export default ReviewSectionPage;
