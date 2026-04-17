<script lang="ts">
	import type { PageData } from './$types';
	import type { ViewMode } from '$lib/types';
	import Nav from '$lib/components/Nav.svelte';
	import StatusLegend from '$lib/components/StatusLegend.svelte';
	import ListView from '$lib/components/ListView.svelte';
	import CalendarView from '$lib/components/CalendarView.svelte';

	let { data }: { data: PageData } = $props();
	let view = $state<ViewMode>('list');
</script>

<svelte:head>
	<title>Chicago Concerts</title>
</svelte:head>

<div class="min-h-screen bg-bauhaus-bg">
	<Nav {view} onViewChange={(v) => (view = v)} />

	<main class="mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-8">
		<!-- Spotify playlist embed -->
		<div class="mb-6 border-4 border-bauhaus-fg shadow-[6px_6px_0px_0px_#121212]">
			<div class="flex items-center gap-3 border-b-4 border-bauhaus-fg bg-bauhaus-yellow px-4 py-2">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
				</svg>
				<span class="text-xs font-black uppercase tracking-widest">Playlist</span>
				<a
					href="https://open.spotify.com/playlist/4NJrE7R3ei6TZz6WJr7kEj"
					target="_blank"
					rel="noopener noreferrer"
					class="ml-auto text-xs font-bold uppercase tracking-wider underline-offset-2 hover:underline"
				>
					Open in Spotify ↗
				</a>
			</div>
			<iframe
				src="https://open.spotify.com/embed/playlist/4NJrE7R3ei6TZz6WJr7kEj?utm_source=generator"
				width="100%"
				height="152"
				frameborder="0"
				allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
				loading="lazy"
				title="Chicago Concerts Playlist"
			></iframe>
		</div>

		<StatusLegend />

		{#if view === 'list'}
			<ListView byMonth={data.byMonth} />
		{:else}
			<CalendarView months={data.calendarMonths} />
		{/if}
	</main>
</div>
