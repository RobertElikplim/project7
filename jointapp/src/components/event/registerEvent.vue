<template>
    <div class="row justify-content-center">
        <div class="col-md-9">
            <hr class="mt-3 mb-4" />
            <h4 class="text-success fw-bold">GENERAL INFO</h4>
                <div class="row">
                    <div class="form-group col-md-3">
                        <input class="form-control" type="text" placeholder="First Name" v-model="client.firstName" required disabled/>
                    </div>
                
                    <div class="form-group col-md-3">
                        <input class="form-control" type="text" placeholder="Middle Name" v-model="client.middleName" disabled/>
                    </div>

                    <div class="form-group col-md-3">
                        <input class="form-control" type="text" placeholder="Last Name" v-model="client.lastName" required disabled/>
                    </div>

                    <div class="form-group col-md-3">
                        <div id="v-model-select">
                            <select class="form-control" v-model="client.gender" disabled>
                                <option disabled value="">Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other/Separated</option>
                            </select>
                        </div> 
                    </div>
                </div><br>

                <div class="row">
                    <div class="form-group col-md-3">
                        <input class="form-control" type="text" placeholder="Phone" v-model="client.phoneNumber" required disabled/>
                    </div>

                    <div class="form-group col-md-3">
                        <input class="form-control" type="date" placeholder="Date of Birth" v-model="client.dateOfBirth" required disabled/>
                    </div>

                    <div class="form-group col-md-3">
                        <input class="form-control" type="text" placeholder="Zip Code" v-model="client.zipCode" required disabled/>
                    </div>
                        <div class="form-group col-md-3">
                        <input class="form-control" type="text" placeholder="SSN" v-model="client.socialSecurityNumber" required disabled/>
                    </div>
                </div><br>

                <div class="row">
                    

                    <div class="form-group col-md-3">
                        <div id="v-model-select">
                            <select class="form-control" v-model="client.education" disabled>
                                <option disabled value="">Highest Education Completed</option>
                                <option>4 yr College</option>
                                <option>2 yr College</option>
                                <option>High SchooL</option>
                                <option>GED</option>
                                <option>Vocational Training</option>
                                <option>Other</option>
                            </select>
                        </div> 
                    </div>

                    <div class="form-group col-md-3">
                        <input class="form-control" type="text" placeholder="Drivers License #" v-model="client.driverLicense" disabled/>
                    </div>

                    <div class="form-group col-md-3" v-if="client.driverLicense === '' ">
                        <input class="form-control" type="text" placeholder="Other Card #" v-model="client.otherDoc" disabled/>
                    </div>
                </div><br>

                <div class="row">
                    <div class="form-group col-md-3">
                        <div id="v-model-select">
                            <select class="form-control" v-model="client.marriageStatus" disabled>
                                <option disabled value="">Marriage Status</option>
                                <option>Single</option>
                                <option>Married</option>
                                <option>Divorced/Separated</option>
                            </select>
                        </div> 
                    </div>

                    <div class="form-group col-md-3">
                        <input class="form-control" type="Number" placeholder="# of Children" v-model="client.numChildren" required disabled/>
                    </div>

                    <div class="form-group col-md-3">
                        <div id="v-model-select">
                            <select class="form-control" v-model="client.isVeteran" disabled>
                                <option disabled value="">Veteran</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div> 
                    </div>

                    <div class="form-group col-md-3">
                        <div id="v-model-select">
                            <select class="form-control" v-model="client.isNeedSupport" disabled>
                                <option disabled value="">Needs Support</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div> 
                    </div>
                </div><br>

                <div class="row">
                    <div class="form-group col-md-3">
                        <input class="form-control" type="Number" placeholder="Seniors in Household" v-model="client.is65OrOlder" required disabled/>
                    </div>

                    <div class="form-group col-md-3">
                        <input class="form-control" type="text" placeholder="" v-model="client.approached" required disabled/>
                    </div>
                </div>

                <hr class="mt-3 mb-4" />
                <h4 class="text-success fw-bold">EMPLOYMENT INFO</h4>
                <div class="row">
                    <div class="form-group col-md-4">
                        <div id="v-model-select">
                            <select class="form-control" v-model="client.job.employmentStatus" disabled>
                                <option disabled value="">Are you Employed?</option>
                                <option default="Yes">Yes</option>
                                <option>No</option>
                            </select>
                        </div> 
                    </div>
                    <div class="form-group col-md-4" v-if="client.job.employmentStatus === 'Yes' ">
                        <input class="form-control" type="text" placeholder="Employer" v-model="client.job.employer" required disabled/>
                    </div>
                    <div class="form-group col-md-4" v-if="client.job.employmentStatus === 'Yes' ">
                        <input class="form-control" type="text" placeholder="Role" v-model="client.job.role" required disabled/>
                    </div>
                </div> 

            <form @submit.prevent="handleUpdate">
                <hr class="mt-3 mb-4" />
                <h4 class="text-success fw-bold">EVENT/ACTIVITY</h4>
                <div class="row">
                    <div class="form-group col-md-3">
                        <select class="form-control" v-model="client.events">
                            <option disabled value="">Which event?</option>
                            <option  v-for="event in selectEvent" :value="event._id" :key="event._id" > {{event.eventName +' on '+ dateTime(event.eventDate)}}</option>
                        </select>
                    </div>
                </div>
                <center>
                    <div>
                        <button type="submit" class="btn btn-success mt-4 text-center">Sign Up For Event Client</button>
                        <button class="btn btn-info mt-4" @click="$router.go(-1)">Go Back</button>
                    </div>
                </center>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default{
    data(){
        return{
            selectEvent: [],
            client: {
                events: '',
            }
        }
    },
    created(){
            let eventOptions = `http://localhost:3000/event`;
            axios.get(eventOptions).then((res) =>{
                this.selectEvent = res.data;
            });
            this.getClientById();
        },
    methods: {
        dateTime(value){
            return moment(value).format('MM-DD-YYYY');
        },
        async getClientById(){
            try{
                const res = await axios.get(`http://localhost:3000/client/one/${this.$route.params.id}`);
                this.client = res.data;
            } catch(err) {
                console.log
            }
        },
        handleUpdate(){
            let URL = `http://localhost:3000/client/${this.$route.params.id}`;
            axios.patch(URL, this.client).then(() =>{
            history.back(1);
            })
        }
    }
}
</script>
<style>
    .btn {
        margin-right: 10px;
    }
</style>