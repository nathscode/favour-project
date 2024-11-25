"use client";

import { formatDateTime } from "@/lib/utils";
import { SafeStudent } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const StudentColumns: ColumnDef<SafeStudent>[] = [
	{
		accessorKey: "sn",
		header: "SN",
		cell: ({ row }) => <span>{row.index + 1}</span>,
	},
	{
		accessorKey: "id",
		header: "Student ID",
		cell: ({ row }) => <span>{row.original.id}</span>,
	},
	{
		accessorKey: "Name",
		header: "Name",
		cell: ({ row }) => row.original.user.name,
	},
	{
		accessorKey: "Department",
		header: "Department",
		cell: ({ row }) => (
			<span>{`${row.original.department} - ${row.original.level}`} </span>
		),
	},
	{
		accessorKey: "Date",
		header: "Date",
		cell: ({ row }) => formatDateTime(row.original.createdAt!.toString()!),
	},
];
