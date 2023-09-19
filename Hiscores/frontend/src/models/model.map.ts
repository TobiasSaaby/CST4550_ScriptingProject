import type { Challenge } from "./model.challenge";

export interface Country {
    id: number;
    properties: CountryProperties;
    challenge?: Challenge;
}

interface CountryProperties {
    name: string
}