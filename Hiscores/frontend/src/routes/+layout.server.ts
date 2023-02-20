import { get } from "svelte/store";
import { userStore } from "../stores/store.user";

export const load = async () => {
    const user = get(userStore);

    return {user};
}
