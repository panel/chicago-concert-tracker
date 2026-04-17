<script lang="ts">
	import type { PageData } from './$types';
	import type { Artist } from '$lib/types';

	let { data }: { data: PageData } = $props();
	const show = $derived(data.show);

	const dateFormatted = $derived(
		show.date
			.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
			.toUpperCase()
	);

	const statusConfig = {
		none: null,
		interested: { bg: 'bg-bauhaus-yellow text-bauhaus-fg', label: 'Interested' },
		tickets_purchased: { bg: 'bg-bauhaus-blue text-white', label: 'Tickets Purchased' },
		attended: { bg: 'bg-bauhaus-red text-white', label: 'Attended' }
	} as const;

	const matchTypeLabel: Record<Artist['match_type'], string> = {
		main: 'Main Pick',
		stretch: 'Stretch Pick',
		reference: 'Reference'
	};

	const matchTypeBg: Record<Artist['match_type'], string> = {
		main: 'bg-bauhaus-fg text-white',
		stretch: 'bg-bauhaus-yellow text-bauhaus-fg',
		reference: 'bg-bauhaus-muted text-bauhaus-fg/60'
	};

	const statusCfg = $derived(statusConfig[show.status]);
</script>

<svelte:head>
	<title>{show.artists.map((a) => a.name).join(', ')} — Chicago Concerts</title>
</svelte:head>

<div class="min-h-screen bg-bauhaus-bg">
	<!-- Nav strip -->
	<header class="border-b-4 border-bauhaus-fg bg-bauhaus-bg">
		<div class="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3 md:px-6">
			<a
				href="/"
				class="flex items-center gap-2 border-2 border-bauhaus-fg bg-bauhaus-bg px-3 py-1.5 text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_#121212] transition-all duration-200 hover:bg-bauhaus-yellow active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
			>
				← Back
			</a>
			<span class="text-xs font-bold uppercase tracking-widest text-bauhaus-fg/40">Show Detail</span>
		</div>
	</header>

	<main class="mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-10">

		<!-- Date headline — Bauhaus poster style -->
		<div class="mb-6 border-4 border-bauhaus-fg bg-bauhaus-fg shadow-[6px_6px_0px_0px_#D02020]">
			<p class="px-5 py-4 font-black uppercase leading-none tracking-tight text-white text-2xl md:text-4xl">
				{dateFormatted}
			</p>
		</div>

		<!-- Venue + status row -->
		<div class="mb-8 flex flex-wrap items-center gap-3">
			<a
				href={show.venue.website}
				target="_blank"
				rel="noopener noreferrer"
				class="border-2 border-bauhaus-fg bg-bauhaus-yellow px-4 py-2 text-sm font-bold uppercase tracking-wider shadow-[3px_3px_0px_0px_#121212] transition-all duration-200 hover:bg-bauhaus-yellow/80 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
			>
				{show.venue.name} ↗
			</a>

			{#if statusCfg}
				<span class="border-2 border-bauhaus-fg px-4 py-2 text-sm font-bold uppercase tracking-wider {statusCfg.bg}">
					{statusCfg.label}
				</span>
			{/if}

			{#if show.recommended}
				<span class="flex items-center gap-2 border-2 border-bauhaus-fg bg-white px-4 py-2 text-sm font-bold uppercase tracking-wider">
					<span class="h-2 w-2 rounded-full bg-bauhaus-fg"></span>
					Recommended
				</span>
			{/if}
		</div>

		<!-- Show notes -->
		{#if show.notes}
			<div class="mb-8 border-l-4 border-bauhaus-fg bg-white p-4 shadow-[4px_4px_0px_0px_#121212]">
				<p class="text-sm font-medium italic text-bauhaus-fg/70">{show.notes}</p>
			</div>
		{/if}

		<!-- Artists -->
		<div class="mb-4 flex items-center gap-3">
			<h2 class="text-lg font-black uppercase tracking-tight text-bauhaus-fg md:text-2xl">Artists</h2>
			<div class="h-px flex-1 bg-bauhaus-fg"></div>
		</div>

		<div class="flex flex-col gap-4 mb-10">
			{#each show.artists as artist (artist.name)}
				<div class="border-4 border-bauhaus-fg bg-white shadow-[6px_6px_0px_0px_#121212]">
					<!-- Artist header bar -->
					<div class="flex items-center justify-between border-b-4 border-bauhaus-fg px-4 py-3">
						<h3 class="text-lg font-black uppercase tracking-tight md:text-xl">{artist.name}</h3>
						<span class="rounded-none px-2 py-0.5 text-xs font-bold uppercase tracking-widest {matchTypeBg[artist.match_type]}">
							{matchTypeLabel[artist.match_type]}
						</span>
					</div>

					<div class="p-4 flex flex-col gap-3">
						<!-- Genres + Labels -->
						<div class="flex flex-wrap gap-2">
							{#each artist.genres as genre (genre)}
								<span class="border-2 border-bauhaus-fg bg-bauhaus-muted px-2 py-0.5 text-xs font-bold uppercase tracking-wider">
									{genre}
								</span>
							{/each}
							{#each artist.labels as label (label)}
								<span class="border-2 border-bauhaus-blue px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-bauhaus-blue">
									{label}
								</span>
							{/each}
						</div>

						<!-- Notes -->
						{#if artist.notes}
							<p class="text-sm font-medium leading-relaxed text-bauhaus-fg/80">{artist.notes}</p>
						{/if}

						<!-- Playlist tracks -->
						{#if artist.playlist_tracks.length > 0}
							<div class="flex flex-col gap-2">
								<p class="text-xs font-bold uppercase tracking-widest text-bauhaus-fg/40">Listen</p>
								{#each artist.playlist_tracks as track (track.spotify_id)}
									<iframe
										src="https://open.spotify.com/embed/track/{track.spotify_id}?utm_source=generator"
										width="100%"
										height="80"
										frameborder="0"
										allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
										loading="lazy"
										title="{track.name} by {artist.name}"
									></iframe>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			{/each}

			<!-- Unknown artists -->
			{#each show.unknownArtists as name (name)}
				<div class="border-2 border-bauhaus-fg/30 bg-white p-4">
					<h3 class="text-base font-bold uppercase italic text-bauhaus-fg/50">{name}</h3>
					<p class="text-xs text-bauhaus-fg/40 mt-1">Not in artist database</p>
				</div>
			{/each}
		</div>

	</main>
</div>
