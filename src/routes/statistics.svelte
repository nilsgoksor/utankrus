<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import type { BeerI } from 'src/models/Beer.interface';
	import Beer from '../components/beer.svelte';

	import { onMount } from 'svelte';
	import db from '../firebase/db';

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
	<h3>Top 10: högst betyg</h3>
	<ul class="list">
		{#each mostPopularBeers as beer}
			<li class="list-item">
				<Beer {beer} />
			</li>
		{/each}
	</ul>
	<h3>Top 10: lägst betyg</h3>
	<ul class="list">
		{#each leastPopularBeers as beer}
			<li class="list-item">
				<Beer {beer} />
			</li>
		{/each}
	</ul>
</section>

<style>
	.list {
		padding: 0px;
	}
	.list-item {
		list-style-type: none;
	}
</style>
