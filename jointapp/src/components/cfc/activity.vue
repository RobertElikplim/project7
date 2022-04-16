<template>
<center>
    <div class="row justify-content-center">
        <div class="col-md-12">
            <hr class="mt-3 mb-4" />
            <h4 class="text-success fw-bold">Add Activity To Client</h4>
            <div class="row">
               <div class="form-group col-md-3">
                    <select class="form-control" v-model="activity.program">
                        <option disabled value="">Select Program</option>
                        <option>Family Support Services</option>
                        <option>Adult Education</option>
                        <option>Youth Services Program</option>
                        <option>Early Childhood Education</option>
                    </select>
                </div>

                <div class="form-group col-md-3">
                    <input class="form-control" type="text" placeholder="Short Note" v-model="activity.shortNotes"/>
                </div>

               <div class="form-group col-md-3">
                    <div id="v-model-select">
                        <select class="form-control" v-model="activity.hasUsedServices">
                            <option disabled value="">Have you used this service in the past?</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div> 
                </div>

                <div class="form-group col-md-3">
                    <select class="form-control" v-model="activity.workerID">
                        <option disabled selected value="">Added By?</option>
                        <option  v-for="worker in selectWorker" :value="worker.workerID" :key="worker._id" > {{worker.fullName}}</option>
                    </select>
                </div>
            </div>
            <div>
                <button class="btn btn-info mt-3 mb-3 text-center" @click.prevent="addActivity">Add Activity</button>
                <button class="btn btn-info mt-3 mb-3" @click="$router.go(-1)">Go Back</button>
            </div>
        </div>
        <hr class="mt-3 mb-4" />
        <table style="width: 100%" class="table text-center table-hover">
                <thead class="bg-light">
                    <tr has-text-centered>
                        <th>Program</th>
                        <th>Date</th>
                        <th>Worker ID</th>
                        <th>Used Service</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                <!-- Passing the data  of events information to display into approriate columns-->
                    <tr v-for="act in activities" :key="act._id">
                        <td>{{ act.program }}</td>
                        <td>{{ dateTime(act.date) }}</td>
                        <td>{{ act.workerID }}</td>
                        <td>{{ act.hasUsedServices }}</td>
                        <td>{{ act.shortNotes }}</td>
                        <td class="has-text-centered">
                            <a class="btn btn-danger is-small " @click.prevent="deleteActivity(act._id)">Delete</a>
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
            activities: [],
            selectWorker: [],
            activity: {
                clientID: '',
                program: '',
                shortNotes: '',
                hasUsedServices: '',
                workerID: '',
            }
        }
    },
    created(){
        this.getActivity();
        this.activity.clientID = this.$route.params.id;

        let options = `http://localhost:3000/worker`;
        axios.get(options).then((res) =>{
            this.selectWorker = res.data;
        });
    },
    methods: {
        async getActivity(){ 
            try{
                const res = await axios.get(`http://localhost:3000/activity/${this.$route.params.id}`);
                this.activities = res.data;
            } catch(err){
                console.log(err);
            }
        },
        async addActivity(){
                try{
                let URL = 'http://localhost:3000/activity';
                await axios.post(URL, this.activity).then(() =>{
                    window.location.reload();
                this.activity = {
                    clientID: '',
                    program: '',
                    shortNotes: '',
                    hasUsedServices: '',
                    workerID: '',
                }
                });
            } catch(err) {
                console.log(err);
            }
        },
        //DELETE ONE ACTIVITY
        async deleteActivity(id){
            try{
                if(window.confirm("Confirm delete")){
                    await axios.delete(`http://localhost:3000/activity/${id}`)
                }
                this.getActivity();
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