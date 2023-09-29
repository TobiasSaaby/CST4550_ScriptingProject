import { B as BACKEND_URL } from "../../chunks/static_values.js";
const load = async ({ locals }) => {
  const reqUsers = await fetch(`${BACKEND_URL}/users`, { method: "GET" });
  const reqChallenges = await fetch(`${BACKEND_URL}/challenges`, { method: "GET" });
  const userTableData = (await reqUsers.json()).data;
  const challengeTableData = (await reqChallenges.json()).data;
  if (locals.user) {
    const reqUserChallenges = await fetch(`${BACKEND_URL}/challenges/${locals.user}`, { method: "GET" });
    let userChallengeState = (await reqUserChallenges.json()).challenges;
    userChallengeState.map((x) => challengeTableData.find((y) => y.id == x.challengeid).state = x);
  }
  return { userTableData, challengeTableData };
};
export {
  load
};
