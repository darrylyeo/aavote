const path = require('path')

module.exports = {
	schemaPath: path.resolve('./schema.json'),
	sourceGlob: 'src/{routes,components}/*.svelte',
}
