<script setup>
defineProps({
	title: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: false
	}
});

const emit = defineEmits(['onAction']);
</script>

<template>
	<button
		:type="type"
		@click="emit('onAction')"
		class="my-2 w-[8rem] rounded-md bg-sky-300 px-4 py-2 text-xs text-black duration-150 hover:cursor-pointer hover:bg-sky-400"
	>
		{{ title }}
	</button>
</template>
