<template>
    <div class="single_task">
        <p>{{task.title}}</p>
        <div>
            <span @click="taskStore.deleteTask(task.id)" class="material-icons md-18">delete</span>
            <span @click="taskStore.toggleFev(task.id)" class="material-icons md-18" :class="{active : task.isFev}">favorite</span>
        </div>
    </div>
</template>

<script>
import { useTaskStore } from '@/stores/TaskStore'
export default {
    props:[
        'task'
    ],
    setup(){
        const taskStore = useTaskStore()
        return { taskStore }
    }
    
}
</script>

<style>
    .single_task{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: rgb(87, 120, 120);
        padding: 2px 12px;
        /* border: 1px solid ; */
        margin-bottom: 2px;
        border-radius: 10px;
    }
    .active{
        color: red;
    }
</style>