import { userStore } from "../stores/store.user";
import { get } from "svelte/store";
import { redirect } from "@sveltejs/kit";
import { BACKEND_URL } from "../static/static_values"

export const load = async ({locals}: {locals: any}) => {
    const reqUsers = await fetch(`http://${BACKEND_URL}/users`, {method: "GET"});
    const reqFlags = await fetch(`http://${BACKEND_URL}/flags`, {method: "GET"});

    const userTableData = (await reqUsers.json()).data;
    const flagTableData = (await reqFlags.json()).data;
    
    let userFlags = [];
    
    if(locals.user){
        const reqUserFlags = await fetch(`http://${BACKEND_URL}/flags/${locals.user}`, {method: "GET"});

        userFlags = (await reqUserFlags.json()).Flags;
    }
    
    return {userTableData, flagTableData, userFlags};
}

