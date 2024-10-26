<script setup>
import Note from './Note-component.vue';
import { boards, saveBoards } from '@/store';

const props = defineProps({
    boardId: Number,
    notes: Array,
});

const addNote = (color) => {
    const board = boards.value.find(board => board.id === props.boardId);
    if (board) {
        board.notes.push({
            id: Date.now(),
            title: 'Текст заметки',
            bgColor: color,
            position: { x: 0, y: 0 },
            isMoveable: true,
        });
        saveBoards();
    }
};

const deleteNote = (noteId) => {
    const board = boards.value.find(board => board.id === props.boardId);
    if (board) {
        board.notes = board.notes.filter(note => note.id !== noteId);
        saveBoards();
    }
};

const updateNotePosition = ({ noteId, x, y, isMoveable }) => {
    const board = boards.value.find(board => board.id === props.boardId);
    if (board) {
        const note = board.notes.find(note => note.id === noteId);
        if (note) {
            note.position = { x, y };
            note.isMoveable = isMoveable;
            saveBoards();
        }
    }
};
</script>

<template>
    <main class="relative p-[10px] rounded-3xl shadow-2xl w-[1220px] h-[795px] border border-slate-100">
        <div class="container relative flex bg-dots-pattern h-[100%] w-[100%]">
            <Note v-for="note in props.notes" :key="note.id" :noteId="note.id" :title="note.title" :color="note.bgColor"
                :x="note.position.x" :y="note.position.y" @deleteNote="deleteNote(note.id)"
                @updatePosition="updateNotePosition" :isMoveable="note.isMoveable"
                :style="{ left: `${note.position.x}px`, top: `${note.position.y}px` }" />
            <aside
                class="absolute bottom-4 left-4 flex gap-[20px] p-[20px] bg-[#FAFAFA] border border-[#D9D9D9] rounded-xl ml-5 mb-5 z-100">
                <div @click="addNote('#FEB1B1')" class="bg-[#FEB1B1] w-[34px] h-[34px] cursor-pointer"></div>
                <div @click="addNote('#B1D0FE')" class="bg-[#B1D0FE] w-[34px] h-[34px] cursor-pointer"></div>
                <div @click="addNote('#FCFEB1')" class="bg-[#FCFEB1] w-[34px] h-[34px] cursor-pointer"></div>
            </aside>
        </div>
    </main>
</template>
