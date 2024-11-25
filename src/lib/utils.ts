import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function stringifyObj(data: Object) {
	if (typeof data !== "object") return data;
	return JSON.parse(JSON.stringify(data));
}

export function generateRandomNumbers(count: number): string {
	let numbers: string[] = [];
	for (let i = 0; i < count; i++) {
		let randomNumber = Math.floor(Math.random() * (9 - 0) + 0);
		numbers.push(randomNumber.toString());
	}
	return numbers.join("");
}

export function formatCurrency(
	price: number | string,
	country?: string,
	currencyCode?: string,
	options: {
		currency?: "NGN" | "USD" | "EUR" | "GBP" | "BDT";
		notation?: Intl.NumberFormatOptions["notation"];
	} = {}
) {
	const {
		currency = currencyCode ? currencyCode : "NGN",
		notation = "standard",
	} = options;
	const newCountry = country ? country : "en-NG";
	const numericPrice =
		typeof price === "string" ? parseFloat(price) : Number(price);
	return new Intl.NumberFormat(newCountry, {
		style: "currency",
		currency,
		notation,
		maximumFractionDigits: 2,
	}).format(numericPrice);
}

export function formatDateTime(date: string): string {
	return moment.utc(date).format("DD MMM, YYYY, HH:mm A");
}

export function getFirstTwoLetters(email: string): string {
	const trimmedEmail = email.trim().replace(/^[^a-zA-Z]+/, "");
	if (trimmedEmail.length < 2) {
		return "";
	}

	return trimmedEmail.slice(0, 2);
}
