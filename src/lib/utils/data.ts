import type { RawShow, Artist, Venue, Show, ShowStatus, ShowsByDate, ShowsByMonth, CalendarDay, CalendarMonth } from '$lib/types';

export function deriveStatus(show: RawShow): ShowStatus {
	if (show.attended) return 'attended';
	if (show.tickets_purchased) return 'tickets_purchased';
	if (show.interested) return 'interested';
	return 'none';
}

export function enrichShows(rawShows: RawShow[], artists: Artist[], venues: Venue[]): Show[] {
	const artistMap = new Map(artists.map((a) => [a.name, a]));
	const venueMap = new Map(venues.map((v) => [v.id, v]));

	return rawShows
		.map((raw): Show => {
			const venue = venueMap.get(raw.venue_id);
			if (!venue) throw new Error(`Unknown venue_id: ${raw.venue_id}`);

			const knownArtists: Artist[] = [];
			const unknownArtists: string[] = [];
			for (const name of raw.artists) {
				const artist = artistMap.get(name);
				if (artist) knownArtists.push(artist);
				else unknownArtists.push(name);
			}

			return {
				id: raw.id,
				date: new Date(raw.date + 'T00:00:00'),
				dateString: raw.date,
				venue,
				artists: knownArtists,
				unknownArtists,
				recommended: raw.recommended,
				notes: raw.notes,
				status: deriveStatus(raw)
			};
		})
		.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function groupByMonth(shows: Show[]): ShowsByMonth {
	const result: ShowsByMonth = new Map();
	for (const show of shows) {
		const monthKey = show.dateString.slice(0, 7);
		if (!result.has(monthKey)) result.set(monthKey, new Map());
		const byDate = result.get(monthKey)!;
		if (!byDate.has(show.dateString)) byDate.set(show.dateString, []);
		byDate.get(show.dateString)!.push(show);
	}
	return result;
}

export function buildCalendarMonths(shows: Show[]): CalendarMonth[] {
	const byMonth = groupByMonth(shows);
	const months: CalendarMonth[] = [];

	for (const [monthKey] of byMonth) {
		const [year, month] = monthKey.split('-').map(Number);
		const monthIndex = month - 1;

		const label = new Date(year, monthIndex, 1).toLocaleString('en-US', {
			month: 'long',
			year: 'numeric'
		}).toUpperCase();

		const firstDay = new Date(year, monthIndex, 1);
		const lastDay = new Date(year, monthIndex + 1, 0);
		const startPad = firstDay.getDay();

		const cells: (CalendarDay | null)[] = [];

		for (let i = 0; i < startPad; i++) cells.push(null);

		for (let d = 1; d <= lastDay.getDate(); d++) {
			const date = new Date(year, monthIndex, d);
			const dateString = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
			const dayShows = shows.filter((s) => s.dateString === dateString);
			cells.push({ date, dateString, shows: dayShows });
		}

		while (cells.length % 7 !== 0) cells.push(null);

		const weeks: (CalendarDay | null)[][] = [];
		for (let i = 0; i < cells.length; i += 7) {
			weeks.push(cells.slice(i, i + 7));
		}

		months.push({ year, month: monthIndex, label, weeks });
	}

	return months;
}
