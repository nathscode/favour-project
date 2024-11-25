import getHostelById from "@/actions/getHostelById";
import getHostelRoomById from "@/actions/getHostelRoomById";
import BackButton from "@/components/common/BackButton";
import AddRoomModal from "@/components/modal/AddRoomModal";
import { House } from "lucide-react";

interface PageProps {
	params: {
		id: string;
	};
}

const HostelDetailPage = async ({ params }: PageProps) => {
	const hotel = await getHostelById(params.id);
	const rooms = await getHostelRoomById(params.id);
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
						<h1 className="text-lg font-semibold capitalize">{hotel?.name}</h1>
						<p className="text-muted-foreground prose-base">
							{hotel?.location}
						</p>
						<div className="flex w-full justify-between mt-4">
							<div className="justify-start">Total Rooms</div>
							<div className="justify-end">
								<strong>{rooms?.length}</strong>
							</div>
						</div>
						{rooms?.length! > 0 && (
							<ul className="my-1 w-full flex flex-col">
								{rooms?.map((room, idx) => (
									<li className="p-2 border-b w-full">
										<div className="flex justify-between w-full">
											<h4 className="text-base font-medium">Room No.</h4>
											<p className="prose-sm">{`Room ${room.roomNumber}`}</p>
										</div>
										<div className="flex justify-between w-full">
											<h4 className="text-base font-medium">Room Capacity</h4>
											<p className="prose-sm">{room.capacity}</p>
										</div>
									</li>
								))}
							</ul>
						)}

						<div className="flex flex-col mt-4">
							<AddRoomModal id={params.id} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HostelDetailPage;
