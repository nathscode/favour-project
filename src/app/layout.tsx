import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Provider";
import { Roboto } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
	title: "Book Fupre Accommodation",
	description: "Easing Book Fupre Accommodation with ease",
};

const roboto = Roboto({
	weight: ["400", "500", "700", "900"],
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${roboto.className} antialiased`}>
				<Providers>
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
