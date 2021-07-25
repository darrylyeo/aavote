export default {
    name: "AllProposals",
    kind: "HoudiniQuery",

    raw: `query AllProposals {
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
`,

    rootType: "Query",

    selection: {
        "proposals": {
            "type": "Proposal",
            "keyRaw": "proposals(first: 100, orderBy: createdTimestamp, orderDirection: desc)",

            "fields": {
                "id": {
                    "type": "ID",
                    "keyRaw": "id"
                },

                "state": {
                    "type": "ProposalState",
                    "keyRaw": "state"
                },

                "ipfsHash": {
                    "type": "String",
                    "keyRaw": "ipfsHash"
                },

                "creator": {
                    "type": "Bytes",
                    "keyRaw": "creator"
                },

                "executor": {
                    "type": "Executor",
                    "keyRaw": "executor",

                    "fields": {
                        "id": {
                            "type": "ID",
                            "keyRaw": "id"
                        },

                        "authorized": {
                            "type": "Boolean",
                            "keyRaw": "authorized"
                        },

                        "propositionThreshold": {
                            "type": "BigInt",
                            "keyRaw": "propositionThreshold"
                        },

                        "votingDuration": {
                            "type": "BigInt",
                            "keyRaw": "votingDuration"
                        },

                        "voteDifferential": {
                            "type": "BigInt",
                            "keyRaw": "voteDifferential"
                        },

                        "minimumQuorum": {
                            "type": "BigInt",
                            "keyRaw": "minimumQuorum"
                        },

                        "gracePeriod": {
                            "type": "BigInt",
                            "keyRaw": "gracePeriod"
                        },

                        "executionDelay": {
                            "type": "BigInt",
                            "keyRaw": "executionDelay"
                        },

                        "admin": {
                            "type": "Bytes",
                            "keyRaw": "admin"
                        },

                        "authorizationBlock": {
                            "type": "BigInt",
                            "keyRaw": "authorizationBlock"
                        },

                        "authorizationTimestamp": {
                            "type": "BigInt",
                            "keyRaw": "authorizationTimestamp"
                        },

                        "pendingAdmin": {
                            "type": "Bytes",
                            "keyRaw": "pendingAdmin"
                        }
                    }
                },

                "values": {
                    "type": "BigInt",
                    "keyRaw": "values"
                },

                "signatures": {
                    "type": "String",
                    "keyRaw": "signatures"
                },

                "calldatas": {
                    "type": "Bytes",
                    "keyRaw": "calldatas"
                },

                "withDelegatecalls": {
                    "type": "Boolean",
                    "keyRaw": "withDelegatecalls"
                },

                "startBlock": {
                    "type": "BigInt",
                    "keyRaw": "startBlock"
                },

                "endBlock": {
                    "type": "BigInt",
                    "keyRaw": "endBlock"
                },

                "governanceStrategy": {
                    "type": "Bytes",
                    "keyRaw": "governanceStrategy"
                },

                "currentYesVote": {
                    "type": "BigInt",
                    "keyRaw": "currentYesVote"
                },

                "currentNoVote": {
                    "type": "BigInt",
                    "keyRaw": "currentNoVote"
                },

                "winner": {
                    "type": "Winner",
                    "keyRaw": "winner"
                },

                "votes": {
                    "type": "Vote",
                    "keyRaw": "votes",

                    "fields": {
                        "id": {
                            "type": "ID",
                            "keyRaw": "id"
                        },

                        "voter": {
                            "type": "Bytes",
                            "keyRaw": "voter"
                        },

                        "support": {
                            "type": "Boolean",
                            "keyRaw": "support"
                        },

                        "votingPower": {
                            "type": "BigInt",
                            "keyRaw": "votingPower"
                        },

                        "timestamp": {
                            "type": "Int",
                            "keyRaw": "timestamp"
                        }
                    }
                },

                "createdTimestamp": {
                    "type": "Int",
                    "keyRaw": "createdTimestamp"
                },

                "executionTime": {
                    "type": "BigInt",
                    "keyRaw": "executionTime"
                },

                "initiatorQueueing": {
                    "type": "Bytes",
                    "keyRaw": "initiatorQueueing"
                },

                "initiatorExecution": {
                    "type": "Bytes",
                    "keyRaw": "initiatorExecution"
                },

                "lastUpdateTimestamp": {
                    "type": "Int",
                    "keyRaw": "lastUpdateTimestamp"
                },

                "lastUpdateBlock": {
                    "type": "BigInt",
                    "keyRaw": "lastUpdateBlock"
                },

                "title": {
                    "type": "String",
                    "keyRaw": "title"
                },

                "shortDescription": {
                    "type": "String",
                    "keyRaw": "shortDescription"
                },

                "govContract": {
                    "type": "Bytes",
                    "keyRaw": "govContract"
                },

                "totalPropositionSupply": {
                    "type": "BigInt",
                    "keyRaw": "totalPropositionSupply"
                },

                "totalVotingSupply": {
                    "type": "BigInt",
                    "keyRaw": "totalVotingSupply"
                },

                "createdBlockNumber": {
                    "type": "BigInt",
                    "keyRaw": "createdBlockNumber"
                },

                "totalCurrentVoters": {
                    "type": "Int",
                    "keyRaw": "totalCurrentVoters"
                },

                "aipNumber": {
                    "type": "BigInt",
                    "keyRaw": "aipNumber"
                },

                "author": {
                    "type": "String",
                    "keyRaw": "author"
                },

                "discussions": {
                    "type": "String",
                    "keyRaw": "discussions"
                }
            }
        }
    }
};