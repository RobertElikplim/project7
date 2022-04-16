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
        <div style="width: 100%;">
            <hr class="mt-10 border-solid border-1" style="border-color: black" />
            <table style="width: 100%" class="table text-center table-hover">
                <thead class="bg-light">
                    <tr has-text-centered>
                        <th>Name</th>
                        <th>Cell #</th>
                        <th>Zip</th>
                        <th>DOB</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                <!-- Passing the data  of events information to display into approriate columns-->
                    <tr v-for="client in clients" :key="client.phoneNumber">
                        <td>{{ client.firstName +' '+ client.lastName  }}</td>
                        <td>{{ client.phoneNumber }}</td>
                        <td>{{ client.zipCode }}</td>
                        <td>{{ dateTime(client._id.dateOfBirth) }}</td>
                        <td class="has-text-centered">
                            <router-link :to="{ name: 'editClient', params: { id: client._id } }" class="btn btn-warning is-small">Edit</router-link>
                            <router-link :to="{ name: 'activity', params: { id: client._id } }" class="btn btn-info is-small">Activity</router-link>
                            <router-link :to="{ name: 'addFamily', params: { id: client._id } }" class="btn btn-primary is-small">Family</router-link>
                            <a class="btn btn-danger is-small " @click.prevent="deleteClient(client._id)">Delete</a>
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
            clients: [],
        }
    },
    created(){
        this.getClients();
    },
    methods: {
        async getClients(){
            try{
                const res = await axios.get("http://localhost:3000/client");
                this.clients = res.data;
            } catch(err){
                console.log(err);
            }
        },

        //DELETE ONE CLIENT
        async deleteClient(id){
            try{
                if(window.confirm("Confirm delete")){
                    await axios.delete(`http://localhost:3000/client/${id}`)
                }
                this.getClients();
            } catch(err){
                console.log(err);
            }
        },
        dateTime(value) {
            return moment(value).format('MM-DD-YYYY');
        },
    }
}
</script>

<style>
    .btn {
        margin: 2px;
        float: none;
    }
</style>