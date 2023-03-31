<template>
    <div class="main-box">
        <!-- 页头 -->
        <HeadLine>在职人员统计</HeadLine>
        
        <!-- 图表区 -->
        <div class="charts">
            <div class="chart_item">
                <div class="chart_item_head">
                    <div class="chart_item_head_title">
                        在职人数
                        <el-tooltip class="item" effect="dark" content="这里是计算公式说明" placement="top">
                            <i class="iconfont icon-question"></i>
                        </el-tooltip>
                    </div>
                    <div class="r_icons">
                        <el-tooltip class="item" effect="dark" content="刷新数据" placement="top">
                            <i class="m-r-16 iconfont icon-shuaxin"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="放大" placement="top">
                            <i class="m-r-16 iconfont icon-fullscreen1" @click="dialogAll('chart_1')"></i>
                        </el-tooltip>
                        <el-dropdown>
                            <i class="m-r-16 iconfont icon-upload1"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>导出图片</el-dropdown-item>
                                <el-dropdown-item>导出数据</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <div class="chart">
                    <Jfreechan chartId="chart_1" :chartOption="chartOption1" />
                </div>
            </div>
            <div class="chart_item">
                <div class="chart_item_head">
                    <div class="chart_item_head_title">
                        用工类型分布
                        <el-tooltip class="item" effect="dark" content="这里是计算公式说明" placement="top">
                            <span><el-icon class="el-icon-refresh"></el-icon></span>
                        </el-tooltip>
                    </div>
                    <div class="r_icons">
                        <el-tooltip class="item" effect="dark" content="刷新数据" placement="top">
                            <span class="m-r-16"><el-icon class="el-icon-refresh"></el-icon></span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="放大" placement="top">
                            <span class="m-r-16"><el-icon class="el-icon-rank"></el-icon></span>
                        </el-tooltip>
                        <el-dropdown>
                            <span><el-icon class="el-icon-document"></el-icon></span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>导出图片</el-dropdown-item>
                                <el-dropdown-item>导出数据</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <div class="chart">
                    <Jfreechan chartId="chart_2" :chartOption="chartOption2" />
                </div>
            </div>
            <div class="chart_item">
                <div class="chart_item_head">
                    <div class="chart_item_head_title">年龄分布</div>
                    <div class="r_icons">
                        <span><el-icon class="el-icon-refresh"></el-icon></span>
                        <span><el-icon class="el-icon-rank"></el-icon></span>
                        <span><el-icon class="el-icon-document"></el-icon></span>
                    </div>
                </div>
                <div class="chart">
                    <Jfreechan chartId="chart_3" :chartOption="chartOption3" />
                </div>
            </div>
            <div class="chart_item">
                <div class="chart_item_head">
                    <div class="chart_item_head_title">司龄分布</div>
                    <div class="r_icons">
                        <span><el-icon class="el-icon-refresh"></el-icon></span>
                        <span><el-icon class="el-icon-rank"></el-icon></span>
                        <span><el-icon class="el-icon-document"></el-icon></span>
                    </div>
                </div>
                <div class="chart">
                    <Jfreechan chartId="chart_4" :chartOption="chartOption4" />
                </div>
            </div>
        </div>

        <!-- 放大查看 -->
        <el-dialog
        class="dialog"
        :title="activeTitle"
        width="1080px"
        :visible.sync="activeDialog"
        v-if="activeDialog"
        destroy-on-close
        >
            <div class="content_chart">
                <Jfreechan :chartId="dialogChartId" :chartOption="chartOption3" />
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="activeDialog = false">导出数据</el-button>
                <el-button size="small" @click="activeDialog = false">导出图片</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Jfreechan from "@/components/hrm/dataAnalysis/Jfreechan"

export default {
    name: "activeStaffChart",
    components: { Jfreechan },
    data () {
        return {
            chartOption1: {
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                    type: 'pie',
                    radius: '60%',
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ],
                    
                    }
                ]
            },
            chartOption2: {
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                    type: 'pie',
                    radius: '60%',
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ],
                    
                    }
                ]
            },
            chartOption3: {
                dataset: [
                    {
                    dimensions: ['name', 'age', 'profession', 'score', 'date'],
                    source: [
                        ['Hannah Krause', 41, 'Engineer', 314, '2011-02-12'],
                        ['Zhao Qian', 20, 'Teacher', 351, '2011-03-01'],
                        ['Jasmin Krause ', 52, 'Musician', 287, '2011-02-14'],
                        ['Li Lei', 37, 'Teacher', 219, '2011-02-18'],
                        ['Karle Neumann', 25, 'Engineer', 253, '2011-04-02'],
                        ['Adrian Groß', 19, 'Teacher', '-', '2011-01-16'],
                        ['Mia Neumann', 71, 'Engineer', 165, '2011-03-19'],
                        ['Böhm Fuchs', 36, 'Musician', 318, '2011-02-24'],
                        ['Han Meimei', 67, 'Engineer', 366, '2011-03-12']
                    ]
                    },
                    {
                    transform: {
                        type: 'sort',
                        config: { dimension: 'score', order: 'desc' }
                    }
                    }
                ],
                xAxis: {
                    type: 'category',
                    axisLabel: { interval: 0, rotate: 30 }
                },
                yAxis: {},
                series: {
                    type: 'bar',
                    encode: { x: 'name', y: 'score' },
                    datasetIndex: 1
                }
            },
            chartOption4: {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ]
                    }
                ]
            },
            // 放大弹层相关
            activeTitle: '在职人数统计 2022-11',
            activeDialog: false,
            dialogChartId: '',
        }
    },
    mounted () {
        
    },
    methods: {
        // 放大图表
        dialogAll(id) {
            this.dialogChartId = `${id}_1`;
            this.activeDialog = true;
        }
    },
}
</script>

<style scoped lang="less">
.charts {
    width: 100%;
    padding: 24px;
    display: grid;
    grid-gap: 12px;
    grid-template-columns: repeat(2, 1fr);
    .chart_item {
        height: 342px;
        background: #FFFFFF;
        border-radius: 2px;
        border: 1px solid #F0F0F0;
        .chart_item_head {
            height: 45px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            font-weight: 500;
            color: #141414;
            border: 1px solid #F0F0F0;
            padding: 0 16px;
            .chart_item_head_title {
                i {
                    color: #141414;
                    font-weight: 500;
                    font-size: 18px;
                    cursor: pointer;
                    margin-left: 8px;
                }
            }
            .r_icons {
                i {
                    color: #141414;
                    font-weight: 500;
                    font-size: 18px;
                    cursor: pointer;
                }
                .m-r-16 {
                    margin-right: 16px;
                }
            }
        }
        .chart {
            height: 295px;
            background: #fff;
        }
    }
}

// 弹层样式
.dialog {
  /deep/.el-dialog__header {
    height: 48px;
    padding: 12px 24px 12px;
    border-bottom: 1px solid #f0f0f0;
    .el-dialog__title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
    }
    .el-dialog__headerbtn {
      top: 12px;
    }
  }
  /deep/.el-dialog__body {
    padding: 24px;
  }
  /deep/.el-dialog__footer {
    height: 52px;
    border-top: 1px solid #f0f0f0;
    padding: 10px 24px;
  }
}

.content_chart {
    height: 500px;
}
</style>