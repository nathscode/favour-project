import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getCurrentUser();

	if (!session) {
		return redirect("/auth/login");
	}

	return <div className="relative">{children}</div>;
};
export default ProfileLayout;
