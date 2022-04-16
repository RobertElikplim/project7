<template>
    <center>
        <button class="btn btn-info mt-3 mb-3" @click="$router.go(-1)">Go Back</button>
        <div>
            <perEvent/>
        </div>
        <div>
            <perRace/>
        </div>
    </center>
</template>

<script>
import perEvent from "@/summary/perEvent";
import perRace from "@/summary/perRace";

export default{
    components:{
        perRace,
        perEvent
    }
}
</script>