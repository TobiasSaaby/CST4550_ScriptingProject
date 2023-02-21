import { redirect } from "@sveltejs/kit";
import { BACKEND_URL } from "static/static_values";
import { userStore } from "../../stores/store.user";
	
export const actions = {
	register: async ({request}: {request:any}) => {
		const formData = await request.formData();
		const username = formData.get('username')
		const password = formData.get('password')
		const repeat_password = formData.get('repPassword')

		let resp = await fetch(`http://${BACKEND_URL}/users/register`, {method: 'POST', body: JSON.stringify({username, password, repeat_password})});
		let respJson = await resp.json();
		
		userStore.set(respJson.data.username);

		throw redirect(307, '/');
	}
}
