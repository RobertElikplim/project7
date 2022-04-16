<template>
<center>
    <div class="row justify-content-center">
        <div class="col-md-12">
            <hr class="mt-3 mb-4" />
            <h4 class="text-success fw-bold">Bread of Life - EVENTS</h4>
            <div class="row">

                <div class="form-group col-md-3">
                    <input class="form-control" type="text" placeholder="Full Name" v-model="worker.fullName"/>
                </div>

            </div>
            <div>
                <button class="btn btn-info mt-3 mb-3 text-center" @click.prevent="createWorker">Create Event</button>
            </div>
        </div>

        <hr class="mt-3 mb-4" />
        <table style="width: 100%" class="table text-center table-hover">
                <thead class="bg-light">
                    <tr has-text-centered>
                        <th>Full Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="worker in workers" :key="worker._id">
                        <td>{{ worker.fullName }}</td>
                        <td class="has-text-centered">
                            <a class="btn btn-danger is-small " @click.prevent="deleteWorker(worker._id)">Delete</a>
                        </td>
                    </tr>
                </tbody>
        </table>

    </div>
</center>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default{
    data(){
        return{
            workers: [],
            worker: {
                fullName: '',
                }
            }
        },
        created(){
            this.getWorkers();
        },
        methods: {
            async getWorkers(){
                try{
                    const res = await axios.get("http://localhost:3000/worker");
                    this.workers = res.data;
                } catch(err){
                    console.log(err);
                }
            },

            async createWorker(){
                try{
                let URL = 'http://localhost:3000/worker';
                await axios.post(URL, this.worker).then(() =>{
                    window.location.reload();
                this.worker = {
                    fullName: '',
                }
                });
            } catch(err) {
                console.log(err);
            }
        },

        //DELETE Worker
        async deleteWorker(id){
            try{
                if(window.confirm("Confirm delete")){
                    await axios.delete(`http://localhost:3000/worker/${id}`)
                }
                window.location.reload();
            } catch(err){
                console.log(err);
            }
        }
    }
}
</script>

<style>
    .btn {
        margin: 2px;
        float: none;
    }
</style>