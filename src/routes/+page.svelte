<script>
	// https://www.wsj.com/finance/stocks/how-much-is-tesla-worth-you-decide-78b25ab1?st=6uez1gk9njy6rlg&reflink=desktopwebshare_permalink
	// https://simeydotme.github.io/svelte-range-slider-pips/en/styling/
	import RangeSlider from "svelte-range-slider-pips";
	import "@fontsource/fira-sans";

	let presets = ["OPTIMISIC", "REALISTIC", "PESSIMISTIC"];

	let postsTotal = 10000;

	let propTrue = [0.85];
	let propFalse = [1 - propTrue[0]];
	let postsTrue = postsTotal * propTrue[0];
	let postsFalse = postsTotal * propFalse[0];

	// expose to true/false content
	let propExposeTrue = [0.7];
	let propExposeFalse = [0.3];
	let postsExposeTrue = postsTrue * propExposeTrue[0];
	let postsExposeFalse = postsFalse * propExposeFalse[0];

	// believe in true/false content
	let propExposeBelieveTrue = [0.9];
	let propExposeBelieveFalse = [0.6];
	let postsExposeBelieveTrue = postsExposeTrue * propExposeBelieveTrue[0];
	let postsExposeBelieveFalse = postsExposeFalse * propExposeBelieveFalse[0];

	// proportion emotional content
	let propExposeBelieveEmotionalTrue = [0.5];
	let propExposeBelieveEmotionalFalse = [0.9];
	let postsExposeBelieveEmotionalTrue =
		postsExposeBelieveTrue * propExposeBelieveEmotionalTrue[0];
	let postsExposeBelieveEmotionalFalse =
		postsExposeBelieveFalse * propExposeBelieveEmotionalFalse[0];

	// proportion reduction in belief
	let propExposeBelieveEmotionalReduceTrue = [0.5];
	let propExposeBelieveEmotionalReduceFalse = [0.9];
	let postsExposeBelieveEmotionalReduceTrue =
		postsExposeBelieveEmotionalTrue *
		propExposeBelieveEmotionalReduceTrue[0];
	let postsExposeBelieveEmotionalReduceFalse =
		postsExposeBelieveEmotionalFalse *
		propExposeBelieveEmotionalReduceFalse[0];

	$: {
		propFalse = [1 - propTrue[0]];
		postsTrue = parseInt(postsTotal * propTrue[0]);
		postsFalse = parseInt(postsTotal * propFalse[0]);

		postsExposeTrue = (postsTrue * propExposeTrue[0]) | 0;
		postsExposeFalse = (postsFalse * propExposeFalse[0]) | 0;

		postsExposeBelieveTrue =
			(postsExposeTrue * propExposeBelieveTrue[0]) | 0;
		postsExposeBelieveFalse =
			(postsExposeFalse * propExposeBelieveFalse[0]) | 0;

		postsExposeBelieveEmotionalTrue =
			(postsExposeBelieveTrue * propExposeBelieveEmotionalTrue[0]) | 0;
		postsExposeBelieveEmotionalFalse =
			(postsExposeBelieveFalse * propExposeBelieveEmotionalFalse[0]) | 0;

		postsExposeBelieveEmotionalReduceTrue =
			(postsExposeBelieveEmotionalTrue *
				propExposeBelieveEmotionalReduceTrue[0]) |
			0;
		postsExposeBelieveEmotionalReduceFalse =
			(postsExposeBelieveEmotionalFalse *
				propExposeBelieveEmotionalReduceFalse[0]) |
			0;
	}
</script>

<h1>Evaluate the Efficacy of Misinformation Interventions</h1>
<p>Use the sliders and the presets.</p>

<div class="slide-wrap">
	<table id="t-variables">
		<tbody>
			<tr id="propTrue">
				<th class="cell-left">
					<span
						>In the universe of all content, what <span
							class="text-emphasis">percent</span
						>
						are true?</span
					>
				</th>
				<th class="cell-right">
					<div class="text-right">
						{parseInt(propTrue * 100)}% ({postsTrue} of {postsTotal})
					</div>
					<div>
						<RangeSlider
							bind:values={propTrue}
							min={0}
							max={1}
							step={0.0001}
							float
						/>
					</div>
				</th>
			</tr>

			<tr id="propExposeTrue">
				<th class="cell-left">
					<span
						>Of all <span class="text-emphasis-true">true</span>
						content, what
						<span class="text-emphasis"
							>percent do people see?
						</span>
					</span>
				</th>
				<th class="cell-right">
					<div class="text-right">
						{parseInt(propExposeTrue * 100)}% ({postsExposeTrue}
						of
						{postsTrue})
					</div>
					<div>
						<RangeSlider
							bind:values={propExposeTrue}
							min={0}
							max={1}
							step={0.0001}
							float
						/>
					</div>
				</th>
			</tr>

			<tr id="propExposeBelieveTrue">
				<th class="cell-left">
					<span
						>Of the <span class="text-emphasis-true">true</span>
						content people see, what
						<span class="text-emphasis"
							>percent do they believe?
						</span>
					</span>
				</th>
				<th class="cell-right">
					<div class="text-right">
						{parseInt(propExposeBelieveTrue * 100)}% ({postsExposeBelieveTrue}
						of
						{postsExposeTrue})
					</div>
					<div>
						<RangeSlider
							bind:values={propExposeBelieveTrue}
							min={0}
							max={1}
							step={0.0001}
							float
						/>
					</div>
				</th>
			</tr>

			<tr id="propExposeBelieveEmotionalTrue">
				<th class="cell-left">
					<span
						>Of the <span class="text-emphasis-true">true</span>
						content people see and believe, what
						<span class="text-emphasis"
							>percent contains emotional language?
						</span>
					</span>
				</th>
				<th class="cell-right">
					<div class="text-right">
						{parseInt(propExposeBelieveEmotionalTrue * 100)}% ({postsExposeBelieveEmotionalTrue}
						of
						{postsExposeBelieveTrue})
					</div>
					<div>
						<RangeSlider
							bind:values={propExposeBelieveEmotionalTrue}
							min={0}
							max={1}
							step={0.0001}
							float
						/>
					</div>
				</th>
			</tr>

			<tr id="propExposeBelieveEmotionalReduceTrue">
				<th class="cell-left">
					<span
						>Of the <span class="text-emphasis-true">true</span>
						content people see and believe and contains emotional language,
						how
						<span class="text-emphasis"
							>effective is the intervention in reducing belief</span
						>?
					</span>
				</th>
				<th class="cell-right">
					<div class="text-right">
						{parseInt(propExposeBelieveEmotionalReduceTrue * 100)}%
						reduction ({postsExposeBelieveEmotionalReduceTrue}
						of
						{postsExposeBelieveEmotionalTrue})
					</div>
					<div>
						<RangeSlider
							bind:values={propExposeBelieveEmotionalReduceTrue}
							min={0}
							max={1}
							step={0.0001}
							float
						/>
					</div>
				</th>
			</tr>

			<!-- false rows -->

			<tr id="propExposeFalse">
				<th class="cell-left">
					<span
						>Of all <span class="text-emphasis-false">false</span>
						content, what
						<span class="text-emphasis"
							>percent do people see?
						</span>
					</span>
				</th>
				<th class="cell-right">
					<div class="text-right">
						{parseInt(propExposeFalse * 100)}% ({postsExposeFalse}
						of
						{postsFalse})
					</div>
					<div>
						<RangeSlider
							bind:values={propExposeFalse}
							min={0}
							max={1}
							step={0.0001}
							float
						/>
					</div>
				</th>
			</tr>

			<tr id="propExposeBelieveFalse">
				<th class="cell-left">
					<span
						>Of the <span class="text-emphasis-false">false</span>
						content people see, what
						<span class="text-emphasis"
							>percent do they believe?
						</span>
					</span>
				</th>
				<th class="cell-right">
					<div class="text-right">
						{parseInt(propExposeBelieveFalse * 100)}% ({postsExposeBelieveFalse}
						of
						{postsExposeBelieveFalse})
					</div>
					<div>
						<RangeSlider
							bind:values={propExposeBelieveFalse}
							min={0}
							max={1}
							step={0.0001}
							float
						/>
					</div>
				</th>
			</tr>

			<tr id="propExposeBelieveEmotionalFalse">
				<th class="cell-left">
					<span
						>Of the <span class="text-emphasis-false">false</span>
						content people see and believe, what
						<span class="text-emphasis"
							>percent contains emotional language?
						</span>
					</span>
				</th>
				<th class="cell-right">
					<div class="text-right">
						{parseInt(propExposeBelieveEmotionalFalse * 100)}% ({postsExposeBelieveEmotionalFalse}
						of
						{postsExposeBelieveEmotionalFalse})
					</div>
					<div>
						<RangeSlider
							bind:values={propExposeBelieveEmotionalFalse}
							min={0}
							max={1}
							step={0.0001}
							float
						/>
					</div>
				</th>
			</tr>

			<tr id="propExposeBelieveEmotionalReduceFalse">
				<th class="cell-left">
					<span
						>Of the <span class="text-emphasis-false">false</span>
						content people see and believe and contains emotional language,
						how
						<span class="text-emphasis"
							>effective is the intervention in reducing belief</span
						>?
					</span>
				</th>
				<th class="cell-right">
					<div class="text-right">
						{parseInt(propExposeBelieveEmotionalReduceFalse * 100)}%
						reduction ({postsExposeBelieveEmotionalReduceFalse}
						of
						{postsExposeBelieveEmotionalReduceFalse})
					</div>
					<div>
						<RangeSlider
							bind:values={propExposeBelieveEmotionalReduceFalse}
							min={0}
							max={1}
							step={0.0001}
							float
						/>
					</div>
				</th>
			</tr>
		</tbody>
	</table>
</div>

<style>
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
		font-weight: 700;
	}

	.text-emphasis-false {
		font-weight: 700;
		color: #db504a;
	}

	.text-emphasis-true {
		font-weight: 700;
		color: #56a3a6;
	}

	.text-right {
		margin: 1em;
	}
</style>
