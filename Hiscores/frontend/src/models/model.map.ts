import type { Machine } from "./model.machine";

export interface Country {
    id: number;
    properties: CountryProperties;
    machine?: Machine;
}

interface CountryProperties {
    name: string
}