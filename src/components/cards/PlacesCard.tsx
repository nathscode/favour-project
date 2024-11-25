import Image from "next/image";
import Link from "next/link";

type Props = {
	place: string;
};

const PlacesCard = ({ place }: Props) => {
	return (
		<Link
			href={`/places/${place}`}
			className="w-[350px] h-full bg-card snap-center font-card-foreground flex-col flex items-center flex-none cursor-pointer group rounded-lg"
		>
			<div className="relative w-full h-[200px]  overflow-hidden rounded-lg bg-slate-50 ">
				<Image
					fill
					className="object-cover size-full transition-all aspect-square group-hover:scale-105"
					src={"/images/3.jpg"}
					alt="Listing"
				/>
				<div className="absolute top-0 left-0 flex flex-col justify-center items-center size-full bg-black/50">
					<h2 className="inline-flex w-full flex-col justify-center items-center text-3xl text-center text-white font-bold ">
						{place}
					</h2>
				</div>
			</div>
		</Link>
	);
};

export default PlacesCard;
