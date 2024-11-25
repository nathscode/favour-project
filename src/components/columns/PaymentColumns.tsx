"use client";

import { formatDateTime } from "@/lib/utils";
import { SafePayment } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const PaymentColumns: ColumnDef<SafePayment>[] = [
	{
		accessorKey: "sn",
		header: "SN",
		cell: ({ row }) => <span>{row.index + 1}</span>,
	},
	{
		accessorKey: "id",
		header: "Payment ID",
		cell: ({ row }) => <span>{row.original.id}</span>,
	},
	{
		accessorKey: "amount",
		header: "amount",
		cell: ({ row }) => row.original.amount,
	},
	{
		accessorKey: "PaymentMethod",
		header: "Payment Method",
		cell: ({ row }) => <span>{row.original.paymentMethod}</span>,
	},
	{
		accessorKey: "Date",
		header: "Date",
		cell: ({ row }) => formatDateTime(row.original.paymentDate!.toString()!),
	},
];
