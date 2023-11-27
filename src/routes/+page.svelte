<script>
	// https://www.wsj.com/finance/stocks/how-much-is-tesla-worth-you-decide-78b25ab1?st=6uez1gk9njy6rlg&reflink=desktopwebshare_permalink
	// https://simeydotme.github.io/svelte-range-slider-pips/en/styling/
	import RangeSlider from "svelte-range-slider-pips";
	import "@fontsource/fira-sans";

	let presets = ["SMALL EFFECT", "MEDIUM EFFECT", "LARGE EFFECT"];
	let currentPreset = "MEDIUM EFFECT";

	let postsTotal = 1000;

	// effect size
	let percReduceTrue = [10];
	let percReduceFalse = percReduceTrue;
	let effectSmall = [5];
	let effectMedium = [10];
	let effectLarge = [30];

	// perc true/false
	let percTrue = [80];
	let percFalse = [100 - percTrue[0]];
	let postsTrue = (postsTotal * percTrue[0]) / 100;
	let postsFalse = (postsTotal * percFalse[0]) / 100;

	// perc containing tactic
	let percTacticFalse = [80];
	let percTacticTrue = [40];
	let postsTacticTrue = (postsTrue * percTacticTrue[0]) / 100;
	let postsTacticFalse = (postsFalse * percTacticFalse[0]) / 100;

	// reduction
	let postsTacticReduceFalse = percReduceFalse[0] * postsTacticFalse;
	let postsTacticReduceTrue = percReduceTrue[0] * postsTacticTrue;

	$: {
		percReduceFalse = percReduceTrue;
		percTrue = [100 - percFalse[0]];

		if (percReduceFalse[0] < effectMedium[0]) {
			currentPreset = "SMALL EFFECT";
		} else if (percReduceFalse[0] < effectLarge[0]) {
			currentPreset = "MEDIUM EFFECT";
		} else {
			currentPreset = "LARGE EFFECT";
		}

		postsTrue = parseInt((postsTotal * percTrue[0]) / 100);
		postsFalse = parseInt((postsTotal * percFalse[0]) / 100);

		postsTacticTrue = parseInt((postsTrue * percTacticTrue[0]) / 100);
		postsTacticFalse = parseInt((postsFalse * percTacticFalse[0]) / 100);

		postsTacticReduceFalse = parseInt(
			(percReduceFalse[0] / 100) * postsTacticFalse,
		);
		postsTacticReduceTrue = parseInt(
			(percReduceTrue[0] / 100) * postsTacticTrue,
		);
	}

	const handlePresetClick = (preset) => {
		currentPreset = preset;
		if (preset == "SMALL EFFECT") {
			percReduceTrue = effectSmall;
			percReduceFalse = percReduceTrue;
		} else if (preset == "MEDIUM EFFECT") {
			percReduceTrue = effectMedium;
			percReduceFalse = percReduceTrue;
		} else if (preset == "LARGE EFFECT") {
			percReduceTrue = effectLarge;
			percReduceFalse = percReduceTrue;
		}
	};
</script>

<main>
	<h2>Evaluate the Efficacy of Misinformation Interventions</h2>

	<p>
		Use the sliders and the presets to see how effective an intervention is
		in reducing belief in false information, and whether it can also
		backfire by reducing belief in true information more so than in false
		information.
	</p>

	<div>
		<p>
			Imagine an intervention that helps users identify whether a post
			contains emotional language and teaches the user to distrust posts
			containing emotional language. Giving the variables below,

			{#if postsTacticReduceTrue > postsTacticReduceFalse}
				this intervention <span class="highlight">backfires</span>.
			{:else if postsTacticReduceFalse > postsTacticReduceTrue}
				this intervention <span class="highlight">works</span>.
			{:else}
				this intervention <span class="highlight"
					>reduces belief in false and true content to the same extent</span
				>.
			{/if}
			For every
			<span class="grey-background">{postsTotal} posts</span>, the user
			<span class="false-background"
				>believes
				{postsTacticReduceFalse} fewer false posts</span
			>
			and also
			<span class="true-background"
				>believes
				{postsTacticReduceTrue} fewer true posts</span
			>.
		</p>
		<p>ADD BARS HERE TO VISUALIZE DIFFERENCES!</p>
	</div>

	<div class="preset-container">
		<table id="t-presets">
			<tbody>
				<tr>
					{#each presets as preset}
						{#if preset == currentPreset}
							<th
								class="preset-cell preset-highlight"
								on:click={() => handlePresetClick(preset)}
								>{preset}</th
							>
						{:else}
							<th
								class="preset-cell"
								on:click={() => handlePresetClick(preset)}
								>{preset}</th
							>
						{/if}
					{/each}
				</tr>
			</tbody>
		</table>
	</div>

	<div class="slide-wrap">
		<table id="t-variables">
			<tbody>
				<tr id="percReduce">
					<th class="cell-left">
						What percentage of content with emotional language can
						the user accurately identify as such?
					</th>
					<th class="cell-right">
						<div class="text-right">
							{Number(percReduceTrue).toFixed(1)}%
						</div>
						<div>
							<RangeSlider
								bind:values={percReduceTrue}
								min={0}
								max={50}
								step={0.1}
								float
							/>
						</div>
					</th>
				</tr>

				<tr id="percFalse">
					<th class="cell-left">
						How much <span class="text-emphasis-false"
							>false content</span
						> does the user see?
					</th>
					<th class="cell-right">
						<div class="text-right">
							{Number(percFalse).toFixed(1)}% ({postsFalse} of {postsTotal})
						</div>
						<div>
							<RangeSlider
								bind:values={percFalse}
								min={0}
								max={100}
								step={0.1}
								float
							/>
						</div>
					</th>
				</tr>

				<tr id="percTacticFalse">
					<th class="cell-left">
						How much <span class="text-emphasis-false"
							>false content</span
						> contains emotional language?
					</th>
					<th class="cell-right">
						<div class="text-right">
							{Number(percTacticFalse).toFixed(1)}% ({postsTacticFalse}
							of
							{postsFalse})
						</div>
						<div>
							<RangeSlider
								bind:values={percTacticFalse}
								min={0}
								max={100}
								step={0.1}
								float
							/>
						</div>
					</th>
				</tr>

				<tr id="percTacticTrue">
					<th class="cell-left">
						How much <span class="text-emphasis-true"
							>true content</span
						> contains emotional language?
					</th>
					<th class="cell-right">
						<div class="text-right">
							{Number(percTacticTrue).toFixed(1)}% ({postsTacticTrue}
							of
							{postsTrue})
						</div>
						<div>
							<RangeSlider
								bind:values={percTacticTrue}
								min={0}
								max={100}
								step={0.1}
								float
							/>
						</div>
					</th>
				</tr>
			</tbody>
		</table>
	</div>
</main>

<style>
	main {
		margin: 2em 3em;
	}

	@media (min-width: 1200px) {
		main {
			margin: 2em 13em;
		}
	}

	@media (min-width: 1600px) {
		main {
			margin: 2em 21em;
		}
	}

	@media (max-width: 800px) {
		main {
			margin: 2em 1em 2em 1em;
		}
	}

	.highlight {
		background-color: rgba(74, 64, 212, 0.5);
	}

	.preset-highlight {
		background-color: rgba(74, 64, 212, 0.3);
	}

	table,
	th,
	tr {
		border: 1px solid #e0e0e0;
		font-weight: normal;
		border-spacing: 0px;
	}

	.cell-right {
		text-align: left;
		padding-left: 1em;
		padding-right: 1em;
	}

	.cell-left {
		width: 100vw;
		text-align: left;
		margin: 1em;
		padding: 1em;
	}

	.cell-right {
		width: 100vw;
	}

	.text-emphasis {
		font-size: 1.1em;
	}

	.grey-background {
		background-color: #c4cbca;
	}

	.false-background {
		background-color: rgba(
			219,
			80,
			74,
			0.5
		); /* #db504a with 50% transparency */
	}

	.true-background {
		background-color: rgba(
			86,
			163,
			166,
			0.5
		); /* #56a3a6 with 50% transparency */
	}

	.text-emphasis-false {
		color: #db504a;
	}

	.text-emphasis-true {
		color: #56a3a6;
	}

	.text-right {
		margin: 1em;
	}

	.preset-container {
		margin-bottom: 1em;
	}

	.preset-cell {
		width: 100vw;
		text-align: center;
		padding: 0.5em;
	}

	.preset-cell:hover {
		cursor: pointer;
	}
</style>
