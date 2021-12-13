<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import algoliasearch from 'algoliasearch';
	import { variables } from '../lib/variables';
	import type { BeerI } from 'src/models/Beer.interface';
	import Beer from '../components/beer.svelte';

	let searchClient;
	let index;

	let query = '';

	let hits: BeerI[] = [];

	onMount(async () => {
		searchClient = algoliasearch(variables.algoliaAppId, variables.algoliaSearchOnlyKey);
		index = searchClient.initIndex('ratings');
		index.search({ query }).then(console.log);
	});

	async function search() {
		if (query.length > 0) {
			const result = await index.search(query);
			hits = result.hits;
		} else {
			query = '';
			hits = [];
		}
	}
</script>

<svelte:head>
	<title>Ölklubben utankrus</title>
</svelte:head>

<section>
	<h1>Sök på öl eller bryggeri</h1>
	<p class="subtitle">Eller på datum (YYMMDD) för att hitta specifika provningar</p>
	<input bind:value={query} on:input={search} placeholder="Berliner GOX 181112" />
	<ul class="list">
		{#each hits as hit}
			<li class="list-item">
				<Beer beer={hit} />
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
	.subtitle {
		opacity: 0.75;
	}
</style>
