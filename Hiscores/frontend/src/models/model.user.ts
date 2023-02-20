import type { Flag } from "./model.flag";

export interface User {
    username: string;
    password: string;
    flags: Flag[];
    Token?: string;
}

