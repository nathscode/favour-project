import React from "react";
import ListingCard from "./cards/ListingCard";
import PlacesCard from "./cards/PlacesCard";
import { places } from "@/data/places";

type Props = {};

const PopularPlace = (props: Props) => {
	return (
		<div className="relative overflow-hidden">
			<div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
				<div className="flex flex-col w-full py-10">
					<h1 className="text-3xl font-semibold">Popular Places</h1>
					<p>These places are where people rent property the most.</p>
				</div>
				<div className="flex space-x-4 items-center w-full overflow-x-auto scrollbar-none snap-x snap-mandatory">
					{places.map((item, idx) => (
						<PlacesCard key={idx} place={item} />
					))}
				</div>
			</div>
		</div>
	);
};

export default PopularPlace;
