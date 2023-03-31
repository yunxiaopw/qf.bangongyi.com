<template>
   <div class="main-box">
        <div class="content_box">
            <!-- 左半 -->
            <div class="content_box_left">
                <div class="l_1 content_item">
                    <div class="content_item_head"><span class="left">待办事项</span></div>
                    <div class="agenda_all">
                        <div class="agenda_item" v-for="(item, index) in 4" :key="index">
                            <div class="title">入职资料待审核</div>
                            <div class="num">64</div>
                        </div>
                    </div>
                </div>
                <div class="l_2 content_item">
                    <div class="content_item_head"><span class="left">快捷入口</span></div>
                    <div class="expressEntrance_all">
                        <div class="expressEntrance">
                            <img src="../../../assets/images/expressEntrance_1.png">
                            <div class="text">办理入职</div>
                        </div>
                        <div class="expressEntrance">
                            <img src="../../../assets/images/expressEntrance_2.png">
                            <div class="text">办理转正</div>
                        </div>
                        <div class="expressEntrance">
                            <img src="../../../assets/images/expressEntrance_3.png">
                            <div class="text">办理异动</div>
                        </div>
                        <div class="expressEntrance">
                            <img src="../../../assets/images/expressEntrance_4.png">
                            <div class="text">办理离职</div>
                        </div>
                        <div class="expressEntrance">
                            <img src="../../../assets/images/expressEntrance_5.png">
                            <div class="text">人才记录</div>
                        </div>
                        <div class="expressEntrance">
                            <img src="../../../assets/images/expressEntrance_6.png">
                            <div class="text">组织架构图</div>
                        </div>
                    </div>
                </div>
                <div class="l_3 content_item">
                    <div class="content_item_head"><span class="left">人事概况</span></div>
                    <div class="hrm_all">
                        <div class="hrm_all_left">
                            <div class="title">在职</div>
                            <div class="num">23480</div>
                        </div>
                        <div class="hrm_all_right">
                            <div class="hrm_item" v-for="(item, index) in 8" :key="index">
                                <div class="title">全职</div>
                                <div class="num">19029</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="l_4 content_item">
                    <div class="on_board_cycle_all">
                        <div class="on_board_cycle_1 on_board_cycle">
                            <div class="top">
                                <div class="title">待入职</div>
                                <img src="../../../assets/images/on_board_cycle_1.png">
                            </div>
                            <div class="num">64</div>
                        </div>
                        <el-icon class="el-icon-arrow-right"></el-icon>
                        <div class="on_board_cycle_2 on_board_cycle">
                            <div class="top">
                                <div class="title">试用期</div>
                                <img src="../../../assets/images/on_board_cycle_2.png">
                            </div>
                            <div class="num">192</div>
                        </div>
                        <el-icon class="el-icon-arrow-right"></el-icon>
                        <div class="on_board_cycle_3 on_board_cycle">
                            <div class="top">
                                <div class="title">已转正</div>
                                <img src="../../../assets/images/on_board_cycle_3.png">
                            </div>
                            <div class="num">18290</div>
                        </div>
                        <el-icon class="el-icon-arrow-right"></el-icon>
                        <div class="on_board_cycle_4 on_board_cycle">
                            <div class="top">
                                <div class="title">待离职</div>
                                <img src="../../../assets/images/on_board_cycle_4.png">
                            </div>
                            <div class="num">28</div>
                        </div>
                        <el-icon class="el-icon-arrow-right"></el-icon>
                        <div class="on_board_cycle_5 on_board_cycle">
                            <div class="top">
                                <div class="title">已离职</div>
                                <img src="../../../assets/images/on_board_cycle_5.png">
                            </div>
                            <div class="num">120</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 右半 -->
            <div class="content_box_right">
                <div class="r_1 content_item">
                    <div class="social_subsidies_all">
                        <div class="asocial_subsidies_item" v-for="(item, index) in 2" :key="index">
                            <div class="title">本月社保/公积金增员</div>
                            <div class="num">64</div>
                        </div>
                    </div>
                </div>
                <div class="r_2 content_item">
                    <div class="content_item_head">
                        <span class="left">个人备忘录</span>
                        <div class="right" v-show="edit">
                            <span @click="edit = false">取消</span>
                            <span @click="setTextarea">保存</span>
                        </div>
                    </div>
                    <div class="textarea_box">
                        <el-input
                        type="textarea"
                        :autosize="{ minRows: 5, maxRows: 5}"
                        placeholder="仅自己可见"
                        v-model="textarea"
                        @focus="edit = true">
                        </el-input>
                    </div>
                </div>
                <div class="r_3 content_item">
                    <div class="risk_head">
                        <img src="../../../assets/images/risk_warning_1.png">
                        <span>风险提示</span>
                    </div>
                    <div class="risk_warning_all">
                        <div class="risk_warning_item" v-for="(item, index) in 4" :key="index">
                            <div class="title">组织缺少负责人</div>
                            <div class="num">10</div>
                        </div>
                    </div>
                </div>
                <div class="r_4 content_item">
                    <div class="content_item_head"><span class="left">人事提醒</span></div>
                    <div class="hrm_warning_all">
                        <div class="hrm_warning_item" v-for="(item, index) in 2" :key="index">
                            <div class="title">生日(今天)</div>
                            <div class="num">10</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template> 

<script>
export default {
   name: 'HRBench',
   data() {
     return {
        // 个人备忘录
       textarea: "",
       edit: false,
     }
   },
   computed: {
     
   },
   watch: {
     
   },
   created() {
     
   },
   methods: {
    // 保存个人备忘录
     setTextarea() {
        this.edit = false;
        console.log(this.textarea, '保存个人备忘录');
     }
   }
};
</script>

<style lang='less' scoped>
.content_box {
    width: 100%;
    height: 100%;
    background: #F5F5F5;
    padding: 24px;
    display: flex;
    // 左半
    .content_box_left {
        width: 68%;
        min-width: 742px;
        margin-right: 16px;
        // 待办事项
        .agenda_all {
            padding-top: 16px;
            display: flex;
            .agenda_item {
                flex-grow: 1;
                padding: 8px 12px;
                border-radius: 4px;
                cursor: pointer;
                .title {
                    font-size: 12px;
                    font-weight: 400;
                    color: #595959;
                }
                .num {
                    font-size: 28px;
                    font-family: DIN-Medium, DIN;
                    font-weight: 500;
                    color: #1F1F1F;
                }
            }
            .agenda_item:hover{
                background: #F3FBF9;
                .title, .num{
                    color: #1AAC88;
                }
            }
            .agenda_item+.agenda_item {
                margin-left: 16px;
            }
        }
        // 快捷入口
        .expressEntrance_all {
            padding-top: 16px;
            display: flex;
            .expressEntrance {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;
                img {
                    width: 48px;
                    height: 48px;
                    margin-bottom: 8px;
                }
                .text {
                    font-size: 12px;
                    font-weight: 400;
                    color: #595959;
                }
            }
        }
        // 人事概况
        .hrm_all {
            display: flex;
            align-items: center;
            padding-top: 16px;
            .hrm_all_left {
                flex-grow: 1;
                padding: 8px 12px;
                border-radius: 4px;
                margin-right: 16px;
                cursor: pointer;
                .title {
                    font-size: 12px;
                    font-weight: 400;
                    color: #595959;
                }
                .num {
                    font-size: 28px;
                    font-family: DIN-Medium, DIN;
                    font-weight: 500;
                    color: #1F1F1F;
                }
            }
            .hrm_all_left:hover{
                background: #F3FBF9;
                .title, .num{
                    color: #1AAC88;
                }
            }
            .hrm_all_right {
                flex-grow: 4;
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                grid-gap: 16px;
                .hrm_item {
                    padding: 8px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    .title {
                        font-size: 12px;
                        font-weight: 400;
                        color: #595959;
                    }
                    .num {
                        font-size: 28px;
                        font-family: DIN-Medium, DIN;
                        font-weight: 500;
                        color: #1F1F1F;
                    }
                }
                .hrm_item:hover{
                    background: #F3FBF9;
                    .title, .num{
                        color: #1AAC88;
                    }
                }
            }
        }
        // 在职周期
        .on_board_cycle_all {
            padding: 8px 0;
            display: grid;
            grid-template-columns: 1fr 40px 1fr 40px 1fr 40px 1fr 40px 1fr;
            align-items: center;
            justify-items: center;
            .on_board_cycle {
                width: 100%;
                padding: 8px 12px;
                border-radius: 4px;
                cursor: pointer;
                .top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    img {
                        width: 18px;
                        height: 18px;
                    }
                    .title {
                        font-size: 12px;
                        font-weight: 400;
                    }
                }
                .num {
                    font-size: 28px;
                    font-family: DIN-Medium, DIN;
                    font-weight: 500;
                }
            }
            .on_board_cycle_1, .on_board_cycle_2 {
                background: linear-gradient(180deg, rgba(44,104,255,0.07) 0%, rgba(255,255,255,0) 100%);
                .title, .num {
                    color: #2F6AFF;
                }
            }
            .on_board_cycle_3 {
                background: linear-gradient(180deg, rgba(26,172,136,0.09) 0%, rgba(255,255,255,0) 100%);
                .title, .num {
                    color: #1ED09D;
                }
            }
            .on_board_cycle_4 {
                background: linear-gradient(180deg, rgba(237,164,13,0.08) 0%, rgba(255,255,255,0) 100%);
                .title, .num {
                    color: #FF9C00;
                }
            }
            .on_board_cycle_5 {
                background: linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(255,255,255,0) 100%);
                .title, .num {
                    color: #595959;
                }
            }
        }
    }
    // 右半
    .content_box_right {
        width: 32%;
        min-width: 348px;
        // 社保/公积金
        .social_subsidies_all {
            display: grid;
            grid-gap: 16px;
            grid-template-columns: repeat(2, 1fr);
            .asocial_subsidies_item {
                padding: 8px 12px;
                border-radius: 4px;
                cursor: pointer;
                .title {
                    font-size: 12px;
                    font-weight: 400;
                    color: #595959;
                }
                .num {
                    font-size: 28px;
                    font-family: DIN-Medium, DIN;
                    font-weight: 500;
                    color: #1F1F1F;
                }
            }
            .asocial_subsidies_item:hover{
                background: #F3FBF9;
                .title, .num{
                    color: #1AAC88;
                }
            }
        }
        // 个人备忘录
        .textarea_box {
            margin-top: 8px;
        }
        // 风险提示
        .risk_head {
            display: flex;
            align-items: center;
            padding-left: 8px;
            img {
                width: 16px;
                height: 16px;
            }
            span {
                margin-left: 6px;
                font-size: 16px;
                font-weight: 500;
                color: #1D2331;
            }
        }
        .risk_warning_all {
            padding-top: 16px;
            display: grid;
            grid-gap: 16px;
            grid-template-columns: repeat(2, 1fr);
            .risk_warning_item {
                padding: 8px 12px;
                border-radius: 4px;
                cursor: pointer;
                .title {
                    font-size: 12px;
                    font-weight: 400;
                    color: #595959;
                }
                .num {
                    font-size: 28px;
                    font-family: DIN-Medium, DIN;
                    font-weight: 500;
                    color: #1F1F1F;
                }
            }
            .risk_warning_item:hover{
                background: #F3FBF9;
                .title, .num{
                    color: #1AAC88;
                }
            }
        }
        // 人事提示
        .hrm_warning_all {
            padding-top: 16px;
            display: grid;
            grid-gap: 16px;
            grid-template-columns: repeat(2, 1fr);
            .hrm_warning_item {
                padding: 8px 12px;
                border-radius: 4px;
                cursor: pointer;
                .title {
                    font-size: 12px;
                    font-weight: 400;
                    color: #595959;
                }
                .num {
                    font-size: 28px;
                    font-family: DIN-Medium, DIN;
                    font-weight: 500;
                    color: #1F1F1F;
                }
            }
            .hrm_warning_item:hover{
                background: #F3FBF9;
                .title, .num{
                    color: #1AAC88;
                }
            }
        }
    }
    .content_item {
        background: #FFFFFF;
        border-radius: 4px;
        padding: 16px;
    }
    .l_1, .l_2, .l_3, .r_1, .r_2, .r_3 {
        margin-bottom: 16px;
    }
    // 内部通用标题
    .content_item_head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        padding-left: 4px;
        .left {
            font-size: 16px;
            font-weight: 500;
            color: #1D2331;
            margin-left: 6px;
        }
        .right {
            span {
                cursor: pointer;
                font-size: 14px;
                font-weight: 400;
                color: #1AAC88;
            }
            span+span {
                margin-left: 16px;
            }
        }
    }
    .content_item_head::before {
        content: "";
        display: inline-block;
        position: absolute;
        width: 2px;
        height: 16px;
        background: #1AAC88;
        border-radius: 2px 2px 0px 0px;
        top: 50%;
        left: 4;
        transform: translateY(-50%);
    }
    .l_1 {
        height: 146px;
    }
    .r_1 {
        height: 106px;
    }
    .l_2 {
        height: 162px;
    }
    .r_2 {
        height: 186px;
    }
    .l_3 {
        height: 236px;
    }
    .r_3 {
        height: 236px;
    }
    .l_4 {
        height: 130px;
    }
    .r_4 {
        height: 146px;
    }
}
</style>