<template>
    <div id="nav">
        <nav class="navbar navbar-expand-md bg-warning navbar-info">
            <div class="container">
                <router-link class="navbar-brand float-left" to="/intakeEvent">BREAD OF LIFE</router-link>
                <div class="navbar-nav mr-auto">
                    <router-link class="nav-item nav-link" to="/intakeClient">ADD CLIENT</router-link>
                    <router-link class="nav-item nav-link" to="/showClientsBol">CLIENTS</router-link>
                    <router-link class="nav-item nav-link" to="/graphb">SUMMARY</router-link>
                </div>  
            </div>
        </nav>

        <div class="container mt-5">
            <router-view></router-view>
        </div>
    </div>
<center>
    <div class="row justify-content-center">
        <div class="col-md-12">
            <hr class="mt-3 mb-4" />
            <h4 class="text-success fw-bold">Bread of Life - EVENTS</h4>
            <div class="row">

                <div class="form-group col-md-3">
                    <input class="form-control" type="text" placeholder="Event Name" v-model="event.eventName"/>
                </div>

                <div class="form-group col-md-3">
                    <input class="form-control" type="Date" placeholder="Event Date" v-model="event.eventDate"/>
                </div>

                <div class="form-group col-md-3">
                    <input class="form-control" type="text" placeholder="Event Address" v-model="event.eventAddress"/>
                </div>

                <div class="form-group col-md-3">
                    <input class="form-control" type="Number" placeholder="Event Zip" v-model="event.eventZipCode"/>
                </div>
                
            </div>
            <div>
                <button class="btn btn-info mt-3 mb-3 text-center" @click.prevent="createEvent">Create Event</button>
            </div>
        </div>

        <hr class="mt-3 mb-4" />
        <table style="width: 60%" class="table text-center table-hover">
                <thead class="bg-light">
                    <tr has-text-centered>
                        <th>Event Name</th>
                        <th>Event Date</th>
                        <th>Event Address</th>
                        <th>Event Zip</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="event in events" :key="event._id">
                        <td>{{ event.eventName }}</td>
                        <td>{{ dateTime(event.eventDate) }}</td>
                        <td>{{ event.eventAddress }}</td>
                        <td>{{ event.eventZipCode }}</td>
                        <td class="has-text-centered">
                            <router-link :to="{ name: 'editEvent', params: { id: event._id } }" class="btn btn-warning is-small">Edit</router-link>
                            <a class="btn btn-danger is-small " @click.prevent="deleteEvent(event._id)">Delete</a>
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
            events: [],
            event: {
                eventName: '',
                eventDate: '',
                eventAddress: '',
                eventZipCode: '',
                }
            }
        },
        created(){
            this.getEvents();
        },
        methods: {
             dateTime(value) {
                return moment(value).format('MM-DD-YYYY');
            },

            async getEvents(){
                try{
                    const res = await axios.get("http://localhost:3000/event/allevents");
                    this.events = res.data;
                } catch(err){
                    console.log(err);
                }
            },

            async createEvent(){
                try{
                let URL = 'http://localhost:3000/event';
                await axios.post(URL, this.event).then(() =>{
                    window.location.reload();
                this.event = {
                    eventName: '',
                    eventDate: '',
                    eventAddress: '',
                    eventZipCode: '',
                }
                });
            } catch(err) {
                console.log(err);
            }
        },

        //DELETE ONE EVENT
        async deleteEvent(id){
            try{
                if(window.confirm("Confirm delete")){
                    await axios.delete(`http://localhost:3000/event/${id}`)
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