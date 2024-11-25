import {
	Cog,
	DollarSign,
	House,
	HousePlus,
	LayoutDashboard,
	Mail,
	Receipt,
	User,
	UserCircle2,
	UsersRound,
} from "lucide-react";

export const navLinks = [
	{
		url: "/dashboard",
		icon: <LayoutDashboard />,
		label: "Dashboard",
	},
	{
		url: "/dashboard/reservations",
		icon: <Receipt />,
		label: "reservations",
	},
	{
		url: "/dashboard/hostels",
		icon: <House />,
		label: "hostels",
	},
	{
		url: "/dashboard/students",
		icon: <User />,
		label: "students",
	},
	{
		url: "/dashboard/payment",
		icon: <DollarSign />,
		label: "payment",
	},
	{
		url: "/dashboard/reviews",
		icon: <Mail />,
		label: "reviews",
	},
];
