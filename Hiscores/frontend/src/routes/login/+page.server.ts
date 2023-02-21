import { redirect } from "@sveltejs/kit";
import { BACKEND_URL } from "static/static_values";
import { userStore } from "../../stores/store.user";
	
export const actions = {
	login: async ({request}: {request:any}) => {
		const formData = await request.formData();
		const username = formData.get('username')
		const password = formData.get('password')

		let resp = await fetch(`http://${BACKEND_URL}/users/login`, {method: 'POST', body: JSON.stringify({username, password})});
		let respJson = await resp.json();
		
		userStore.set(respJson.data.username);

		throw redirect(307, '/');
	}
}
