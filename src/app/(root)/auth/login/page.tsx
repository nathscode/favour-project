import getCurrentUser from "@/actions/getCurrentUser";
import LoginForm from "@/components/form/LoginForm";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage = async () => {
	const session = await getCurrentUser();

	if (session) {
		return redirect("/profile");
	}
	return (
		<div className="flex justify-center items-center flex-col w-full py-24">
			<div className="flex flex-col items-center justify-center w-full max-w-lg">
				<LoginForm />
			</div>
		</div>
	);
};

export default LoginPage;
