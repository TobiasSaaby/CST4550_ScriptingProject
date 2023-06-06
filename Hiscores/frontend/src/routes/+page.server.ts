import { userStore } from "../stores/store.user";
import { get } from "svelte/store";
import { redirect } from "@sveltejs/kit";
import { BACKEND_URL } from "../../static/static_values"

export const load = async () => {
    const reqUsers = await fetch(`http://${BACKEND_URL}/users`, {method: "GET"});
    const reqFlags = await fetch(`http://${BACKEND_URL}/flags`, {method: "GET"});

    const userTableData = (await reqUsers.json()).data;
    const flagTableData = (await reqFlags.json()).data;
    
    return {userTableData, flagTableData};
}

export const actions = {
    submitFlag: async ({request, locals}: {request: any, locals: any}) => {
        const formData = await request.formData();
        const flag = formData.get('flag');
        const username = locals.user.username;

		let resp = await fetch(`http://${BACKEND_URL}/flags/submit`,
            {
                method: 'POST', 
                body: JSON.stringify({username, flag})
            });
        
        if(resp.status == 200){
            throw redirect(307, '/')
        }
    }
}