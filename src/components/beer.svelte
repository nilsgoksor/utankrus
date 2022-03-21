<script lang="ts">
	import type { BeerI } from '../models/Beer.interface';
	import moment from 'moment';
	import Card, { Content } from '@smui/card';
	import { Icon } from '@smui/icon-button';

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

<div class="beer-card-wrapper">
	<Card>
		<Content>
			<div class="beer-content">
				<div class="beer-info">
					<h2>{beer.beer}</h2>
					<h3>{beer.brewery}</h3>
				</div>
				<div class="beer-numbers">
					<div class="beer-number">
						{beer.rating}
						<Icon class="material-icons">star</Icon>
					</div>
					<div class="beer-number">
						{beer.alcohol}
						<Icon class="material-icons">percent</Icon>
					</div>
					<div class="beer-number">
						{beer.nbrOfParticipants}
						<Icon class="material-icons">people</Icon>
					</div>
					<div class="beer-number">
						{moment(beer.date_timestamp).format('MMM Do YY')}
						<Icon class="material-icons">event</Icon>
					</div>
				</div>
			</div>
		</Content>
	</Card>
</div>

<style>
	.beer-card-wrapper {
		margin-bottom: 1rem;
	}
	.beer-content {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	.beer-info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-align: left;
	}

	.beer-numbers {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.beer-number {
		display: flex;
		align-items: center;
		text-align: right;
	}
</style>
