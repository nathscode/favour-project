import { allRoomsAvailable } from "@/actions/allRoomsAvailable";
import getReservationById from "@/actions/getReservationById";
import BackButton from "@/components/common/BackButton";
import AttachRoomModal from "@/components/modal/AttachRoomModal";
import { House } from "lucide-react";

interface PageProps {
	params: {
		id: string;
	};
}

const ReservationDetailPage = async ({ params }: PageProps) => {
	const reservation = await getReservationById(params.id);
	const rooms = await allRoomsAvailable();
	return (
		<div className="flex flex-col p-5 rounded-lg bg-white w-full">
			<div className="container">
				<div>
					<BackButton />
				</div>
				<div className="flex flex-col justify-center items-center w-full mt-5">
					<div className="bg-gray-50  w-full xl:w-[600px] flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
						<div className="flex flex-col justify-start mb-2">
							<House className="h-8 w-8" />
						</div>
						<h1 className="text-lg font-semibold capitalize">
							{reservation?.reservationType}
						</h1>
						<p className="text-muted-foreground prose-base">
							{reservation?.status}
						</p>
						<div className="flex w-full justify-between mt-4">
							<div className="justify-start">Total Rooms</div>
							<div className="justify-end">
								<strong>{reservation?.student.id}</strong>
							</div>
						</div>

						<div className="flex flex-col mt-4">
							<AttachRoomModal id={params.id} rooms={rooms!} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReservationDetailPage;
