import type { Hiscore } from "../models/model.hiscore";
import { writable } from "svelte/store";

let hiscoreStore = writable<Hiscore[]>([{}]);