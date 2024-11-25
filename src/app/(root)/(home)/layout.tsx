import { NavBar } from "@/components/NavBar";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = true;

	return (
		<div>
			<NavBar />
			{children}
		</div>
	);
}
