import RentButton from "@/components/RentButton";
import BackButton from "@/components/common/BackButton";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { BathIcon, Bed, Fence, MapPin, Shield } from "lucide-react";
import Image from "next/image";
import React from "react";

interface AccommodationProps {
	params: {
		slug: string;
	};
}

const AccommodationDetail = async ({ params }: AccommodationProps) => {
	return (
		<div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
			<div className="rounded shadow-xl sm:p-16">
				<div className="flex flex-col justify-start w-fit mb-5">
					<BackButton />
				</div>
				<div className="flex flex-col lg:flex-row">
					<div className="mb-6 lg:mb-0 lg:w-1/2 lg:pr-5">
						<Image
							className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
							src="/images/listing/four.jpg"
							alt="image"
							height={400}
							width={400}
						/>
					</div>
					<div className="lg:w-1/2">
						<div className="flex flex-col w-full justify-start">
							<div className="px-5">
								<h2 className="inline-flex w-full flex-col items-start text-lg  sm:text-2xl text-left m-0 capitalize font-semibold leading-5 text-foreground">
									self contain with pop ceiling
								</h2>
								<div className="inline-flex items-center justify-start gap-x-1 text-gray-500 mt-2">
									<MapPin className="h-4 w-4" />
									<span className="text-base">Iterigbi</span>
								</div>
								<div className="flex flex-col w-full mt-2">
									<h2 className="flex w-full items-center  text-left m-0 leading-5">
										<strong className="text-xl text-brand">{`${formatCurrency(
											400000
										)}`}</strong>
										<span className="text-slate-500">&nbsp;/per year</span>
									</h2>
								</div>
								<div className="flex flex-col w-full my-3">
									<h2 className="flex w-full items-center  text-left m-0 font-semibold leading-5 mb-2">
										Description
									</h2>
									<p>
										newly built self contain with no landlord, water heater,
										spacious bedroom
									</p>
								</div>
								<div className="flex flex-col w-full my-3">
									<h2 className="flex w-full items-center  text-left m-0 font-semibold leading-5 mb-2">
										Facilities
									</h2>
									<ul className="flex flex-wrap justify-between gap-2 w-full">
										<li className="inline-flex items-center justify-start gap-x-1 text-gray-500">
											<Bed className="h-4 w-4" />
											<span className="text-sm">1 Bed</span>
										</li>
										<li className="inline-flex items-center justify-start gap-x-1 text-gray-500">
											<BathIcon className="h-4 w-4" />
											<span className="text-sm">2 Bathroom</span>
										</li>
										<li className="inline-flex items-center justify-start gap-x-1 text-gray-500">
											<Shield className="h-4 w-4" />
											<span className="text-sm">Safe and Secured</span>
										</li>
										<li className="inline-flex items-center justify-start gap-x-1 text-gray-500">
											<Fence className="h-4 w-4" />
											<span className="text-sm">No Fencing</span>
										</li>
									</ul>
									<RentButton />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccommodationDetail;
