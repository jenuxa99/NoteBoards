<script setup>
import { computed, ref, onMounted, onBeforeUnmount, defineEmits, watch } from 'vue';

const props = defineProps({
    title: String,
    color: String,
    noteId: Number,
    x: Number,
    y: Number,
    isMoveable: Boolean,
});

const position = ref({ x: props.x, y: props.y });
const emit = defineEmits(['deleteNote', 'updatePosition']);
const noteRef = ref(null);

const isMoveable = ref(props.isMoveable);
const isVisible = ref(true);

const bgColor = computed(() => `bg-[${props.color}]`);

const makeDraggable = (element, container) => {
    const onMouseDown = (event) => {
        if (event.target.classList.contains('unableToMove')) {
            return;
        }

        isVisible.value = false;

        const initialMouseX = event.clientX;
        const initialMouseY = event.clientY;

        const noteRect = element.getBoundingClientRect();
        const initialPos = { left: position.value.x, top: position.value.y };

        const moveAt = (pageX, pageY) => {
            const containerRect = container.getBoundingClientRect();

            let newLeft = initialPos.left + (pageX - initialMouseX);
            let newTop = initialPos.top + (pageY - initialMouseY);

            newLeft = Math.max(0, Math.min(newLeft, containerRect.width - noteRect.width));
            newTop = Math.max(0, Math.min(newTop, containerRect.height - noteRect.height));

            element.style.left = `${newLeft}px`;
            element.style.top = `${newTop}px`;

            position.value = { x: newLeft, y: newTop };
            emit('updatePosition', { noteId: props.noteId, x: position.value.x, y: position.value.y, isMoveable: isMoveable.value });
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
    emit('updatePosition', { noteId: props.noteId, x: position.value.x, y: position.value.y, isMoveable: isMoveable.value });
};

const toDel = () => {
    emit('deleteNote', props.noteId);
};

onMounted(() => {
    const container = document.querySelector('.container');
    makeDraggable(noteRef.value, container);
    document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});

watch(() => props.x, (newX) => {
    position.value.x = newX;
});

watch(() => props.y, (newY) => {
    position.value.y = newY;
});

watch(() => props.isMoveable, (newIsMoveable) => {
    isMoveable.value = newIsMoveable; 
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
