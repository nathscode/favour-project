export type propertiesTypes = {
	id: string;
	title: string;
	description: string;
	price: number;
	location: string;
	images: string[];
};

export const properties: propertiesTypes[] = [
	{
		id: "1",
		title: "self contain with pop ceiling",
		description:
			"newly built self contain with no landlord, water heater, spacious bedroom",
		price: 600000,
		location: "iterigbi",
		images: ["/images/listing/one.jpg"],
	},
	{
		id: "2",
		title: "Modern Studio Apartment",
		description: "Cozy studio apartment with modern decor and natural light",
		price: 450000,
		location: "Ugbromo",
		images: ["/images/listing/two.jpg", "/images/listing/three.jpg"],
	},
	{
		id: "3",
		title: "Luxury Penthouse",
		description:
			"Spacious penthouse with panoramic views and high-end finishes",
		price: 1200000,
		location: "Iterigbi",
		images: ["/images/listing/four.jpg", "/images/listing/five.jpg"],
	},
	{
		id: "4",
		title: "Cozy Cottage",
		description: "Charming cottage perfect for a peaceful retreat",
		price: 350000,
		location: "Okuokoko",
		images: ["/images/listing/three.jpg", "/images/listing/two.jpg"],
	},
	{
		id: "5",
		title: "Apartment Complex Unit",
		description: "Modern apartment unit in a secure complex",
		price: 400000,
		location: "ugolo",
		images: ["/images/listing/three.jpg", "/images/listing/two.jpg"],
	},
	{
		id: "6",
		title: "Beachfront Bungalow",
		description: "Stunning beachfront property with private access",
		price: 900000,
		location: "iterigbi",
		images: ["/images/listing/three.jpg", "/images/listing/four.jpg"],
	},
	{
		id: "7",
		title: "Executive Townhouse",
		description: "Spacious townhouse with ample storage and modern amenities",
		price: 700000,
		location: "ugbromo",
		images: ["/images/listing/three.jpg", "/images/listing/two.jpg"],
	},
	{
		id: "8",
		title: "Rustic Cabin",
		description:
			"Quaint cabin perfect for nature lovers and outdoor enthusiasts",
		price: 300000,
		location: "Ugbromo",
		images: ["/images/listing/one.jpg", "/images/listing/two.jpg"],
	},
];
