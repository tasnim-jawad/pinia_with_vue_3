<template>
  <main>
    <div class="heading">
      <img class="pinia_img" src="https://pinia.vuejs.org/logo.svg" alt="">
      <h1 class="pinia_heading">Task manager</h1>
    </div>
    <div>
      <TaskAddForm></TaskAddForm>
    </div>
    <div class="">
      <button @click="filter = 'all'">all tasks</button>
      <button @click="filter = 'favs'">favorite tasks</button>
    </div>
    <div class="loading" v-if="taskStore.loading">task is loading</div>
    <div class="tasks" v-if="filter === 'all'">
        <p>all tasks: {{taskStore.totalCount}}</p>
        <p>all tasks: {{totalCount}}</p>
        <div v-for="task in taskStore.tasks" :key="task.id">
          <TaskDetails :task="task"></TaskDetails>
        </div>
    </div>
    <div class="tasks" v-if="filter === 'favs'">
      <p>favorite tasks : {{taskStore.favCount}} </p>
      <div v-for="task in taskStore.fevs" :key="task.id">
        <TaskDetails :task="task"></TaskDetails>
      </div>
    </div>
    
  </main>
</template>

<script>
import { ref } from 'vue';
import TaskDetails from "./components/TaskDetails.vue";
import TaskAddForm from "./components/TaskAddForm.vue";
import { useTaskStore } from "./stores/TaskStore";
import { storeToRefs } from 'pinia';

export default {
  components:{ TaskDetails,TaskAddForm },
  setup(){
    const taskStore = useTaskStore();
    // console.log(taskStore.fevs);
    const {tasks,loading,fevs,favCount,totalCount} = storeToRefs(taskStore)
    taskStore.getTask()
    const filter = ref('all')
    return {taskStore , filter ,tasks , loading , fevs , favCount , totalCount }
  }

}
</script>

<style>
  .heading{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: aquamarine;
    width: 100%;
  }
  .pinia_img{
    height: 60px;
  }
  .pinia_heading{
    padding-left:20px ;
    transform: skew(7deg, -7deg);

  }
  .tasks{
    width: 50%;
    background-color: beige;
    margin: auto;
    padding: 10px;
  }
  .loading{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: blue;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
