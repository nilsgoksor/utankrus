<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import type { BeerI } from 'src/models/Beer.interface';
	import { onMount } from 'svelte';
	import db from '../firebase/db';
	import Barplot from '../components/barplot.svelte';

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
			.splice(0, 10)
			.sort((a, b) => a.rating - b.rating);
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
	{#if mostPopularBeers.length > 0}
		<div>
			<p>Kommer snart!</p>
			<!-- <Barplot
				points={mostPopularBeers.map((beer) => {
					return { x: beer.rating, y: beer.rating, label: beer.beer };
				})}
				heading="Most popular beers"
			/> -->
			<!-- <Barplot
				points={leastPopularBeers.map((beer) => {
					return { x: beer.rating, y: beer.rating, label: beer.beer };
				})}
				heading="Least popular beers"
			/> -->
		</div>
	{/if}
</section>

<style>
</style>
