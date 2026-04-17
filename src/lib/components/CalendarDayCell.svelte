<script lang="ts">
	import type { CalendarDay } from '$lib/types';

	let { day }: { day: CalendarDay | null } = $props();

	const statusBorder: Record<string, string> = {
		none: 'border-l-2 border-bauhaus-fg/30 bg-bauhaus-fg/5',
		interested: 'border-l-2 border-bauhaus-yellow bg-bauhaus-yellow/20',
		tickets_purchased: 'border-l-2 border-bauhaus-blue bg-bauhaus-blue/10',
		attended: 'border-l-2 border-bauhaus-red bg-bauhaus-red/10'
	};

	function firstArtistLabel(show: CalendarDay['shows'][number]): string {
		const all = [
			...show.artists.map((a) => a.name),
			...show.unknownArtists
		];
		if (all.length === 0) return '(TBA)';
		if (all.length === 1) return all[0];
		return `${all[0]} +${all.length - 1}`;
	}
</script>

{#if !day}
	<div class="min-h-16 bg-bauhaus-muted/30 md:min-h-24"></div>
{:else}
	<div class="group min-h-16 bg-white p-1 md:min-h-24 md:p-1.5">
		<!-- Day number -->
		<div class="mb-1 text-right text-[10px] font-bold text-bauhaus-fg/50 md:text-xs">
			{day.date.getDate()}
		</div>

		<!-- Show mini-cards -->
		{#each day.shows as show (show.id)}
			<div
				class="mb-0.5 overflow-hidden px-1 py-0.5 {statusBorder[show.status]}"
				title="{show.artists.map((a) => a.name).join(', ')}{show.unknownArtists.length ? ', ' + show.unknownArtists.join(', ') : ''} @ {show.venue.name}"
			>
				<p class="truncate text-[9px] font-bold uppercase leading-tight text-bauhaus-fg md:text-[10px]">
					{firstArtistLabel(show)}
				</p>
				<p class="truncate text-[8px] font-medium text-bauhaus-fg/50 md:text-[9px]">
					{show.venue.name}
				</p>
			</div>
		{/each}
	</div>
{/if}
