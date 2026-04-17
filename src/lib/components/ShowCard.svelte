<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Show } from '$lib/types';

	let { show }: { show: Show } = $props();

	const accentBar: Record<Show['status'], string> = {
		none: 'bg-bauhaus-fg/20',
		interested: 'bg-bauhaus-yellow',
		tickets_purchased: 'bg-bauhaus-blue',
		attended: 'bg-bauhaus-red'
	};

	const statusPill: Record<Show['status'], { bg: string; label: string } | null> = {
		none: null,
		interested: { bg: 'bg-bauhaus-yellow text-bauhaus-fg', label: 'Interested' },
		tickets_purchased: { bg: 'bg-bauhaus-blue text-white', label: 'Tickets' },
		attended: { bg: 'bg-bauhaus-red text-white', label: 'Attended' }
	};

	const matchTypeStyle: Record<string, string> = {
		main: 'font-bold text-bauhaus-fg',
		stretch: 'font-bold text-bauhaus-fg',
		reference: 'font-medium text-bauhaus-fg/50'
	};

	const pill = $derived(statusPill[show.status]);
</script>

<div
	class="flex cursor-pointer border-2 border-bauhaus-fg shadow-[4px_4px_0px_0px_#121212] transition-all duration-200 ease-out hover:-translate-y-0.5 md:border-4"
	role="link"
	tabindex="0"
	onclick={() => goto(`/shows/${show.id}`)}
	onkeydown={(e) => { if (e.key === 'Enter') goto(`/shows/${show.id}`); }}
>
	<!-- Status accent bar -->
	<div class="w-2 flex-shrink-0 {accentBar[show.status]} md:w-3"></div>

	<!-- Content -->
	<div class="relative flex flex-1 flex-col gap-1 bg-white p-3 md:p-4">
		<!-- Status pill -->
		{#if pill}
			<span class="absolute right-3 top-3 rounded-full px-2 py-0.5 text-xs font-bold uppercase tracking-wider {pill.bg}">
				{pill.label}
			</span>
		{/if}

		<!-- Artists -->
		<div class="flex flex-wrap items-center gap-x-1 gap-y-0.5 pr-20">
			{#each show.artists as artist, i (artist.name)}
				{#if artist.match_type === 'stretch'}
					<span class="text-xs text-bauhaus-yellow">•</span>
				{/if}
				<span class="text-sm {matchTypeStyle[artist.match_type] ?? 'font-medium text-bauhaus-fg'}">
					{artist.name}{i < show.artists.length - 1 || show.unknownArtists.length > 0 ? ',' : ''}
				</span>
			{/each}
			{#each show.unknownArtists as name, i (name)}
				<span class="text-sm font-medium italic text-bauhaus-fg/60">
					{name}{i < show.unknownArtists.length - 1 ? ',' : ''}
				</span>
			{/each}
		</div>

		<!-- Venue + recommended dot -->
		<div class="flex items-center gap-2">
			<a
				href={show.venue.website}
				target="_blank"
				rel="noopener noreferrer"
				class="text-xs font-medium text-bauhaus-fg/60 underline-offset-2 hover:text-bauhaus-blue hover:underline md:text-sm"
				onclick={(e) => e.stopPropagation()}
			>
				{show.venue.name}
			</a>
			{#if show.recommended}
				<div class="h-2 w-2 flex-shrink-0 rounded-full bg-bauhaus-fg" title="Recommended"></div>
			{/if}
		</div>

		<!-- Notes -->
		{#if show.notes}
			<p class="mt-0.5 text-xs italic text-bauhaus-fg/50">{show.notes}</p>
		{/if}
	</div>
</div>
