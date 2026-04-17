<script lang="ts">
	import type { ViewMode } from '$lib/types';

	let {
		view,
		onViewChange
	}: {
		view: ViewMode;
		onViewChange: (v: ViewMode) => void;
	} = $props();
</script>

<header class="border-b-4 border-bauhaus-fg bg-bauhaus-bg">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
		<!-- Bauhaus geometric logo mark + wordmark -->
		<div class="flex items-center gap-3">
			<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<!-- Blue square base -->
				<rect x="6" y="6" width="24" height="24" fill="#1040C0" />
				<!-- Red circle overlapping top-left -->
				<circle cx="13" cy="13" r="10" fill="#D02020" />
				<!-- Yellow triangle in bottom-right -->
				<polygon points="36,20 36,36 20,36" fill="#F0C020" />
				<!-- Black center dot for visual anchor -->
				<circle cx="18" cy="18" r="2" fill="#121212" />
			</svg>
			<div class="flex flex-col leading-none">
				<span class="text-xs font-bold uppercase tracking-widest text-bauhaus-fg/60">Chicago</span>
				<span class="text-lg font-black uppercase tracking-tight text-bauhaus-fg md:text-xl">Concerts</span>
			</div>
		</div>

		<!-- View toggle buttons -->
		<div class="flex border-2 border-bauhaus-fg">
			<button
				class="cursor-pointer px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ease-out active:translate-x-[1px] active:translate-y-[1px] md:px-6 md:text-sm
					{view === 'list'
					? 'bg-bauhaus-fg text-white shadow-[2px_2px_0px_0px_#121212]'
					: 'bg-bauhaus-bg text-bauhaus-fg hover:bg-bauhaus-yellow'}"
				onclick={() => onViewChange('list')}
			>
				List
			</button>
			<div class="w-px bg-bauhaus-fg"></div>
			<button
				class="cursor-pointer px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ease-out active:translate-x-[1px] active:translate-y-[1px] md:px-6 md:text-sm
					{view === 'calendar'
					? 'bg-bauhaus-fg text-white shadow-[2px_2px_0px_0px_#121212]'
					: 'bg-bauhaus-bg text-bauhaus-fg hover:bg-bauhaus-yellow'}"
				onclick={() => onViewChange('calendar')}
			>
				Calendar
			</button>
		</div>
	</div>
</header>
