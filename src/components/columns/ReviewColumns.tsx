"use client";

import { formatDateTime } from "@/lib/utils";
import { SafeReview } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const ReviewColumns: ColumnDef<SafeReview>[] = [
	{
		accessorKey: "sn",
		header: "SN",
		cell: ({ row }) => <span>{row.index + 1}</span>,
	},
	{
		accessorKey: "id",
		header: "Review ID",
		cell: ({ row }) => <span>{row.original.id}</span>,
	},
	{
		accessorKey: "Rating",
		header: "Rating",
		cell: ({ row }) => row.original.rating,
	},
	{
		accessorKey: "Comment",
		header: "Comment",
		cell: ({ row }) => <span>{row.original.comment}</span>,
	},
	{
		accessorKey: "property",
		header: "property",
		cell: ({ row }) => <span>{row.original.property.title}</span>,
	},
	{
		accessorKey: "student",
		header: "student",
		cell: ({ row }) => <span>{row.original.student.user.name}</span>,
	},
	{
		accessorKey: "Date",
		header: "Date",
		cell: ({ row }) => formatDateTime(row.original.createdAt!.toString()!),
	},
];
