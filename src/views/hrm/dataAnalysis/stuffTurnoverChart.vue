<template>
    <div class="main-box">
        <!-- 页头 -->
        <HeadLine>
            员工流动趋势
            <template #r-content>
                <el-button size="small" @click="kanbanSetupDialog = true">看板设置</el-button>
            </template>
        </HeadLine>

        <!--搜索项-->
        <div class="query-form">
            <el-form :inline="true" :model="queryForm" size="small">
                <el-form-item label="计算范围：" >
                    <el-select  v-model="queryForm.value" placeholder="薪酬所属时段">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-button size="small" type="primary">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
        
        <!-- 图表区 -->
        <div class="charts">
            <div class="chart_item">
                <div class="chart_item_head">
                    <div class="chart_item_head_title">
                        每月平均人数
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
                <Jfreechan :chartId="dialogChartId" :chartOption="chartOption1" />
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="activeDialog = false">导出数据</el-button>
                <el-button size="small" @click="activeDialog = false">导出图片</el-button>
            </div>
        </el-dialog>

        <!-- 看板设置 -->
        <el-dialog
        class="dialog"
        title="看板设置"
        width="480px"
        :visible.sync="kanbanSetupDialog"
        destroy-on-close
        >
            <el-checkbox-group v-model="checkedKanbans">
                <el-checkbox v-for="item in kanbans" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>

            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="kanbanSetupDialog = false">取消</el-button>
                <el-button size="small" type="primary" @click="kanbanSetupDialog = false">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Jfreechan from "@/components/hrm/dataAnalysis/Jfreechan"

export default {
    name: "stuffTurnoverChart",
    components: { Jfreechan },
    data () {
        return {
            queryForm: {
                value: '2022'
            },
            options: [
                {
                    value: '2022',
                    label: '2022'
                },
                {
                    value: '2021',
                    label: '2021'
                },
            ],
            chartOption1: {
                title: {
                    text: 'Stacked Line'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                    saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    name: 'Email',
                    type: 'line',
                    stack: 'Total',
                    data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                    name: 'Union Ads',
                    type: 'line',
                    stack: 'Total',
                    data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                    name: 'Video Ads',
                    type: 'line',
                    stack: 'Total',
                    data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                    name: 'Direct',
                    type: 'line',
                    stack: 'Total',
                    data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                    name: 'Search Engine',
                    type: 'line',
                    stack: 'Total',
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            },
            // 看板设置弹层
            kanbanSetupDialog: false,
            // 放大弹层相关
            activeTitle: '在职人数统计 2022-11',
            activeDialog: false,
            dialogChartId: '',
            kanbans: ['每月平均人数', '每月入职人数', '每月转正人数', '每月离职人数', '入职到岗率', '新员工占比', '转正率', '晋升率', '降级率', '离职率', '主动离职率', '被动离职率'],
            checkedKanbans: ['每月平均人数', '每月入职人数', '每月转正人数', '每月离职人数', '入职到岗率', '新员工占比', '转正率', '晋升率', '降级率', '离职率', '主动离职率', '被动离职率'],
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
.query-form {
  height: 67px;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  .el-form--inline .el-form-item {
    margin-right: 8px;
  }
}

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

/deep/ .el-checkbox-group {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
}
</style>