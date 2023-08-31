<script lang="ts">
    import type { Machine } from '../models/model.machine';
    import { userStore } from '../stores/store.user';
	import Nav from './Nav.svelte';
    import type { User } from '../models/model.user';
    import { userTableStore } from '../stores/store.usertable';
    import { userMachineStore } from '../stores/store.usermachine';

	export let data: {
		user: string;
		userTableData: User[];
		machineTableData: Machine[];
	};

	let {user, userTableData, machineTableData} = data;

	userTableData = userTableData.sort(
		(x, y) =>
			y.flags.reduce((ySum, yVal) => (ySum = yVal.score), 0) -
			x.flags.reduce((xSum, xVal) => (xSum = xVal.score), 0)
	);

	userStore.set(user)
	userTableStore.set(userTableData)
	userMachineStore.set(machineTableData)
</script>

<Nav />

<main>
	<slot />
</main>
