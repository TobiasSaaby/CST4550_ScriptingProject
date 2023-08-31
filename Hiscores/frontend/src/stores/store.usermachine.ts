import type { Machine } from "../models/model.machine";
import { writable } from "svelte/store";

export const userMachineStore = writable<Machine[]>();