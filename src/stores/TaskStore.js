import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore',{
    state:() =>({
        tasks:[],
        loading:true
    }),
    getters:{
        fevs() {
            return this.tasks.filter((task) => task.isFev)
        },
        favCount(){
            return this.tasks.reduce((accumulator, currentValue)=>{
                return currentValue.isFev ? accumulator+1 : accumulator
            },0)
        },
        totalCount:(state)=>{
            return state.tasks.length
        },
    },
    actions:{
        async getTask(){
            this.loading = true
            const res = await fetch('http://localhost:3000/tasks')
            const data = await res.json()
            this.tasks = data
            this.loading = false
        },
        async addTask(newTask) {
            this.tasks.push(newTask);

            const res = await fetch('http://localhost:3000/tasks',{
                method: 'POST',
                body:JSON.stringify(newTask),
                headers: {'Content-Type': 'application/json'}
            })

            if(res.error){
                console.log(res.error);
            }
        },
        async deleteTask(id){
            this.tasks = this.tasks.filter((item)=>{
                return item.id !== id 
            })

            const res = await fetch(`http://localhost:3000/tasks/${id}` ,{
                method: 'DELETE'
            })

            if(res.error){
                console.log(res.error);
            }
        },
        async toggleFev(id){
            const task = this.tasks.find((item)=>{
                return item.id === id
            })
            task.isFev = !task.isFev

            const res = await fetch('http://localhost:3000/tasks/' + id,{
                method: 'PATCH',
                body:JSON.stringify({isFev : task.isFev}),
                headers: {'Content-Type': 'application/json'}
            })

            if(res.error){
                console.log(res.error);
            }
        }
    }
})
