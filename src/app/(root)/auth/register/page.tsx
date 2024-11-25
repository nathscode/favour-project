import RegisterForm from "@/components/form/RegisterForm";

const RegisterPage = async () => {
	return (
		<div className="flex justify-center items-center flex-col w-full py-24">
			<div className="flex flex-col items-center justify-center w-full max-w-2xl">
				<RegisterForm />
			</div>
		</div>
	);
};

export default RegisterPage;
