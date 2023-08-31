import type { User } from "../models/model.user";
import { writable } from "svelte/store";

export const userTableStore = writable<User[]>();