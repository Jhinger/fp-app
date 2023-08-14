<script setup>
import { ref } from 'vue';
import CallToAction from './CallToAction.vue';

const emit = defineEmits(['createUser']);

let username = ref('');
let biography = ref('');
</script>

<template>
	<form
		@submit.prevent="emit('createUser', username, biography, $event)"
		class="mb-8 flex w-[30rem] flex-col rounded-md bg-gray-300 px-8 py-2 text-black"
	>
		<label for="user-username" class="text-sm">Username: </label>
		<input
			id="user-username"
			v-model.trim="username"
			class="my-2 rounded-sm px-4 py-2 text-xs"
			placeholder="ex. gurshanj11"
			autocomplete="off"
			maxlength="15"
			oninvalid="this.setCustomValidity('Username cannot be blank.')"
			oninput="this.setCustomValidity('')"
			required
		/>

		<label for="user-biography" class="text-sm">Biography: </label>
		<input
			id="user-biography"
			v-model.trim="biography"
			class="my-2 rounded-sm px-4 py-2 text-xs"
			autocomplete="off"
			maxlength="30"
		/>

		<div class="flex w-full justify-end">
			<CallToAction title="Create User" type="submit" />
		</div>
	</form>
</template>
