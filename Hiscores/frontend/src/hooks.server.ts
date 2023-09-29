
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const session: any = event.cookies.get('session')
    console.log(event.cookies.get("user"))
    console.log(session);
    
    if(session){
        event.locals.user = session;
    }

    return await resolve(event);
}