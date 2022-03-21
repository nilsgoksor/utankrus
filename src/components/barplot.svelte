<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import Card, { Content } from '@smui/card';
	import rangeInclusive from 'range-inclusive';

	export let heading: string;
	export let points: { x: number; y: number; label: string }[];
	let min = Math.floor(Math.min(...points.map((p) => p.x)));
	let max = Math.ceil(Math.max(...points.map((p) => p.x)));

	const yTicks = rangeInclusive(min, max);

	const padding = { top: 20, right: 15, bottom: 50, left: 25 };

	let width = 960;
	let height = 200;

	function formatMobile(tick) {
		return "'" + tick.toString().slice(-2);
	}

	$: xScale = scaleLinear()
		.domain([0, 10])
		.range([padding.left, width - padding.right]);

	$: yScale = scaleLinear()
		.domain([Math.min.apply(null, yTicks), Math.max.apply(null, yTicks)])
		.range([height - padding.bottom, padding.top]);

	$: innerWidth = width - (padding.left + padding.right);
	$: barWidth = innerWidth / points.length;
</script>

<Card>
	<Content>
		<h2>{heading}</h2>
		<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
			<svg>
				<!-- y axis -->
				<g class="axis y-axis">
					{#each yTicks as tick}
						<g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
							<line x2="100%" />
							<text y="-4">{tick}</text>
						</g>
					{/each}
				</g>

				<!-- x axis -->
				<g class="axis x-axis">
					{#each points as point, i}
						<g class="tick" transform="translate({xScale(i)},{height})">
							<text x={barWidth / 2} y="-4">{width > 380 ? point.x : formatMobile(point.x)}</text>
						</g>
					{/each}
				</g>

				<g class="bars">
					{#each points as point, i}
						<rect
							x={xScale(i) + 2}
							y={yScale(point.y)}
							width={barWidth - 4}
							height={yScale(0) - yScale(point.y)}
						/>
					{/each}
				</g>
			</svg>
		</div>
	</Content>
</Card>

<style>
	h2 {
		text-align: center;
		color: var(--accent-color);
		padding: 20px;
	}

	svg {
		position: relative;
		width: 100%;
		height: 200px;
	}

	.tick {
		font-family: Helvetica, Arial;
		font-size: 0.725em;
		font-weight: 200;
	}

	.tick line {
		stroke: #e2e2e2;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: var(--accent-color);
		text-anchor: start;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}

	.x-axis .tick text {
		text-anchor: middle;
	}

	.bars rect {
		fill: var(--accent-color);
		stroke: none;
		opacity: 0.65;
	}
</style>
