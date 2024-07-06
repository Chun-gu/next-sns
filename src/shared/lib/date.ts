export function formatDateByLocale(date: Date, locale: string = "ko-KR") {
	const formatter = new Intl.DateTimeFormat(locale, {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return formatter.format(date);
}
