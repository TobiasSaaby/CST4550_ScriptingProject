import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { userStore } from "../../stores/store.user";
	
export const load = async () => {
	userStore.set(null);
	
	throw redirect(307, '/');
}
	

