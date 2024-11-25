import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Bed, Fence, Heart, MapPin } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { propertiesTypes } from "@/data/properties";
import placeholderImage from "/public/images/placeholder-image.png";

type Props = {
	property: propertiesTypes;
};

const ListingCard = ({ property }: Props) => {
	return (
		<Link
			href={"/accommodation/self-contain"}
			className="w-[350px] h-full bg-card snap-center font-card-foreground flex-col flex items-center flex-none cursor-pointer group rounded-tl-lg rounded-tr-lgt "
		>
			<div className="w-full h-[200px] relative overflow-hidden rounded-tl-lg rounded-tr-lg bg-slate-50 ">
				<Image
					fill
					className="object-cover size-full transition-all aspect-square group-hover:scale-105"
					src={property.images[0] ?? placeholderImage}
					alt="Listing"
				/>
			</div>
			<div className="flex flex-col justify-start w-full mt-4">
				<div className="flex justify-between items-start w-full">
					<div className="justify-start w-[80%]">
						<h2 className="inline-flex w-full flex-col line-clamp-2 items-start text-lg text-left m-0  leading-5 text-foreground group-hover:text-brand group-hover:underline">
							{property.title}
						</h2>
					</div>
					<div className="justify-end">
						<Button
							className="rounded-full hover:bg-brand/10"
							variant={"ghost"}
							size={"icon"}
						>
							<Heart className="h-10 w-10" />
						</Button>
					</div>
				</div>
				<div className="flex flex-col w-full my-3">
					<h2 className="flex w-full items-center  text-left m-0 leading-5">
						<strong className="text-xl text-brand">{`${formatCurrency(
							property.price
						)}`}</strong>
						<span className="text-slate-500">/per year</span>
					</h2>
				</div>
				<ul className="flex justify-between w-full">
					<li className="inline-flex items-center justify-start gap-x-1 text-gray-500">
						<MapPin className="h-4 w-4" />
						<span className="text-sm">{property.location}</span>
					</li>
					<li className="inline-flex items-center justify-start gap-x-1 text-gray-500">
						<Bed className="h-4 w-4" />
						<span className="text-sm">1 Bed</span>
					</li>
					<li className="inline-flex items-center justify-start gap-x-1 text-gray-500">
						<Fence className="h-4 w-4" />
						<span className="text-sm">No Fencing</span>
					</li>
				</ul>
			</div>
		</Link>
	);
};

export default ListingCard;
