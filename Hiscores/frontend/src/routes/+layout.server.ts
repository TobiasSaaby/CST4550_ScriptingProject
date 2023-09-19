import type { LayoutServerLoad } from './$types'
import { BACKEND_URL } from "../static/static_values";
import type { Challenge, UserChallenge } from "../models/model.challenge";

// get `locals.user` and pass it to the `page` store
export const load: LayoutServerLoad = async ({ locals }) => {

    const reqUsers = await fetch(`${BACKEND_URL}/users`, { method: "GET" });
    const reqChallenges = await fetch(`${BACKEND_URL}/challenges`, { method: "GET" });

    const userTableData = (await reqUsers.json()).data;
    const challengeTableData: Challenge[] = (await reqChallenges.json()).data;
    console.log("us " + locals.user)
    if (locals.user) {
        const reqUserChallenges = await fetch(`${BACKEND_URL}/challenges/${locals.user}`, { method: "GET" });

        let userChallengeState: UserChallenge[] = (await reqUserChallenges.json()).challenges;

        challengeTableData.forEach(x =>
            x.state = userChallengeState.find(y => y.challengeid == x.id) ?? {}
        );

    }

    return { user: locals.user, userTableData, challengeTableData };
}
