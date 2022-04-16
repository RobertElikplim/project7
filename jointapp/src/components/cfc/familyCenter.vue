<template>
    <div id="nav">
        <nav class="navbar navbar-expand-md bg-success navbar-light">
            <div class="container">
                <router-link class="navbar-brand float-left" to="/familyCenter">COMMUNITY FAMILY CENTERS</router-link>
                <div class="navbar-nav mr-auto">
                    <router-link class="nav-item nav-link" to="/intakeClient">ADD CLIENT</router-link>
                    <router-link class="nav-item nav-link" to="/showClients">CLIENTS</router-link>
                    <router-link class="nav-item nav-link" to="/graphc">SUMMARY</router-link>
                </div>  
            </div>
        </nav>

        <div class="container mt-5">
            <router-view></router-view>
        </div>
    </div>
<center>    
    <div class="col-md-4">
        <h3>Welcome</h3><br>
        <h3>Community Family Center</h3><br>
        <div class="row" style="height:auto;">
        <hr class="mt-10 border-solid border-1" style="border-color: black" />
        <h3 class="text-success fw-bold">REGISTER WORKER/VOLUNTEER</h3><br>
        <div class="row">
            <div class="form-group col-md-12">
                <input class="form-control" type="text" placeholder="Full Name" v-model="worker.fullName"/>
                <button class="btn btn-info mt-3 mb-3" @click.prevent="createWorker">Save</button>
            </div>
        </div>
        </div>
    </div>
</center>
</template>

<script>
import axios from "axios";

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