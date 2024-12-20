import checkIsAdmin from "@/actions/checkIsAdmin";
import getCurrentUser from "@/actions/getCurrentUser";
import LeftSideBar from "@/components/layouts/LeftSideBar";
import TopBar from "@/components/layouts/TopBar";
import { redirect } from "next/navigation";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
	const isAdmin = await checkIsAdmin();
	const isAuthenticated = await getCurrentUser();

	if (!isAuthenticated) {
		return redirect("/auth/login");
	}

	if (!isAdmin) {
		return redirect("/");
	}
	return (
		<div className="flex max-lg:flex-col text-grey-1">
			<LeftSideBar />
			<TopBar />
			<div className="flex-1 z-20">{children}</div>
		</div>
	);
};
export default MainLayout;
