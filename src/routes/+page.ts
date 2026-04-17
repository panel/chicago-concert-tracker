import type { PageLoad } from './$types';
import type { Artist, RawShow } from '$lib/types';
import showsData from '$lib/data/shows.json';
import artistsData from '$lib/data/artists.json';
import venuesData from '$lib/data/venues.json';
import { enrichShows, groupByMonth, buildCalendarMonths } from '$lib/utils/data';

export const load: PageLoad = () => {
	const shows = enrichShows(
		showsData.shows as RawShow[],
		artistsData.artists as Artist[],
		venuesData.venues
	);
	return {
		shows,
		byMonth: groupByMonth(shows),
		calendarMonths: buildCalendarMonths(shows)
	};
};
