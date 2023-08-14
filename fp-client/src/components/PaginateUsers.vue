<script setup>
import { computed } from 'vue';
import { NUM_USERS_PER_PAGE } from '../constants';

const props = defineProps({
	numUsers: {
		type: Number,
		required: true
	}
});

let canBePaginated = computed(() => props.numUsers > NUM_USERS_PER_PAGE);
let numPages = Math.ceil(props.numUsers / NUM_USERS_PER_PAGE);

const emit = defineEmits(['updatePage']);
</script>

<template>
	<div v-if="canBePaginated" class="my-8 flex flex-row gap-2">
		<button
			v-for="(num, index) in numPages"
			:key="index"
			class="aspect-square rounded-md bg-sky-300 px-4 py-2 text-black duration-150 hover:cursor-pointer hover:bg-sky-500"
			@click="emit('updatePage', num)"
		>
			{{ num }}
		</button>
	</div>
</template>
