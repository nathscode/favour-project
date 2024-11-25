import React from "react";
import ListingCard from "./cards/ListingCard";
import { properties } from "@/data/properties";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {};

const Accommodations = (props: Props) => {
	return (
		<div className="relative overflow-hidden">
			<div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
				<div className="flex flex-col w-ful justify-start l py-10">
					<h1 className="text-3xl font-semibold">Accommodations</h1>
					<p>Find and rent fully vetted accommodations</p>
				</div>
				<div className="flex  w-full">
					<Tabs defaultValue="property" className="">
						<TabsList className="grid w-[300px] grid-cols-2">
							<TabsTrigger value="property">Properties</TabsTrigger>
							<TabsTrigger value="rooms">Rooms</TabsTrigger>
						</TabsList>
						<TabsContent value="property" className="w-full">
							<div className="flex flex-col w-ful">
								<h1 className="text-xl font-bold capitalize my-5">
									Off campus properties
								</h1>
								<div className="flex flex-wrap justify-start gap-4 w-full">
									{properties.map((property) => (
										<ListingCard key={property.id} property={property} />
									))}
								</div>
							</div>
						</TabsContent>
						<TabsContent value="rooms">
							<h1 className="text-xl font-bold capitalize my-5">
								Campus Rooms
							</h1>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default Accommodations;
