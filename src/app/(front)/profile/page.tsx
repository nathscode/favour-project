import getCurrentUser from "@/actions/getCurrentUser";
import getStudentById from "@/actions/getStudentById";
import ReserveRoomModal from "@/components/modal/ReserveRoomModal";
import StudentModal from "@/components/modal/StudentModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CustomUser } from "@/types";
import { Dot, House, Mail, MapPin, Phone, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {};

const ProfilePage = async (props: Props) => {
	const session: CustomUser | null = await getCurrentUser();
	if (!session) {
		return redirect("/");
	}
	const student = await getStudentById(session.id!);
	const isReserved = true;
	return (
		<div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
			<div className="rounded shadow-xl sm:p-16">
				<div className="flex flex-col md:flex-row">
					<div className="md:w-1/3 mb-8 md:mb-0">
						<div className="flex flex-col justify-center items-center w-full ">
							<div className="relative flex flex-col justify-center items-center  overflow-hidden rounded-full bg-slate-50 w-28 h-28 md:w-48 md:h-48 ">
								<Image
									src="https://i.pravatar.cc/300"
									alt="Profile Picture"
									fill
									className="rounded-full size-full mb-4 border-4 border-brand-800 transition-transform duration-300 hover:scale-105"
								/>
							</div>
							<h1 className="text-2xl font-bold dark:text-white capitalize mt-4">
								{session?.name}
							</h1>
							{student?.department && (
								<div className="inline-flex text-gray-600 dark:text-gray-300">
									<span>{student.department}</span> <Dot />{" "}
									<span>{student.level} L</span>
								</div>
							)}
							{!student?.department && <StudentModal />}
							<div className="mt-2 mb-5">
								<Badge>{isReserved ? "On Campus" : "Off Campus"}</Badge>
							</div>
							<Button variant={"brand"} asChild>
								<Link href="/dashboard">Dashboard</Link>
							</Button>
						</div>
					</div>
					<div className="md:w-2/3 md:pl-8">
						<h2 className="text-xl font-semibold text-foreground mb-4">
							Contact Information
						</h2>
						<ul className="space-y-2 text-gray-700 dark:text-gray-300">
							<li className="flex items-center">
								<User2 className="h-5 w-5 mr-2 text-brand" />
								<span className="capitalize">{session?.gender}</span>
							</li>
							<li className="flex items-center">
								<Mail className="h-5 w-5 mr-2 text-brand" />
								{session?.email}
							</li>
							<li className="flex items-center">
								<Phone className="h-5 w-5 mr-2 text-brand" />
								{session?.mobileNumber}
							</li>
							<li className="flex items-center">
								<MapPin className="h-5 w-5 mr-2 text-brand" />
								Uvwie
							</li>
						</ul>
						<div className="flex flex-col w-full my-5">
							<h2 className="text-xl font-semibold text-foreground mb-4">
								Accommodation
							</h2>
							{!student?.reservations && (
								<div className="flex flex-col gap-3">
									<ReserveRoomModal id={student?.id!} />
									<Button variant={"secondary"} asChild>
										<Link href={"/"}>View off campus properties</Link>
									</Button>
								</div>
							)}
							{student?.reservations && (
								<div className="flex flex-col w-full">
									<div className="flex gap-x-4 justify-start">
										<House className="size-5" />
										<h2 className="text-base font-semibold text-foreground mb-4">
											{student.reservations[0].reservationType}
										</h2>
									</div>
									<p className="text-orange-500">
										{student.reservations[0].status === "PENDING"
											? "Processing your reservation, check back later"
											: ""}{" "}
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
