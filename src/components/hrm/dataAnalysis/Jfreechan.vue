<template>
   <div class="chart">
        <div :id="chartId" class="chart_box"></div>
   </div>
</template>

<script>
import * as echarts from 'echarts'; 

export default {
   name: 'Jfreechan',
   props: {
    // 图表id
    chartId: {
        type: String,
    },
    // 图表详细配置参数
     chartTypes: {
        type: Object,
        default: () => {
            return {
                series_type: 'bar',
                series_stack: false,
            }
        }
     },
    //  图表 option 数据
     chartOption: {
        type: Object,
        default: () => {
            return {}
        }
     }
   },
   data() {
     return {
       
     }
   },
   computed: {
     
   },
   watch: {
     
   },
   mounted() {
    console.log('触发了');
     this.setCharts();
   },
   methods: {
    // 显示图表
    setCharts() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById(this.chartId));
        // 处理option数据
        let option = this.getOption();
        // 绘制图表
        myChart.setOption(option);
    },
    // 返回处理好的option数据
    getOption() {
        let isNull = Object.keys(this.chartOption).length <= 0;
        if(isNull) return {}

        let option = JSON.parse(JSON.stringify(this.chartOption));
        return option
    },
   }
};
</script>

<style lang='less' scoped>
.chart, .chart_box {
    width: 100%;
    height: 100%;
}
</style>