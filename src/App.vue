<script setup>
import Tab from './components/Tab-component.vue';
import router from './router';
import { boards, addBoard, deleteBoard } from './store'; 

const handleAddBoard = () => {
  addBoard(); 
};

const handleDeleteBoard = (boardId) => {
  deleteBoard(boardId);
  if (boards.value.length === 0) {
    router.push('/');
  }
};
</script>

<template>
  <section class="flex flex-col items-center justify-start gap-5 mt-5">
    <section
      class="flex gap-3 items-center px-10 py-5 rounded-3xl shadow-lg w-[1220px] border border-slate-100 overflow-hidden">
      <button @click="handleAddBoard"
        class="border border-black p-1 w-10 rounded-lg text-xl font-bold bg-green-200 hover:bg-green-300 active:bg-green-400 duration-300">+</button>
      <div class="flex gap-1">
        <Tab v-for="item in boards" :key="item.id" :id="item.id" :title="item.title"
          @deleteBoard="handleDeleteBoard(item.id)" />
      </div>
    </section>

    <RouterView />
  </section>
</template>
