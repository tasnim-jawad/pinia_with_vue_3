<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="add task ..." v-model="newTask">
    <button>Add</button>
  </form>
</template>

<script>
import { useTaskStore } from '@/stores/TaskStore'
import { ref } from 'vue'
export default {
    setup(){
        const taskStore = useTaskStore()
        const newTask = ref('')

        const handleSubmit = () =>{
            if(newTask.value.length >0){
                console.log(taskStore);
                taskStore.addTask({
                    id: Math.floor(Math.random() * 1000),
                    title:newTask.value ,
                    isFev:false
                })
                newTask.value = ""
            }
        }
        return { handleSubmit , newTask }
    }
}
</script>

<style>

</style>