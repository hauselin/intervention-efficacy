<script>
	// https://www.wsj.com/finance/stocks/how-much-is-tesla-worth-you-decide-78b25ab1?st=6uez1gk9njy6rlg&reflink=desktopwebshare_permalink
	// https://simeydotme.github.io/svelte-range-slider-pips/en/styling/
	import RangeSlider from "svelte-range-slider-pips";
	import "@fontsource/fira-sans";
	import Bar from "./Bar.svelte";
	import { onMount } from "svelte";
	import { scale } from "svelte/transition";
	import Katex from "svelte-katex";

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
	let percTacticTrue = [50];
	let postsTacticTrue = (postsTrue * percTacticTrue[0]) / 100;
	let postsTacticFalse = (postsFalse * percTacticFalse[0]) / 100;

	// reduction
	let postsTacticReduceFalse = percReduceFalse[0] * postsTacticFalse;
	let postsTacticReduceTrue = percReduceTrue[0] * postsTacticTrue;

	let ratio = postsTacticReduceTrue / postsTacticReduceFalse;

	// posterior
	let p_false_tactic =
		((percTacticFalse[0] / 100) * (percFalse[0] / 100)) /
		((postsTacticTrue + postsTacticFalse) / postsTotal);
	let p_true_tactic =
		((percTacticTrue[0] / 100) * (percTrue[0] / 100)) /
		((postsTacticTrue + postsTacticFalse) / postsTotal);

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

		if (postsTacticReduceTrue > postsTacticReduceFalse) {
			ratio = postsTacticReduceTrue / postsTacticReduceFalse;
		} else {
			ratio = postsTacticReduceFalse / postsTacticReduceTrue;
		}
		if (!isFinite(ratio)) {
			ratio = "infinitely";
		} else {
			ratio = ratio.toFixed(2) + "x";
		}

		// posterior
		p_false_tactic =
			((percTacticFalse[0] / 100) * (percFalse[0] / 100)) /
			((postsTacticTrue + postsTacticFalse) / postsTotal);
		p_true_tactic =
			((percTacticTrue[0] / 100) * (percTrue[0] / 100)) /
			((postsTacticTrue + postsTacticFalse) / postsTotal);
	}

	const handlePresetClick = (preset) => {
		currentPreset = preset;
		if (preset == "SMALL EFFECT") {
			percReduceTrue = effectSmall;
		} else if (preset == "MEDIUM EFFECT") {
			percReduceTrue = effectMedium;
		} else if (preset == "LARGE EFFECT") {
			percReduceTrue = effectLarge;
		}
		percReduceFalse = percReduceTrue;
		percTrue = [80];
		percFalse = [100 - percTrue[0]];
		postsTrue = (postsTotal * percTrue[0]) / 100;
		postsFalse = (postsTotal * percFalse[0]) / 100;

		percTacticFalse = [80];
		percTacticTrue = [50];
		postsTacticTrue = (postsTrue * percTacticTrue[0]) / 100;
		postsTacticFalse = (postsFalse * percTacticFalse[0]) / 100;

		postsTacticReduceFalse = percReduceFalse[0] * postsTacticFalse;
		postsTacticReduceTrue = percReduceTrue[0] * postsTacticTrue;

		ratio = postsTacticReduceTrue / postsTacticReduceFalse;
	};

	let midpointX;
	let element;
	$: if (element) {
		const rect = element.getBoundingClientRect();
		midpointX = rect.width / 2;
		// midpointX = rect.right;
		// console.log(midpointX);
	}

	onMount(() => {
		const handleResize = () => {
			if (element) {
				const rect = element.getBoundingClientRect();
				midpointX = rect.left + rect.width / 2;
			}
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	});
</script>

<main bind:this={element}>
	<h2>Evaluate the Efficacy of Misinformation Interventions</h2>

	<p>
		Use the sliders and presets to see how effective an intervention is in
		reducing belief in false information, and whether the intervention can
		backfire by also reducing belief in true content more so than belief in
		false content.
	</p>

	<p>
		Imagine an intervention that helps users identify tactics such as
		whether a post contains emotional language and teaches the user to
		distrust posts containing this tactic. Given the variables below,

		{#if postsTacticReduceTrue > postsTacticReduceFalse}
			this intervention <span class="highlight-dark">backfires</span>.
		{:else if postsTacticReduceFalse >= postsTacticReduceTrue}
			this intervention <span class="highlight-light"
				>does not backfire</span
			>.
			<!-- {:else}
			this intervention <span class="highlight"
				>reduces belief in false and true content to the same extent</span
			>. -->
		{/if}
		The numbers below assume {postsTotal} posts in total.
	</p>

	{#if midpointX}
		<Bar {postsTacticReduceFalse} {postsTacticReduceTrue} {midpointX}></Bar>

		<p>
			{#if postsTacticReduceTrue / postsTacticReduceFalse >= 1}
				The user disbelieves <span class="grey-background text-larger">
					{ratio}
				</span>
				more <span class="true-background">true</span> than
				<span class="false-background">false</span> posts.
			{:else}
				The user disbelieves <span class="grey-background text-larger">
					{ratio}
				</span>
				more <span class="false-background">false</span> than
				<span class="true-background">true</span> posts.
			{/if}
		</p>

		<!-- <div class="equations">
			<p>
				<Katex
					>p(false|tactic) = \frac{"{p(tactic|false) \\ p(false)}"}{"{p(tactic)}"}
					= ({(percTacticFalse / 100).toFixed(2)} \times {(
						percFalse / 100
					).toFixed(2)})/ {(
						(postsTacticTrue + postsTacticFalse) /
						postsTotal
					).toFixed(2)} = {p_false_tactic.toFixed(3)}
				</Katex>
			</p>
			<p>
				<Katex
					>p(true|tactic) \;\: = \frac{"{p(tactic|true) \\ p(true)}"}{"{p(tactic)}"}
					\;\:\: = ({(percTacticTrue / 100).toFixed(2)} \times{(
						percTrue / 100
					).toFixed(2)})/ {(
						(postsTacticTrue + postsTacticFalse) /
						postsTotal
					).toFixed(2)} = {p_true_tactic.toFixed(3)}
				</Katex>
			</p>
		</div> -->

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
						<th class="cell-left"
							>What is the treatment effect, or the percent
							improvement in identifying the tactic due to the
							intervention?</th
						>
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
								{Number(percFalse).toFixed(1)}% ({postsFalse} of
								{postsTotal})
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
							> uses the tactic?
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
							> uses the tactic?
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
	{/if}
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

	.highlight-dark {
		background-color: rgba(74, 64, 212, 0.5);
	}

	.highlight-light {
		background-color: rgba(74, 64, 212, 0.2);
	}

	.preset-highlight {
		background-color: rgba(74, 64, 212, 0.1);
	}

	table,
	th,
	tr {
		border: 1px solid #f0f0f0;
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
	.grey-background {
		background-color: #c4cbca;
	}

	.text-larger {
		font-size: 1.5em;
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
		color: rgba(74, 64, 212, 1);
	}

	.equations {
		font-size: 0.8em;
	}
</style>
