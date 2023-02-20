import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { userStore } from "../../stores/store.user";
	
export const load = async () => {
	userStore.set(null);
	console.log(get(userStore));
	throw redirect(307, '/');
}
	

