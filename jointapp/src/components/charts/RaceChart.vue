<template>
    <center>
        <!-- create canvas template tag and defined the ref-->
        <canvas style="width:100%;max-width:700px" ref="myChart"></canvas>
    </center>
</template>

<script>
// import chart , create label, chart data.
import Chart from "chart.js";
export default {
  props: {
    label: {
      type: Array,
    },
    chartData: {
      type: Array,
    },
  },
  async mounted() {// mounted chart"
    await new Chart(this.$refs.myChart, {
      type: "pie",// define chart as pie chart type
      data: {
        labels: this.label,
        datasets: [
          {
            label: "Total Clients Per Race",
            backgroundColor: ["#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"],
            data: this.chartData,
          },
        ],
      },
      options: {
        scales: {
          
        },
      },
    });
  },
};
</script>