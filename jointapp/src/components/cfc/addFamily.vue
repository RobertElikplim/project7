<template>
<center>
    <div class="row justify-content-center">
        <div class="col-md-12">
            <hr class="mt-3 mb-4" />
            <h4 class="text-success fw-bold">Add Family To Client</h4>
            <div class="row">
                <div class="form-group col-md-3">
                    <input class="form-control" type="text" placeholder="Last Name" v-model="family.lastName"/>
                </div>

                <div class="form-group col-md-3">
                    <input class="form-control" type="text" placeholder="First Name" v-model="family.firstName"/>
                </div>

                <div class="form-group col-md-3">
                    <select class="form-control" v-model="family.gender">
                        <option disabled value="">Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>

                <div class="form-group col-md-3">
                    <input class="form-control" type="date" placeholder="DOB" v-model="family.dateOfBirth"/>
                </div>
            </div><br>
            <div class="row">
                <div class="form-group col-md-3">
                    <input class="form-control" type="number" placeholder="Age" v-model="family.age"/>
                </div>

                <div class="form-group col-md-3">
                    <div id="v-model-select">
                        <select class="form-control" v-model="family.relationship">
                            <option disabled value="">Select Relationship</option>
                            <option value="Wife">Wife</option>
                            <option value="Husband">Husband</option>
                            <option value="Daughter">Daughter</option>
                            <option value="Son">Son</option>
                            <option value="Other">Other</option>
                        </select>
                    </div> 
                </div>

                <div class="form-group col-md-3">
                    <div id="v-model-select">
                        <select class="form-control" v-model="family.pregnant" v-if="family.relationship === 'Wife' ">
                            <option disabled value="">Is Spouse Pregnant?</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div> 
                </div>
            </div>
            <div>
                <button class="btn btn-info mt-3 mb-3 text-center" @click.prevent="addFamily">Add Family</button>
                <button class="btn btn-info mt-3 mb-3" @click="$router.go(-1)">Go Back</button>
            </div>
        </div>
        <hr class="mt-3 mb-4" />
        <table style="width: 100%" class="table text-center table-hover">
                <thead class="bg-light">
                    <tr has-text-centered>
                        <th>Full Name</th>
                        <th>DOB</th>
                        <th>Age ID</th>
                        <th>Relationship</th>
                        <th>Pregnant</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                <!-- Passing the data  of events information to display into approriate columns-->
                    <tr v-for="family in families" :key="family._id">
                        <td>{{ family.lastName }}</td>
                        <td>{{ dateTime(family.dateOfBirth) }}</td>
                        <td>{{ family.age }}</td>
                        <td>{{ family.relationship }}</td>
                        <td>{{ family.pregnant }}</td>
                        <td class="has-text-centered">
                            <router-link :to="{ name: 'editFamily', params: { id: family._id } }" class="btn btn-info is-small">Edit</router-link>
                            <a class="btn btn-danger is-small " @click.prevent="deleteFam(family._id)">Delete</a>
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
            families: [],
            family: {
                clientID: '',
                lastName: '',
                firstName: '',
                gender: '',
                dateOfBirth: '',
                age: '',
                relationship: '',
                pregnant: '',
            }
        }
    },
    created(){
        this.getFam();
        this.family.clientID = this.$route.params.id;
    },
    methods: {
        async getFam(){ 
            try{
                const res = await axios.get(`http://localhost:3000/family/${this.$route.params.id}`);
                this.families = res.data;
            } catch(err){
                console.log(err);
            }
        },
        async addFamily(){
                try{
                let URL = 'http://localhost:3000/family';
                await axios.post(URL, this.family).then(() =>{
                    window.location.reload()
                this.family = {
                    clientID: '',
                    lastName: '',
                    firstName: '',
                    gender: '',
                    dateOfBirth: '',
                    age: '',
                    relationship: '',
                    pregnant: '',
                }
                });
            } catch(err) {
                console.log(err);
            }
        },

        //DELETE ONE FAMILY
        async deleteFam(id){
            try{
                if(window.confirm("Confirm delete")){
                    await axios.delete(`http://localhost:3000/family/${id}`)
                }
                window.location.reload();
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