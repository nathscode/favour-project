import {
	Hostel,
	Landlord,
	Payment,
	Property,
	Reservation,
	Review,
	Room,
	Student,
	User,
} from "@prisma/client";
import { ISODateString } from "next-auth";

export type CustomUser = {
	id?: string;
	name?: string | null;
	email?: string | null;
	mobileNumber?: string | null;
	gender?: string | null;
	role?: string | null;
};

export type CustomSession = {
	user?: CustomUser;
	expires: ISODateString;
};

export type SafeUser =
	| (Omit<User, "createdAt" | "updatedAt"> & {
			createdAt: string;
			updatedAt: string;
	  })
	| null;

export type SafeProperty = Omit<Property, "createdAt"> & {
	createdAt: string;
	updatedAt: string;
};
export type SafeStudent = Omit<Student, "createdAt"> & {
	createdAt: string;
	updatedAt: string;
	user: User;
	reservations: Reservation[] | null;
};
export type SafeLandlord = Omit<Landlord, "createdAt"> & {
	createdAt: string;
	updatedAt: string;
};
export type SafeRoom = Omit<Room, "createdAt"> & {
	createdAt: string;
	updatedAt: string;
	hostel: SafeHostel[] | null;
};
export type SafeReservation = Omit<Reservation, "createdAt"> & {
	createdAt: string;
	updatedAt: string;
	property: SafeProperty;
	student: SafeStudent;
	room: SafeRoom[];
};

export type SafeHostel = Omit<Hostel, "createdAt"> & {
	createdAt: string;
	updatedAt: string;
	room: (SafeRoom[] | null)[];
};
export type SafePayment = Omit<Payment, "createdAt"> & {
	createdAt: string;
	updatedAt: string;
};
export type SafeReview = Omit<Review, "createdAt"> & {
	createdAt: string;
	updatedAt: string;
	property: SafeProperty;
	student: SafeStudent;
};
