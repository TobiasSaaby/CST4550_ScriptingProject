import type mapboxgl from "mapbox-gl";

export interface Challenge {
    id: number;
    description: string;
    score: number;
    type: number;
    access: string;
    state: UserChallenge;
    marker: mapboxgl.Marker;
}

export interface UserChallenge {
    challengeid?: number;
    userusername?: string;
    instanceid?: string;
    status?: string;
    ip?: string;
    state?: number;
}

export const enum challengeState {
    Started = 0,
    Running = 1,
    Initialising = 2,
    Finished = 3
}
