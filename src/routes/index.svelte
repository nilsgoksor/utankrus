<script lang="ts">
	import { onMount } from 'svelte';
	import algoliasearch from 'algoliasearch';
	import { variables } from '../lib/variables';
	import type { BeerI } from 'src/models/Beer.interface';
	import Beer from '../components/beer.svelte';
	import Textfield from '@smui/textfield';
	import { Icon } from '@smui/icon-button';

	let searchClient;
	let index;

	let query = '';

	let hits: BeerI[] = [];

	onMount(async () => {
		searchClient = algoliasearch(variables.algoliaAppId, variables.algoliaSearchOnlyKey);
		index = searchClient.initIndex('ratings');
		index.search(query).then(console.log);
	});

	async function search() {
		let searchTerm = query;
		if (query.length > 0) {
			if (query.length > 4 && new RegExp(/^\d+$/).test(query)) {
				searchTerm = (new Date(query).getTime() / 1000).toString();
			}
			const result = await index.search(searchTerm);
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
	<h1>Sök</h1>
	<p class="subtitle">På öl, bryggeri eller datum (YYMMDD)</p>
	<Textfield bind:value={query} on:input={search} label="Berliner GOX 181112">
		<Icon class="material-icons" slot="trailingIcon">search</Icon>
	</Textfield>
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
