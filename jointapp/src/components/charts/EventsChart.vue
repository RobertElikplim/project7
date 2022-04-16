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
      type: "bar",// define chart as bar chart type
      data: {
        labels: this.label,
        datasets: [
          {
            label: "Total Clients Per Event",
            backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"],
            data: this.chartData,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                precision:0,
              },
            },
          ],
        },
      },
    });
  },
};
</script>