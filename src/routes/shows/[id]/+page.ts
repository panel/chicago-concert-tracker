import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Artist, RawShow } from '$lib/types';
import showsData from '$lib/data/shows.json';
import artistsData from '$lib/data/artists.json';
import venuesData from '$lib/data/venues.json';
import { enrichShows } from '$lib/utils/data';

export const load: PageLoad = ({ params }) => {
	const shows = enrichShows(
		showsData.shows as RawShow[],
		artistsData.artists as Artist[],
		venuesData.venues
	);
	const show = shows.find((s) => s.id === params.id);
	if (!show) error(404, `Show not found: ${params.id}`);
	return { show };
};
