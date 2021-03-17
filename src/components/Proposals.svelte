<script lang="ts">
    import { operationStore, query } from '@urql/svelte'

	const proposals = operationStore(`
        query AllProposals {
			proposals(first: 100, orderBy: createdTimestamp, orderDirection: desc) {
				id
				state
				ipfsHash
				creator
				executor {
					id
					authorized
					propositionThreshold
					votingDuration
				}
				targets
				values
				signatures
				calldatas
				withDelegatecalls
				startBlock
				endBlock
				governanceStrategy
				currentYesVote
				currentNoVote
				winner
				votes {
					id
					voter
					support
					votingPower
					timestamp
				}
				createdTimestamp
				executionTime
				initiatorQueueing
				initiatorExecution
				lastUpdateTimestamp
				lastUpdateBlock
				title
				shortDescription
				govContract
				totalPropositionSupply
				totalVotingSupply
				createdBlockNumber
				totalCurrentVoters
				aipNumber
				author
				discussions
			}
		}
	`)
	query(proposals)


	import Proposal from './Proposal.svelte'
</script>

<style>
	.proposals {
		display: grid;
	}
</style>


{#if $proposals.fetching}
	Loading proposals...
{:else if $proposals.error}
	Error fetching proposals.
{:else if $proposals.data}
	<div class="proposals">
		{#each $proposals.data.proposals as proposal (proposal.id)}
			<Proposal {proposal} />
		{/each}
	</div>
{/if}