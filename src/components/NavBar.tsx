import getCurrentUser from "@/actions/getCurrentUser";
import NavBarClient from "./NavBarClient";

export const NavBar = async () => {
	const session = await getCurrentUser();

	return (
		<div className="bg-gray-900">
			<div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
				<NavBarClient session={session!} />
			</div>
		</div>
	);
};
