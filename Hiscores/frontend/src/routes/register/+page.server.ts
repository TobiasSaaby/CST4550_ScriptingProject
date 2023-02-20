import { get } from "svelte/store";
import { userStore } from "../../stores/store.user";
	
export const actions = {
	register: async ({request}: {request:any}) => {
		const formData = await request.formData();
		const username = formData.get('username')
		const password = formData.get('password')
		const repeat_password = formData.get('repPassword')

		let resp = await fetch("http://backend:8080/users/register", {method: 'POST', body: JSON.stringify({username, password, repeat_password})});
		let respJson = await resp.json();
		console.log(respJson);
		console.log(get(userStore));
		userStore.set(username);
		console.log(get(userStore));
	}
}
