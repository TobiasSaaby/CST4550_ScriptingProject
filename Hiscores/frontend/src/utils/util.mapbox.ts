import { challengeState } from "../models/model.challenge";


export const getChallengeStateColour = (state: number | undefined) => {
    switch (state) {
        case challengeState.Started:
            return "yellow";
        case challengeState.Running:
            return "black";
        case challengeState.Initialising:
            return "blue";
        case challengeState.Finished:
            return "green";
    }
    return "red";
};