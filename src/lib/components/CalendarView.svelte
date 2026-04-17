<script lang="ts">
	import type { CalendarMonth } from '$lib/types';
	import CalendarDayCell from './CalendarDayCell.svelte';

	let { months }: { months: CalendarMonth[] } = $props();

	const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const monthAccents = ['border-bauhaus-yellow', 'border-bauhaus-blue', 'border-bauhaus-red'];
	const monthBgs = ['bg-bauhaus-yellow', 'bg-bauhaus-blue', 'bg-bauhaus-red'];
	const monthTextColors = ['text-bauhaus-fg', 'text-white', 'text-white'];
</script>

<div class="flex flex-col gap-10">
	{#each months as month, monthIndex}
		<section>
			<!-- Month header -->
			<div
				class="mb-3 border-4 border-bauhaus-fg {monthBgs[monthIndex % 3]} shadow-[4px_4px_0px_0px_#121212]"
			>
				<h2
					class="px-4 py-2 text-xl font-black uppercase tracking-tight {monthTextColors[monthIndex % 3]} md:text-3xl"
				>
					{month.label}
				</h2>
			</div>

			<!-- Calendar grid -->
			<div class="border-2 border-bauhaus-fg {monthAccents[monthIndex % 3]} md:border-4">
				<!-- Day of week header -->
				<div class="grid grid-cols-7 border-b-2 border-bauhaus-fg md:border-b-4">
					{#each dayLabels as label, i}
						<div
							class="py-1.5 text-center text-[9px] font-black uppercase tracking-widest text-bauhaus-fg md:text-xs
								{i < dayLabels.length - 1 ? 'border-r border-bauhaus-fg/30' : ''}"
						>
							{label}
						</div>
					{/each}
				</div>

				<!-- Weeks -->
				{#each month.weeks as week, weekIndex}
					<div
						class="grid grid-cols-7
							{weekIndex < month.weeks.length - 1 ? 'border-b border-bauhaus-fg/30 md:border-b-2' : ''}"
					>
						{#each week as day, dayIndex}
							<div
								class="{dayIndex < 6 ? 'border-r border-bauhaus-fg/30 md:border-r-2' : ''}"
							>
								<CalendarDayCell {day} />
							</div>
						{/each}
					</div>
				{/each}
			</div>
		</section>
	{/each}
</div>
