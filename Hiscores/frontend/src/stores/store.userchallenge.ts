import type { Challenge } from "../models/model.challenge";
import { writable } from "svelte/store";

export const userChallengeStore = writable<Challenge[]>();