"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
	{ month: "January", student: 350 },
	{ month: "February", student: 100 },
	{ month: "March", student: 150 },
	{ month: "April", student: 250 },
	{ month: "May", student: 180 },
	{ month: "June", student: 200 },
	{ month: "July", student: 186 },
	{ month: "August", student: 305 },
	{ month: "September", student: 237 },
	{ month: "October", student: 73 },
	{ month: "November", student: 209 },
	{ month: "December", student: 214 },
];

const chartConfig = {
	student: {
		label: "Student",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

export function StudentChart() {
	return (
		<Card className="size-full">
			<CardHeader>
				<CardTitle>Students Reservations</CardTitle>
				<CardDescription>July - December 2024</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={5}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={true}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Bar dataKey="student" fill="var(--color-desktop)" radius={8} />
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing total students reservations for the last 6 months
				</div>
			</CardFooter>
		</Card>
	);
}
