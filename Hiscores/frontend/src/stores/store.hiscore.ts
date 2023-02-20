import type { Hiscore } from "src/models/model.hiscore";
import { writable } from "svelte/store";

let hiscoreStore = writable<Hiscore[]>([{}]);