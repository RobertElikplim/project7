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
                <button class="btn btn-info mt-3 mb-3 text-center" @click.prevent="editFamily">Update Family</button>
                <button class="btn btn-info mt-3 mb-3" @click="$router.go(-1)">Go Back</button>
            </div>
        </div>
        <hr class="mt-3 mb-4" />
    </div>
</center>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default{
    data(){
        return{
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
        this.getFamById();
    },
    methods: {
        async getFamById(){ 
            try{
                const res = await axios.get(`http://localhost:3000/family/one/${this.$route.params.id}`);
                this.family = res.data;
            } catch(err){
                console.log(err);
            }
        },
        async editFamily(){
                try{
                let URL = `http://localhost:3000/family/${this.$route.params.id}`;
                await axios.put(URL, this.family).then(() =>{
                    history.back(1)
                });
            } catch(err) {
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