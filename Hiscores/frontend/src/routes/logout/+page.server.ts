import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { userStore } from "../../stores/store.user";
	
export const load = async ({cookies}: {cookies: any}) => {
	cookies.set('session', '', {
		path: '/',
		expires: new Date(0),
	})

	throw redirect(302, '/');
}

