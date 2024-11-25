import React from "react";

type Props = {};

const AlertBanner = (props: Props) => {
	return (
		<div className="flex flex-col justify-center items-center bg-red-100 text-black p-2">
			<p>Hostel Reservation is now available for booking</p>
		</div>
	);
};

export default AlertBanner;
