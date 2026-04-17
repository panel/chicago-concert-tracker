<script lang="ts">
	const items = [
		{ color: 'bg-bauhaus-yellow', label: 'Interested' },
		{ color: 'bg-bauhaus-blue', label: 'Tickets' },
		{ color: 'bg-bauhaus-red', label: 'Attended' }
	] as const;
</script>

<div class="mb-4 flex flex-wrap items-center gap-4 border-b-2 border-bauhaus-fg/20 py-3">
	<span class="text-xs font-bold uppercase tracking-widest text-bauhaus-fg/40">Status</span>

	{#each items as item}
		<div class="flex items-center gap-1.5">
			<div class="h-3 w-3 border border-bauhaus-fg/30 {item.color}"></div>
			<span class="text-xs font-bold uppercase tracking-wider text-bauhaus-fg">{item.label}</span>
		</div>
	{/each}

	<div class="flex items-center gap-1.5">
		<div class="h-2 w-2 rounded-full bg-bauhaus-fg"></div>
		<span class="text-xs font-bold uppercase tracking-wider text-bauhaus-fg">Recommended</span>
	</div>
</div>
