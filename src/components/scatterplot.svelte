<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { scaleLinear } from 'd3-scale';
	import type { BeerI } from 'src/models/Beer.interface';
	import Beer from '../components/beer.svelte';

	const dispatch = createEventDispatcher();
	export let beers: BeerI[];

	let svg;
	let width = 500;
	let height = 200;

	$: values = beers?.map((b) => b.rating);
	$: max = Math.max(...values);
	$: min = Math.min(...values);
	console.log('beers', beers);

	// onMount(() => {
	// 	resize();
	// });

	const setSelectedBeer = (beer: BeerI | undefined) => {
		dispatch('setSelectedBeer', { beer });
	};

	const padding = { top: 20, right: 20, bottom: 20, left: 20 };

	$: xScale = scaleLinear()
		.domain([0, max])
		.range([padding.left, width - padding.right]);

	$: yScale = scaleLinear()
		.domain([0, max])
		.range([height - padding.bottom, padding.top]);

	$: xTicks = [min, max];

	$: yTicks = [min, max];

	function resize() {
		({ width, height } = svg.getBoundingClientRect());
	}
</script>

<!-- <svelte:window on:resize={resize} /> -->
{#if width > 0 && height > 0}
	<svg bind:this={svg}>
		<!-- y axis -->
		<g class="axis y-axis">
			{#each yTicks as tick}
				<g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
					<line x1={padding.left} x2={xScale(22)} />
					<text x={padding.left - 8} y="+4">{tick}</text>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g class="axis x-axis">
			{#each xTicks as tick}
				<g class="tick" transform="translate({xScale(tick)},0)">
					<line y1={yScale(0)} y2={yScale(13)} />
					<text y={height - padding.bottom + 16}>{tick}</text>
				</g>
			{/each}
		</g>

		<!-- data -->
		{#each beers as value}
			<circle
				cx={xScale(value.rating)}
				cy={yScale(value.rating)}
				r={value.alcohol * 2}
				class="circle"
				on:mouseenter={() => setSelectedBeer(value)}
				on:mouseleave={() => setSelectedBeer(undefined)}
			/>
		{/each}
	</svg>
{/if}

<style>
	svg {
		width: 100%;
		height: 100%;
		float: left;
	}

	circle {
		color: var(--primary-color);
		fill-opacity: 0.6;
		stroke: #000;
	}
	.circle:hover {
		cursor: pointer;
	}

	.tick line {
		stroke: #ddd;
		stroke-dasharray: 2;
	}

	text {
		font-size: 12px;
		fill: #999;
	}

	.x-axis text {
		text-anchor: middle;
	}

	.y-axis text {
		text-anchor: end;
	}
</style>
