import PaymentForm from "@/components/form/PaymentForm";
import React from "react";

type Props = {};

const PaymentPage = async (props: Props) => {
	return (
		<div className="flex justify-center items-center flex-col w-full py-24">
			<div className="flex flex-col items-center justify-center w-full max-w-lg">
				<h2 className="text-2xl font-semibold leading-tight text-foreground sm:text-2xl">
					Make Payment
				</h2>
				<div className="flex flex-col w-full">
					<PaymentForm subTotal={90000} />
				</div>
			</div>
		</div>
	);
};

export default PaymentPage;
