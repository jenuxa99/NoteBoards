<script setup>
import { ref } from 'vue';

import Note from './Note-component.vue';

const notes = ref([]);

const addNote = (color) => {
    notes.value.push({
        id: Date.now(),
        title: 'Текст заметки',
        bgColor: color,
    })
    // console.log(notes.value)
}

const deleteNote = (noteId) => {
    notes.value = notes.value.filter(note => note.id !== noteId);
    // console.log(notes.value)
};</script>

<template>
    <main class="relative p-[10px] rounded-3xl shadow-2xl w-[1220px] h-[795px] border border-slate-100">
        <div class="container relative flex bg-dots-pattern h-[100%] w-[100%] ">
            <Note v-for="note in notes" :key="note.id" :title="note.title" :color="note.bgColor"
                @deleteNote="deleteNote(note.id)" />
            <aside
                class="absolute bottom-4 left-4 flex gap-[20px] p-[20px] bg-[#FAFAFA] border border-[#D9D9D9] rounded-xl ml-5 mb-5 z-100">
                <div @click="addNote('#FEB1B1')" class="bg-[#FEB1B1] w-[34px] h-[34px] cursor-pointer"></div>
                <div @click="addNote('#B1D0FE')" class="bg-[#B1D0FE] w-[34px] h-[34px] cursor-pointer"></div>
                <div @click="addNote('#FCFEB1')" class="bg-[#FCFEB1] w-[34px] h-[34px] cursor-pointer"></div>
            </aside>
        </div>
    </main>
</template>