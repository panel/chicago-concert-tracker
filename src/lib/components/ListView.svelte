<script lang="ts">
	import type { ShowsByMonth } from '$lib/types';
	import ShowCard from './ShowCard.svelte';

	let { byMonth }: { byMonth: ShowsByMonth } = $props();

	function formatMonthKey(key: string): string {
		const [year, month] = key.split('-').map(Number);
		return new Date(year, month - 1, 1)
			.toLocaleString('en-US', { month: 'long', year: 'numeric' })
			.toUpperCase();
	}

	function formatDateKey(key: string): string {
		const [year, month, day] = key.split('-').map(Number);
		return new Date(year, month - 1, day).toLocaleString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric'
		}).toUpperCase();
	}

	const monthColors = ['bg-bauhaus-yellow', 'bg-bauhaus-blue', 'bg-bauhaus-red'];
	const monthTextColors = ['text-bauhaus-fg', 'text-white', 'text-white'];
</script>

<div class="flex flex-col gap-12">
	{#each [...byMonth.entries()] as [monthKey, byDate], monthIndex}
		<section>
			<!-- Month header — color blocked, Bauhaus style -->
			<div class="mb-6 border-4 border-bauhaus-fg {monthColors[monthIndex % 3]} shadow-[4px_4px_0px_0px_#121212]">
				<h2 class="px-4 py-3 text-2xl font-black uppercase tracking-tight {monthTextColors[monthIndex % 3]} md:text-4xl">
					{formatMonthKey(monthKey)}
				</h2>
			</div>

			<div class="flex flex-col gap-6">
				{#each [...byDate.entries()] as [dateKey, shows]}
					<div>
						<!-- Date sub-heading -->
						<div class="mb-3 flex items-center gap-3 border-b-2 border-bauhaus-fg/20 pb-2">
							<div class="w-1 self-stretch bg-bauhaus-fg/30"></div>
							<h3 class="text-sm font-bold uppercase tracking-widest text-bauhaus-fg/60">
								{formatDateKey(dateKey)}
							</h3>
						</div>

						<!-- Shows for this date -->
						<div class="flex flex-col gap-3">
							{#each shows as show}
								<ShowCard {show} />
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/each}
</div>
