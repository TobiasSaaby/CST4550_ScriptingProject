// @ts-nocheck
import { get } from "svelte/store";
import { userStore } from "../stores/store.user";
import type { LayoutServerLoad } from './$types'

// get `locals.user` and pass it to the `page` store
export const load = async ({locals}: Parameters<LayoutServerLoad>[0]) => {
    console.log(`layouts: ${JSON.stringify(locals)}`)
    return {user: locals.user};
}
