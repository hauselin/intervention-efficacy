<script>
	import { scaleLinear } from "d3-scale";
	import { max } from "d3-array";

	export let postsTacticReduceFalse;
	export let postsTacticReduceTrue;
	export let midpointX;

	$: postsTacticDiscern = postsTacticReduceTrue - postsTacticReduceFalse;

	let height = 110;
	let barHeight = 34;
</script>

<div class="chart-container">
	<svg width="100%" {height}>
		<rect
			x={midpointX - postsTacticReduceFalse}
			y={0}
			width={postsTacticReduceFalse}
			height={barHeight}
			fill="#db504a"
		/>
		<text
			x={midpointX + 5}
			y={barHeight / 2}
			text-anchor="right"
			alignment-baseline="middle"
			font-size="0.8em"
			fill="black"
			width={postsTacticReduceFalse}
			>Believes {postsTacticReduceFalse} fewer false posts</text
		>

		<rect
			x={midpointX - postsTacticReduceTrue}
			y={barHeight * 1 * 1.1}
			width={postsTacticReduceTrue}
			height={barHeight}
			fill="#56a3a6"
		/>
		<text
			x={midpointX + 5}
			y={barHeight + (barHeight * 1 * 1.2) / 2}
			text-anchor="right"
			alignment-baseline="middle"
			font-size="0.8em"
			fill="black"
			width={postsTacticReduceTrue}
			>Believes {postsTacticReduceTrue} fewer true posts</text
		>

		{#if postsTacticDiscern > 0}
			<rect
				x={midpointX - postsTacticDiscern}
				y={barHeight * 2 * 1.1}
				width={postsTacticDiscern}
				height={barHeight}
				fill="#4a40d4"
			/>
			<text
				x={midpointX + 5}
				y={2 * barHeight + (barHeight * 1 * 1.4) / 2}
				text-anchor="right"
				alignment-baseline="middle"
				font-size="0.8em"
				fill="black"
				width={postsTacticDiscern}
				>Backfire: Disbelieves {postsTacticDiscern} more true posts
			</text>
		{:else}
			<rect
				x={midpointX}
				y={barHeight * 2 * 1.1}
				width={-postsTacticDiscern}
				height={barHeight}
				fill="rgba(74, 64, 212, 0.2)"
			/>
			<text
				x={midpointX + 5}
				y={2 * barHeight + (barHeight * 1 * 1.4) / 2}
				text-anchor="right"
				alignment-baseline="middle"
				font-size="0.8em"
				fill="black"
				width={postsTacticDiscern}
				>No backfire: Disbelieves {-postsTacticDiscern} more false posts
			</text>
		{/if}
	</svg>
</div>

<style>
</style>
