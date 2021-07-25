<script lang="ts">
	import type { AllProposals } from '$houdini'
	import { query, graphql } from '$houdini'

	const { loading, data, error } = query<AllProposals>(graphql`
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
					voteDifferential
					minimumQuorum
					gracePeriod
					executionDelay
					admin
					authorizationBlock
					authorizationTimestamp
					pendingAdmin
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

	$: console.log($data)


	import ProposalComponent from './Proposal.svelte'
</script>


<style>
	.proposals {
		display: grid;
	}
</style>


{#if $loading}
	Loading proposals...
{:else if $error}
	Error fetching proposals.
	{$error}
{:else if $data}
	<div class="proposals">
		{#each $data.proposals as proposal (proposal.id)}
			<ProposalComponent {proposal} />
		{/each}
	</div>
{/if}