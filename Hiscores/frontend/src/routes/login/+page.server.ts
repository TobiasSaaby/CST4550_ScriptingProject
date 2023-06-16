import { redirect } from "@sveltejs/kit";
import { BACKEND_URL } from "../../static/static_values";
import { userStore } from "../../stores/store.user";
import type { User } from "src/models/model.user";
	
export const actions = {
	login: async ({cookies, request}: {cookies:any, request:any}) => {
		const formData = await request.formData();
		const username = formData.get('username')
		const password = formData.get('password')

		let resp = await fetch(`http://${BACKEND_URL}/users/login`, {method: 'POST', body: JSON.stringify({username, password})});
		let respJson = await resp.json();
		let userSignedIn: User = respJson.data;

		cookies.set('session', userSignedIn.username, {
			path: '/',
			secure: 0
		})

		throw redirect(307, '/');
	}
}
