"use client";

import { formatDateTime } from "@/lib/utils";
import { SafeHostel } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const HostelColumns: ColumnDef<SafeHostel>[] = [
	{
		accessorKey: "sn",
		header: "SN",
		cell: ({ row }) => <span>{row.index + 1}</span>,
	},
	{
		accessorKey: "id",
		header: "Hostel ID",
		cell: ({ row }) => <div className="max-w-144">{row.original.id}</div>,
	},
	{
		accessorKey: "Name",
		header: "Name",
		cell: ({ row }) => row.original.name,
	},
	{
		accessorKey: "Location",
		header: "Location",
		cell: ({ row }) => <span>{row.original.location}</span>,
	},
	{
		accessorKey: "rooms",
		header: "rooms",
		cell: ({ row }) => <span>{`${row.original.room?.length || 0}`}</span>,
	},
	{
		id: "actions",
		cell: ({ row }) => (
			<Link
				href={`/dashboard/hostels/${row.original.id}`}
				className="hover:text-brand hover:underline"
			>
				View
			</Link>
		),
	},
];
