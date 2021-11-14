<script context="module" lang="ts">
	export const prerender = true;
	import data from '../beer-data.json';
</script>

<script lang="ts">
	let searchTerm = '';
	let searchResults = [];
</script>

<svelte:head>
	<title>Ölklubben utankrus</title>
</svelte:head>

<section>
	<h1>Sök på en öl, land eller bryggeri</h1>
	<input bind:value={searchTerm} placeholder="Sök på en öl" />
	<div>
		<ul>
			{#each searchResults as { name }, i}
				<li>
					<p>
						{i + 1}: {name}
					</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
</style>
