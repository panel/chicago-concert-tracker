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
		<StatusLegend />

		{#if view === 'list'}
			<ListView byMonth={data.byMonth} />
		{:else}
			<CalendarView months={data.calendarMonths} />
		{/if}
	</main>
</div>
