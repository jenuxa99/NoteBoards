<script setup>
import { computed, ref, onMounted, onBeforeUnmount, defineEmits } from 'vue';

const props = defineProps({
    title: String,
    color: String,
    noteId: Number
});

const emit = defineEmits('deleteNote');
const noteRef = ref(null);

const isMoveable = ref(true);
const isVisible = ref(false);

const bgColor = computed(() => `bg-[${props.color}]`);

const makeDraggable = (element, container) => {
    const onMouseDown = (event) => {
        if (event.target.classList.contains('unableToMove')) {
            return;
        }

        isVisible.value = false;

        const initialMouseX = event.clientX;
        const initialMouseY = event.clientY;
        const initialPos = { left: element.offsetLeft, top: element.offsetTop };

        const moveAt = (pageX, pageY) => {
            const containerRect = container.getBoundingClientRect();
            const noteRect = element.getBoundingClientRect();

            let newLeft = initialPos.left + (pageX - initialMouseX);
            let newTop = initialPos.top + (pageY - initialMouseY);

            if (newLeft < 0) newLeft = 0;
            if (newLeft > containerRect.width - noteRect.width) {
                newLeft = containerRect.width - noteRect.width;
            }
            if (newTop < 0) newTop = 0;
            if (newTop > containerRect.height - noteRect.height) {
                newTop = containerRect.height - noteRect.height;
            }

            element.style.left = `${newLeft}px`;
            element.style.top = `${newTop}px`;
        };

        const onMouseMove = (event) => {
            if (isMoveable.value) moveAt(event.pageX, event.pageY);
        };

        document.addEventListener('mousemove', onMouseMove);

        document.onmouseup = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.onmouseup = null;
            isVisible.value = true;
        };
    };

    element.ondragstart = () => false;
    element.addEventListener('mousedown', onMouseDown);
};

const handleClickOutside = (event) => {
    if (!noteRef.value.contains(event.target)) isVisible.value = false;
};

const toPin = () => {
    isMoveable.value = !isMoveable.value;
}

const toDel = () => {
    emit('deleteNote', props.noteId);
}


onMounted(() => {
    const container = document.querySelector('.container');
    makeDraggable(noteRef.value, container);
    document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<template>
    <section ref="noteRef" class="absolute top-[30px] left-[30px] w-[251px] h-[251px] p-5" :class="bgColor">
        <div class="relative">
            <div v-show="!isMoveable"
                class="absolute -top-11 left-10 w-[143px] h-[33px] border-[4px] border-white bg-[#DBCDFF]"></div>
            <div v-show="isVisible"
                class="unableToMove absolute -top-[65px] left-[72px] flex justify-between gap-[13px] p-[6px] bg-[#222222] rounded-md">
                <img @click="toPin" class="unableToMove" src="../assets/pin-icon.svg" alt="pin">
                <img @click="toDel" class="unableToMove" src="../assets/delete-icon.svg" alt="del">
            </div>
        </div>
        <p contenteditable="true" class="unableToMove cursor-text w-full max-h-[211px] text-wrap outline-none truncate">
            {{ title }}</p>
    </section>
</template>

<style>
* {
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
}
</style>
