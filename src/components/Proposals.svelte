<script lang="ts">
    import { query, graphql, AllProposals } from '$houdini'

    // load the items
    const { data } = query<AllProposals>(graphql`
        query AllProposals {
			proposals(first: 100) {
				id
				# state
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
				# winner
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
</script>

{#each $data.items as item}
    <div>{item.title}</div>
{/each}