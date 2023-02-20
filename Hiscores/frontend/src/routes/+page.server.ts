import { userStore } from "../stores/store.user";
import { get } from "svelte/store";
import { redirect } from "@sveltejs/kit";

export const load = async () => {
    const reqUsers = await fetch("http://backend:8080/users", {method: "GET"});
    const reqFlags = await fetch("http://backend:8080/flags", {method: "GET"});

    const userTableData = (await reqUsers.json()).data;
    const flagTableData = (await reqFlags.json()).data;
    
    return {userTableData, flagTableData};
}

export const actions = {
    submitFlag: async ({request}: {request: any}) => {
        const formData = await request.formData();
        const flag = formData.get('flag');
        const username = get(userStore);

		let resp = await fetch("http://backend:8080/flags/submit",
            {
                method: 'POST', 
                body: JSON.stringify({username, flag})
            });
        
        if(resp.status == 200){
            throw redirect(307, '/')
        }
    }
}