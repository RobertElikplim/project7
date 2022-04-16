<template>
    <center>
        <div>
            <hr class="mt-10 border-solid border-1" style="border-color: black" />
            <h4 class="text-success fw-bold">Events {{ names.lastName + ' ' + names.firstName }} has Registered for</h4>
            <table style="width: 100%" class="table text-center table-hover">
                <thead class="bg-light">
                    <tr has-text-centered>
                        <th>Event</th>
                        <th>Date</th>
                        <th>ZipCode</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="client in clients" :key="client._id">
                        <td>{{ client._id.eventName }} </td>
                        <td>{{ dateTime(client._id.eventDate) }} </td>
                        <td>{{ client._id.eventZipCode }} </td>
                        <td>{{ client._id.eventAddress }} </td>
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
            names: [],
        }
    },
    created(){
        this.info();
        this.getData();
    },
    methods: {
        async info(){
            try{
                const res = await axios.get(`http://localhost:3000/client/summary/${this.$route.params.id}`);
                this.clients = res.data;
            } catch(err){
                console.log(err);
            }
        },
        async getData(){
            try{
                const res = await axios.get(`http://localhost:3000/client/${this.$route.params.id}`);
                this.names = res.data;
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