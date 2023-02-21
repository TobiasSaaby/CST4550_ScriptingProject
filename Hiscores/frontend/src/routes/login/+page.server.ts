import { redirect } from "@sveltejs/kit";
import { BACKEND_URL } from "../../../static/static_values";
import { userStore } from "../../stores/store.user";
	
export const actions = {
	login: async ({cookies, request}: {cookies:any, request:any}) => {
		const formData = await request.formData();
		const username = formData.get('username')
		const password = formData.get('password')

		let resp = await fetch(`http://${BACKEND_URL}/users/login`, {method: 'POST', body: JSON.stringify({username, password})});
		let respJson = await resp.json();
		let usernameReturn = respJson.data.username;

		cookies.set('session', usernameReturn, {
			path: '/',
			secure: 0
		})

    	console.log(`login server username: ${usernameReturn}`)
    	console.log(`login server cookie: ${JSON.stringify(cookies.get('session'))}`)

		
		throw redirect(307, '/');
	}
}
