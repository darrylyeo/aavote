import { setEnvironment } from '$houdini'
import env from './environment'
setEnvironment(env)


import * as sapper from '@sapper/app';

sapper.start({
	target: document.querySelector('#sapper')
});