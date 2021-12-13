<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import type { BeerI } from 'src/models/Beer.interface';
	import Beer from '../components/beer.svelte';
	import Scatterplot from '../components/scatterplot.svelte';

	import { onMount } from 'svelte';
	import db from '../firebase/db';

	let selectedBeer: BeerI | undefined;

	function updateSelectedBeer(beer: BeerI | undefined) {
		selectedBeer = beer;
	}

	let beers: BeerI[] = [];
	let totalBeers: number;
	let mostPopularBeers: BeerI[] = [];
	let leastPopularBeers: BeerI[] = [];

	onMount(async () => {
		fetchData();
	});

	function fetchData() {
		db.collection('ratings')
			.get()
			.then((querySnapshot) => {
				const data = querySnapshot.docs.map((doc) => doc.data()) as BeerI[];
				beers = data;
				totalBeers = data.length;
				mostPopularBeers = getMostPopularBeers(data);
				leastPopularBeers = getLeastPopularBeers(data);
			});
	}

	function getMostPopularBeers(data: BeerI[]) {
		return data
			.sort((a, b) => {
				if (a.rating < b.rating) {
					return 1;
				} else if (b.rating < a.rating) {
					return -1;
				}
				return 0;
			})
			.splice(0, 10);
	}

	function getLeastPopularBeers(data: BeerI[]) {
		return data
			.sort((a, b) => {
				if (a.rating > b.rating) {
					return 1;
				} else if (b.rating > a.rating) {
					return -1;
				}
				return 0;
			})
			.splice(0, 10);
	}
</script>

<svelte:head>
	<title>Ölklubben utankrus</title>
</svelte:head>

<section>
	<h1>Statistik</h1>
	<p>Kommer snart!</p>
	<!-- {#if typeof selectedBeer !== 'undefined'}
		<Beer beer={selectedBeer} />
	{/if}
	<h2>Bästa och sämsta öl</h2>
	<div class="grid">
		<div>
			<p>10 Bästa</p>
			<Scatterplot beers={mostPopularBeers} on:setSelectedBeer={() => updateSelectedBeer} />
		</div>
		<div>
			<p>10 sämsta</p>
			<Scatterplot beers={leastPopularBeers} on:setSelectedBeer={() => updateSelectedBeer} />
		</div>
	</div> -->
	<!-- <h2>Rating över tid</h2>
	<div>
		<Scatterplot beers={mostPopularBeers} />
	</div> -->
</section>

<style>
	h2 {
		font-weight: bold;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 5rem;
		margin-bottom: 5rem;
	}
	.list {
		padding: 0px;
	}
	.list-item {
		list-style-type: none;
	}
</style>
