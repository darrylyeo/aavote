import { Environment } from '$houdini'

export default new Environment(async function ({ text, variables = {} }) {
	// send the request to the ricky and morty api
	const result = await this.fetch('https://api.thegraph.com/subgraphs/name/aave/governance-v2', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: text,
			variables,
		}),
	})

	// parse the result as json
	return await result.json()
})