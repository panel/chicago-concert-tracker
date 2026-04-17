export interface RawShow {
	id: string;
	date: string;
	venue_id: string;
	artists: string[];
	recommended: boolean;
	notes: string | null;
	discovery_date: string;
	interested?: boolean;
	tickets_purchased?: boolean;
	attended?: boolean;
}

export interface Artist {
	name: string;
	genres: string[];
	labels: string[];
	match_type: 'main' | 'stretch' | 'reference';
	notes: string;
	playlist_tracks: string[];
	first_recommended: string;
}

export interface Venue {
	id: string;
	name: string;
	website: string;
}

export type ShowStatus = 'none' | 'interested' | 'tickets_purchased' | 'attended';

export interface Show {
	id: string;
	date: Date;
	dateString: string;
	venue: Venue;
	artists: Artist[];
	unknownArtists: string[];
	recommended: boolean;
	notes: string | null;
	status: ShowStatus;
}

export type ShowsByDate = Map<string, Show[]>;
export type ShowsByMonth = Map<string, ShowsByDate>;

export type ViewMode = 'calendar' | 'list';

export interface CalendarDay {
	date: Date;
	dateString: string;
	shows: Show[];
}

export interface CalendarMonth {
	year: number;
	month: number;
	label: string;
	weeks: (CalendarDay | null)[][];
}
