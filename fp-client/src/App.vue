<script setup>
import { ref, onMounted } from 'vue';
import UserProfile from './components/UserProfile.vue';
import CreateUserModal from './components/CreateUserModal.vue';
import getUsers from './utils/getUsers.js';
import createUser from './utils/createUser.js';
import deleteUser from './utils/deleteUser.js';
import getDefaultUsers from './utils/defaultUsers';
import PaginateUsers from './components/PaginateUsers.vue';
import { NUM_USERS_PER_PAGE } from './constants/index.js';

let users = ref();
let isError = ref(false);
let currRange = ref();

function onUpdatePage(page) {
	currRange.value = users.value.slice(
		(page - 1) * NUM_USERS_PER_PAGE,
		(page - 1) * NUM_USERS_PER_PAGE + NUM_USERS_PER_PAGE
	);
}

async function onDeleteUser(identification) {
	let res = await deleteUser(identification);
	if (res instanceof Error) {
		console.log(res.message);
		return (isError.value = true);
	}

	users.value = users.value.filter((user) => user.id !== identification);
	currRange.value = currRange.value.filter((user) => user.id !== identification);

	console.log(res.message);
}

async function onCreateUser(name, bio = '', event) {
	let res = await createUser(name, bio);
	if (res instanceof Error) {
		console.log(res.message);
		return (isError.value = true);
	}

	const { username, id, biography, avatar } = res;
	users.value.push({ username, id, biography, avatar });

	event.target.reset();
}

onMounted(async () => {
	let data = await getUsers();
	if (data instanceof Error) {
		users.value = [getDefaultUsers()];
		return (isError.value = true);
	}

	console.log('Data: ', data);
	users.value = data;

	currRange.value = users.value.slice(0, 5);
});
</script>

<template>
	<div class="my-12 flex h-full w-full flex-col items-center justify-center">
		<CreateUserModal @create-user="onCreateUser" />
		<UserProfile
			v-for="(user, index) in currRange"
			:userName="user.username"
			:id="user.id"
			:biography="user.biography"
			:tone="user.tone"
			:key="index"
			@delete-user="onDeleteUser"
		>
			<template #icon>
				<img :src="user.avatar" alt="" width="50" height="50" />
			</template>
		</UserProfile>
		<PaginateUsers v-if="users" :numUsers="users.length" @update-page="onUpdatePage" />
	</div>
</template>
