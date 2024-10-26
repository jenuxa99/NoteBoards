<script setup>
const props = defineProps({
    title: String,
    id: Number,
})

const emit = defineEmits('deleteBoard');
const toDel = () => {
    emit('deleteBoard', props.boardId);
}
</script>
<template>
    <section
        class="flex items-center gap-5 border border-black py-1 pl-5 pr-3 rounded-lg  bg-green-200 hover:bg-green-300 duration-300">
        <RouterLink :to="`/${props.id}`" class="text-lg font-semibold">{{ props.title }}</RouterLink>
        <button @click="toDel"
            class="text-lg font-semibold border border-gray-600 bg-gray-400 rounded-sm px-1.5 hover:bg-gray-500 active:bg-gray-600 duration-300">X</button>
    </section>
</template>