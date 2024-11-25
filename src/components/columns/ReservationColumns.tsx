"use client";

import { formatDateTime } from "@/lib/utils";
import { SafeReservation } from "@/types";
import { ReservationType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const ReservationColumns: ColumnDef<SafeReservation>[] = [
	{
		accessorKey: "sn",
		header: "SN",
		cell: ({ row }) => <span>{row.index + 1}</span>,
	},
	{
		accessorKey: "id",
		header: "Reservation ID",
		cell: ({ row }) => (
			<Link
				href={`/dashboard/reservations/${row.original.id}`}
				className="hover:text-brand"
			>
				{row.original.id}
			</Link>
		),
	},
	{
		accessorKey: "Reserved",
		header: "Reserved",
		cell: ({ row }) => {
			if (row.original.status === "PENDING") {
				("No room serve");
			} else {
				row.original.reservationType === ReservationType.OFFCAMPUS
					? row.original.property.title
					: row.original?.room[0].roomNumber;
			}
		},
	},
	{
		accessorKey: "ReservedBy",
		header: "ReservedBy",
		cell: ({ row }) =>
			row.original.student ? row.original.student.user.name : "No assigned Yet",
	},
	{
		accessorKey: "Date",
		header: "Date",
		cell: ({ row }) => formatDateTime(row.original.createdAt!.toString()!),
	},
	{
		id: "actions",
		cell: ({ row }) => (
			<Link href={`/dashboard/reservations/${row.original.id}`}>View</Link>
		),
	},
];
