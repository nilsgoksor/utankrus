<script lang="ts">
	import type { BeerI } from '../models/Beer.interface';
	import moment from 'moment';
	import GroupIcon from 'svelte-material-icons/AccountMultiple.svelte';
	import CalendarIcon from 'svelte-material-icons/Calendar.svelte';

	export let beer: BeerI;

	function getDate(d: string) {
		const century = d.substring(0, 1) === '9' ? 19 : 20;
		const year = d.substring(0, 2);
		const month = d.substring(2, 4);

		if (d.length === 6) {
			const day = d.substring(4);
			const validDate = `${century}${year}/${month}/${day}`;
			return moment(validDate).format('MMM Do YY');
		} else {
			const validDate = `${century}${year}/${month}/01`;
			return moment(validDate).format('MMM YY');
		}
	}
</script>

<div class="beer-container">
	<div class="beer-info">
		<h3 class="beer-name">{beer.beer}</h3>
		<div>
			<p class="info-text">{`${beer.brewery} - ${beer.country}`}</p>
		</div>
	</div>
	<div class="rating-container">
		<div class="rating-info-container">
			<div class="rating-info">
				<p class="info-text">5</p>
				<GroupIcon width="25" height="25" />
			</div>
			<div class="rating-info">
				<p class="info-text">{getDate(beer.date)}</p>
				<CalendarIcon width="25" height="25" />
			</div>
		</div>
		<div class="rating-wrapper">
			<p class="rating">{beer.rating}</p>
		</div>
	</div>
</div>

<style>
	.beer-container {
		background-color: var(--primary-color);
		color: var(--accent-color);
		padding: 1rem;
		margin-bottom: 1rem;
		display: flex;
		justify-content: space-between;
		text-align: start;
	}
	.beer-info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.beer-name {
		margin: 0;
	}
	.rating-container {
		display: flex;
		align-items: center;
	}
	.rating-info-container {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.rating-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50px;
		width: 50px;
		border-radius: 50%;
		background-color: var(--accent-color);
		margin-left: 1rem;
	}
	.rating {
		color: var(--primary-color);
	}
	.rating-info {
		display: flex;
		align-items: center;
	}
	.info-text {
		margin: 0px;
	}
</style>
