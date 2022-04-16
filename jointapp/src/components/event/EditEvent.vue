<template>
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
                        <input class="form-control" type="text" placeholder="Event Zip" v-model="event.eventZipCode"/>
                    </div>
                    
                </div>
                <div>
                    <button class="btn btn-info mt-3 mb-3 text-center" @click.prevent="editEvent">Update Event</button>
                </div>
            </div>        
        </div>
    </center>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default{
    data(){
        return{
            event: {
                eventName: '',
                eventDate: '',
                eventAddress: '',
                eventZipCode: '',
                }
            }
        },
        created(){
            this.getEventById();
        },
        methods: {
             dateTime(value) {
                return moment(value).format('MM-DD-YYYY');
            },

            async getEventById(){
                try{
                    const res = await axios.get(`http://localhost:3000/event/${this.$route.params.id}`);
                    this.event = res.data;
                } catch(err){
                    console.log(err);
                }
            },

            async editEvent(){
                try{
                let URL = `http://localhost:3000/event/${this.$route.params.id}`;
                await axios.put(URL, this.event).then(() =>{
                    this.$router.push('/intakeEvent')
                });
            } catch(err) {
                console.log(err);
            }
        }
    }
}
</script>
<style>
    .btn {
        margin-right: 10px;
    }
</style>