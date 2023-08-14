<script setup>
defineProps({
	userName: {
		type: String,
		required: true
	},
	id: {
		type: String,
		required: true
	},
	biography: {
		type: String,
		required: false
	},
	tone: {
		type: String,
		required: false
	}
});

const emit = defineEmits(['deleteUser']);

// onMounted - hit tone endpoint to get tone of this specific user.
</script>

<template>
	<div
		class="m-2 flex w-[40rem] flex-row items-center justify-between gap-8 rounded-md bg-gray-300 px-4 py-2 text-black"
	>
		<div class="flex flex-row items-center justify-center gap-x-8">
			<slot name="icon" />
			<div class="flex flex-col gap-3 py-2">
				<div class="flex flex-col">
					<span> {{ userName }} </span>
					<span class="text-xxs text-gray-500"> {{ id }} </span>
				</div>
				<div class="flex flex-col gap-1">
					<span v-if="tone" class="text-xs text-gray-500">Tone: {{ tone }}</span>
					<span v-if="biography" class="text-xs">{{ biography }} </span>
				</div>
			</div>
		</div>
		<button
			class="rounded-md bg-red-300 px-4 py-2 text-sm duration-150 hover:cursor-pointer hover:bg-red-500"
			@click="emit('deleteUser', id)"
		>
			Delete
		</button>
	</div>
</template>
