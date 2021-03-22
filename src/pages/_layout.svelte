<!-- routify:options preload="proximity" -->

<script lang="ts">
	import { initClient } from '@urql/svelte'

	initClient({
		url: 'https://api.thegraph.com/subgraphs/name/aave/governance-v2'
	})
</script>

<style>
	main {
		display: grid;
		gap: 1rem;

		position: relative;
		max-width: 56em;
		padding: 2em;
		margin: 0 auto;

		mix-blend-mode: overlay;
	}

	header {
		display: grid;
		grid-template-columns: auto auto;
		justify-content: space-between;
		align-items: center;
	}

	h1 {
		font-size: 3.5em;
		text-transform: uppercase;

		color: rgba(255, 255, 255, 0.65);
		text-shadow: 0 1px 3px, 0 3px 20px;
	}
	@supports (-webkit-text-stroke: 1px) {
		h1 {
			color: rgba(255, 255, 255, 0.45);
			-webkit-text-stroke: 0.02em rgba(255, 255, 255, 0.65);
			text-shadow: 0 1px 3px, 0 3px 20px;
		}
	}

	.links {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(14em, 1fr));

		display: flex;
		flex-wrap: wrap;
	}
	.links > * {
		flex: 15em 1;
		gap: 0.4em;
	}
</style>

<main>
	<header>
		<h1>Aavote</h1>
		<div>
			<p>dashboard for Aave Governance v2</p>
		</div>
	</header>

	<section class="links">
		<div class="card">
			<h3>Learn More</h3>
			<ul>
				<li><a href="https://docs.aave.com/aavenomics/governance" target="_blank">Governance Overview</a></li>
				<li><a href="https://docs.aave.com/developers/protocol-governance/governance/" target="_blank">Technical Details</a></li>
				<li><a href="https://docs.aave.com/governance" target="_blank">Creating Proposals</a></li>
				<li><a href="https://docs.aave.com/faq/governance" target="_blank">Voting FAQ</a></li>
			</ul>
		</div>
		<div class="card">
			<h3>v2 Implementation</h3>
			<ul>
				<li><a href="https://github.com/aave/governance-v2" target="_blank">Governance Contracts</a></li>
				<li><a href="https://github.com/aave/governance-v2-subgraph" target="_blank">Subgraph</a>/<a href="https://thegraph.com/explorer/subgraph/aave/governance-v2" target="_blank">Explorer</a></li>
				<li><a href="https://github.com/aave/aave-token" target="_blank">AAVE Token</a></li>
				<li><a href="https://github.com/aave/governance-v2/blob/master/audits/PeckShield-Audit-AaveGovernance2-final.pdf" target="_blank">PeckShield Audit</a></li>
			</ul>
		</div>
		<div class="card">
			<h3>Participate</h3>
			<ol>
				<li><a href="https://governance.aave.com" target="_blank">Write & discuss <abbr title="Aave Requests for Comments">ARCs</abbr></a> <a href="https://docs.aave.com/governance/arcs" target="_blank">[?]</a></li>
				<li><a href="https://github.com/aave/aip" target="_blank">Submit <abbr title="Aave Improvement Proposal">AIP</abbr> to GitHub</a> <a href="https://docs.aave.com/governance/aips#1-writing-an-aip" target="_blank">[?]</a></li>
				<li><a href="https://github.com/aave/aip-uploader" target="_blank">Upload <abbr title="Aave Improvement Proposal">AIP</abbr> on-chain</a> <a href="https://docs.aave.com/governance/aips#2-preparing-the-aip-for-on-chain-governance" target="_blank">[?]</a></li>
				<li><a href="https://app.aave.com/governance" target="_blank">Vote with AAVE tokens</a> <a href="https://docs.aave.com/faq/governance" target="_blank">[?]</a></li>
			</ol>
		</div>
	</section>

	<slot></slot>
</main>

<svg viewBox="0 0 34.374 50" style="position: fixed">
	<defs>
		<clipPath id="ghost-outline-mask" clipPathUnits="objectBoundingBox">
			<path d="M34.249 16.743a17.126 17.126 0 0 0-34.244 0v31.353a1.903 1.903 0 1 0 3.807 0v-5.533a1.903 1.903 0 0 1 3.807 0v2.619a1.903 1.903 0 1 0 3.807 0v-2.623a1.9 1.9 0 0 1 1.9-1.9 1.9 1.9 0 0 1 1.9 1.9v.717a1.903 1.903 0 0 0 3.807 0v-.717a1.903 1.903 0 0 1 3.807 0v2.623a1.903 1.903 0 0 0 3.807 0v-2.623a1.9 1.9 0 0 1 1.9-1.9 1.9 1.9 0 0 1 1.9 1.9v5.533a1.903 1.903 0 0 0 3.807 0V16.874a1.355 1.355 0 0 0-.005-.131z"/>
		</clipPath>
	</defs>
</svg>