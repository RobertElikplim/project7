<template>
    <section>
        <div>
            <div class="columns">
                <div class="column">
                    <h3>TOTAL APPEARANCE PER EVENT</h3>
                        <div>
                        <BarChart v-if="!loading && !error" :label="labels" :chart-data="served"></BarChart>
                            <div class="mt-40" v-if="loading">
                                <p class=" text-6xl font-bold text-center text-gray-500 animate-pulse">Loading...</p>
                            </div>
                            <div class="mt-12 bg-red-50" v-if="error">
                                <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">{{ error.title }}</h3>
                                <p class="p-4 text-lg font-bold text-red-900">{{ error.message }}</p>
                            </div>
                        <br>
                        <br>
                        </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import BarChart from "@/components/charts/EventsChart";
export default{
    components: {
        BarChart,
    },
    data(){
        return{
            labels: [],
            served: [],
            loading: false,
            error: null,
        };
    },
    methods: {
        async fetchData(){
           try {
        this.error = null;
        this.loading = true;
        const url = `http://localhost:3000/client/perevent`;
        const response = await axios.get(url);
        //"re-organizing" - mapping json from the response
        this.labels = response.data.map((item) => item.eventName);
        this.served = response.data.map((item) => item.count);
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: "Server Response",
            message: err.message,
          };
        } else if (err.request) {
          // client never received a response, or request never left
          this.error = {
            title: "Unable to Reach Server",
            message: err.message,
          };
        } else {
          // There's probably an error in your code
          this.error = {
            title: "Application Error",
            message: err.message,
          };
        }
      }
      this.loading = false;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>