enum ProposalState {
    Pending = "Pending",
    Active = "Active",
    Succeeded = "Succeeded",
    Failed = "Failed",
    Canceled = "Canceled",
    Queued = "Queued",
    Executed = "Executed"
}

enum Winner {
    Yes = "Yes",
    No = "No",
    Abstain = "Abstain",
    Na = "Na"
}

export type AllProposals = {
    readonly "input": null,
    readonly "result": AllProposals$result
};

export type AllProposals$result = {
    readonly proposals: ({
        readonly id: string,
        readonly state: ProposalState,
        readonly ipfsHash: string,
        readonly creator: string,
        readonly executor: {
            readonly id: string,
            readonly authorized: boolean,
            readonly propositionThreshold: string,
            readonly votingDuration: string,
            readonly voteDifferential: string,
            readonly minimumQuorum: string,
            readonly gracePeriod: string,
            readonly executionDelay: string,
            readonly admin: string,
            readonly authorizationBlock: string,
            readonly authorizationTimestamp: string,
            readonly pendingAdmin: string | null
        } | null,
        readonly values: (string)[] | null,
        readonly signatures: (string)[] | null,
        readonly calldatas: (string)[] | null,
        readonly withDelegatecalls: (boolean)[] | null,
        readonly startBlock: string,
        readonly endBlock: string,
        readonly governanceStrategy: string,
        readonly currentYesVote: string,
        readonly currentNoVote: string,
        readonly winner: Winner,
        readonly votes: ({
            readonly id: string,
            readonly voter: string,
            readonly support: boolean,
            readonly votingPower: string,
            readonly timestamp: number
        })[],
        readonly createdTimestamp: number,
        readonly executionTime: string | null,
        readonly initiatorQueueing: string | null,
        readonly initiatorExecution: string | null,
        readonly lastUpdateTimestamp: number,
        readonly lastUpdateBlock: string,
        readonly title: string,
        readonly shortDescription: string,
        readonly govContract: string,
        readonly totalPropositionSupply: string,
        readonly totalVotingSupply: string,
        readonly createdBlockNumber: string,
        readonly totalCurrentVoters: number,
        readonly aipNumber: string,
        readonly author: string,
        readonly discussions: string
    })[]
};