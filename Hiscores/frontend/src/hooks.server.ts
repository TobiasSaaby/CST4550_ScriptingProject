
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session')

	console.log(`hook ${session}`);

    if(session){
        event.locals.user = session;
    }

    return await resolve(event);
}