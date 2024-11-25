import { z } from "zod";

export const AddHostelSchema = z.object({
	name: z.string().min(1, {
		message: "name required",
	}),
	description: z.string().min(1, {
		message: "description required",
	}),
	location: z.string().min(1, {
		message: "location required",
	}),
});

export type AddHostelSchemaInfer = z.infer<typeof AddHostelSchema>;

export const AddRoomSchema = z.object({
	id: z.string().optional(),
	roomNumber: z.string().min(1, {
		message: "room number required",
	}),
	capacity: z.string().min(1, {
		message: "capacity required",
	}),
});

export type AddRoomSchemaInfer = z.infer<typeof AddRoomSchema>;

export const ReserveRoomSchema = z.object({
	id: z.string().optional(),
	paymentMethod: z.string().optional(),
	amount: z.coerce.number().optional(),
	campus: z.string().min(1, {
		message: "campus number required",
	}),
	location: z.string().min(1, {
		message: "location required",
	}),
});

export type ReserveRoomSchemaInfer = z.infer<typeof ReserveRoomSchema>;

export const AttachRoomSchema = z.object({
	id: z.string().optional(),
	roomId: z.string().min(1, { message: "room id needed" }),
});

export type AttachRoomSchemaInfer = z.infer<typeof AttachRoomSchema>;
