<template>
    <div class="row justify-content-center">
        <div class="col-md-9">
            <hr class="mt-3 mb-4" />
            <h4 class="text-success fw-bold">GENERAL INFO</h4>
            <form @submit.prevent="handleUpdate">
                <div class="row">
                    <div class="form-group col-md-3">
                        <input class="form-control" type="text" placeholder="First Name" v-model="client.firstName" required/>
                    </div>
                
                    <div class="form-group col-md-3">
                        <input class="form-control" type="text" placeholder="Middle Name" v-model="client.middleName"/>
                    </div>

                    <div class="form-group col-md-3">
                        <input class="form-control" type="text" placeholder="Last Name" v-model="client.lastName" required/>
                    </div>

                    <div class="form-group col-md-3">
                        <div id="v-model-select">
                            <select class="form-control" v-model="client.gender">
                                <option disabled value="">Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div> 
                    </div>
                </div><br>

                <div class="row">
                    <div class="form-group col-md-3">
                        <input class="form-control" type="tel" placeholder="XXX-XXX-XXXX" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" aria-describedby="phoneHelpBlock" v-model="client.phoneNumber" required/>
                        <small class="form-text text-muted">
                            Phone - 10 digits with dashes.
                        </small>
                    </div>

                    <div class="form-group col-md-3">
                        <input class="form-control" type="Date" placeholder="Date of Birth" v-model="client.dateOfBirth" required disabled/>
                        <small class="form-text text-muted">
                            Date of Birth
                        </small>
                    </div>

                    <div class="form-group col-md-3">
                        <input class="form-control" type="text" placeholder="XXXXX" pattern="[0-9]{5}" v-model="client.zipCode" required/>
                        <small class="form-text text-muted">
                            Zip Code
                        </small>
                    </div>
                        <div class="form-group col-md-3">
                        <input class="form-control" type="text" placeholder="XXX-XX-XXXX" pattern="[0-9]{3}-[0-9]{2}-[0-9]{4}" v-model="client.socialSecurityNumber" required/>
                        <small class="form-text text-muted">
                            Social Security Number
                        </small>
                    </div>
                </div><br>

                <div class="row">
                    <div class="form-group col-md-3">
                        <div id="v-model-select">
                            <select class="form-control" v-model="client.raceEthnicity">
                                <option disabled value="">Select Ethnicity</option>
                                <option>Asian</option>
                                <option>Black or African American</option>
                                <option>Hispanic</option>
                                <option>Native American/Alaskan </option>
                                <option>Caucasian</option>
                                <option>Multiracial</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group col-md-3">
                        <div id="v-model-select">
                            <select class="form-control" v-model="client.education">
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
                        <input class="form-control" type="text" placeholder="Drivers License #" v-model="client.driverLicense"/>
                    </div>

                    <div class="form-group col-md-3" v-if="client.driverLicense === '' ">
                        <input class="form-control" type="text" placeholder="Other Card #" v-model="client.otherDoc"/>
                    </div>
                </div><br>

                <div class="row">
                    <div class="form-group col-md-3">
                        <div id="v-model-select">
                            <select class="form-control" v-model="client.marriageStatus">
                                <option disabled value="">Marriage Status</option>
                                <option>Single</option>
                                <option>Married</option>
                                <option>Divorced/Separated</option>
                            </select>
                        </div> 
                    </div>

                    <div class="form-group col-md-3">
                        <input class="form-control" type="Number" placeholder="# of Children" v-model="client.numChildren" required/>
                    </div>

                    <div class="form-group col-md-3">
                        <div id="v-model-select">
                            <select class="form-control" v-model="client.isVeteran">
                                <option disabled value="">Veteran</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div> 
                    </div>

                    <div class="form-group col-md-3">
                        <div id="v-model-select">
                            <select class="form-control" v-model="client.isNeedSupport">
                                <option disabled value="">Needs Support</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div> 
                    </div>
                </div><br>

                <div class="row">
                    <div class="form-group col-md-3">
                        <input class="form-control" type="Number" placeholder="Seniors in Household" v-model="client.is65OrOlder" required/>
                    </div>

                    <div class="form-group col-md-3">
                        <div id="v-model-select">
                            <select class="form-control" v-model="client.approached" disabled>
                                <option disabled value="">Approached By</option>
                                <option>Bread of Life</option>
                                <option>Community Family Centers</option>
                            </select>
                        </div> 
                    </div>
                </div>

                <hr class="mt-3 mb-4" />
                <h4 class="text-success fw-bold">EMPLOYMENT INFO</h4>
                <div class="row">
                    <div class="form-group col-md-4">
                        <div id="v-model-select">
                            <select class="form-control" v-model="client.job.employmentStatus">
                                <option disabled value="">Are you Employed?</option>
                                <option default="Yes">Yes</option>
                                <option>No</option>
                            </select>
                        </div> 
                    </div>
                    <div class="form-group col-md-4" v-if="client.job.employmentStatus === 'Yes' ">
                        <input class="form-control" type="text" placeholder="Employer" v-model="client.job.employer" required/>
                    </div>
                    <div class="form-group col-md-4" v-if="client.job.employmentStatus === 'Yes' ">
                        <input class="form-control" type="text" placeholder="Role" v-model="client.job.role" required/>
                    </div>
                </div>

                <center>
                    <div>
                        <button type="submit" class="btn btn-success mt-4 text-center">Update Client</button>
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
                firstName: '',
                middleName: '',
                lastName: '',
                phoneNumber: '',
                dateOfBirth: '',
                zipCode: '',
                socialSecurityNumber: '',
                otherDoc: '',
                gender: '',
                driverLicense: '',
                education: '',
                isNeedSupport: '',
                marriageStatus: '',
                numChildren: '',
                is65OrOlder: '',
                isVeteran: '',
                raceEthnicity: '',
                events: [],
                approached: '',
                job:{
                    employmentStatus: '',
                    employer: '',
                    role: '',
                },
            }
        }
    },
    created(){
            let eventOptions = `http://localhost:3000/event`;
            axios.get(eventOptions).then((res) =>{
                this.selectEvent = res.data;
            });
            this.getClientById();
            this.client.clientID = this.$route.params.id;
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
            axios.put(URL, this.client).then(() =>{
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