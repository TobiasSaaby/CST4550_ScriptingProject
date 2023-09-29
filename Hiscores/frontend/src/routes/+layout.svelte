<script lang="ts">
    import type { Challenge } from '../models/model.challenge';
    import { userStore } from '../stores/store.user';
	import Nav from './Nav.svelte';
    import type { User } from '../models/model.user';
    import { userTableStore } from '../stores/store.usertable';
    import { userChallengeStore } from '../stores/store.userchallenge';

	export let data: {
		user: string;
		userTableData: User[];
		challengeTableData: Challenge[];
	};

	let {user, userTableData, challengeTableData} = data;
	
	userTableData = userTableData.sort(
		(x, y) =>
			y.flags.reduce((ySum, yVal) => (ySum = yVal.score), 0) -
			x.flags.reduce((xSum, xVal) => (xSum = xVal.score), 0)
	);

	userStore.set(user)
	userTableStore.set(userTableData)
	userChallengeStore.set(challengeTableData)
</script>

<Nav />

<main>
	<slot />
</main>
