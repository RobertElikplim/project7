<template>
    <center>
        <button class="btn btn-info mt-3 mb-3" @click="$router.go(-1)">Go Back</button>
        <div>
            <perProgram/>
        </div>
        <div>
            <perRace/>
        </div>
    </center>
</template>

<script>
import perProgram from "@/summary/perProgram";
import perRace from "@/summary/perRace";

export default{
    components:{
        perRace,
        perProgram
    }
}
</script>