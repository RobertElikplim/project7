<template>
    <div class="row justify-content-center">
        <div class="col-md-9">
            <div class="form-group col-md-5">
                <div id="v-model-select">
                    <select class="form-control" v-model="firstTime">
                        <option disabled value="">Have you used our services in the past?</option>
                        <option>Yes</option>
                        <option>No</option>
                        <option>Not Sure</option>
                    </select>
                </div> 
            </div><br>
        
            <div class="col-md-9">
                <div v-if="firstTime !== 'No' ">
                    <input placeholder="Search by typing phone#" type="text" class="form-control" v-model="client.phoneNumber" required>
                </div><br>
                <router-link :to="{name: 'registerEvent', params: { phoneNumber: client.phoneNumber }}"  class="btn btn-info">Search</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default{
    data(){
        return{
            firstTime: '',
            client: {
                phoneNumber: '',
            }
        }
    },
    created(){
        this.clientByPhone();
    },
    methods: {
        async clientByPhone(){
            try{
                const res = await axios.get(`http://localhost:3000/client/phone/${this.$route.params.phoneNumber}`);
                this.clients = res.data;
            } catch(err){
                console.log(err);
            }
        },
    }
}
</script>