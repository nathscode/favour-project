"use client";

import Accommodations from "@/components/Accommodations";
import AlertBanner from "@/components/AlertBanner";
import { Banner } from "@/components/Banner";
import PopularPlace from "@/components/PopularPlace";

export default function Home() {
	return (
		<div className="flex flex-col justify-between">
			<Banner />
			<AlertBanner />
			<Accommodations />
			<PopularPlace />
		</div>
	);
}
