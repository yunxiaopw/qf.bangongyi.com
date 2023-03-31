<template>
    <div class="staff-type">
        <div class="staff-type-list">
            <div v-for="(item, key, index) in staffCensusList" :key="key" class="box_flex">
                <!-- 间隔条 -->
                <div class="spacing-bar" v-if="key === 'plan_enrty' || key === 'uninvited' || key === 'unemployed'"></div>

                <div :class="(key === active ? 'item item-active': 'item')" :target="index === 0 ? 'no_margin_left': 'yes_margin_left'" @click="selectActive(key)">
                    <div class="top">
                        <span>{{ echoText(key) }}</span>
                        <div v-show="key === active" class="icon-check">
                            <el-icon class="el-icon-check"></el-icon>
                        </div>
                        <div v-show="key !== active" class="icon-check-null"></div>
                    </div>
                    <div class="bottom" v-if="key === 'plan_enrty'">
                        {{ item.plan_num }}/{{ item.employed_num }}
                    </div>
                    <div class="bottom" v-else>{{ item }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
import { inductionStatistics } from "@/api/hrm/entryManagement/index";

export default {
  name:"StaffType",
  props: {
    // 当前选中
    active: {
        type: String,
        default: ''
    },
    freshen: { 
        type: Boolean,
        default: false
    }
  },
  data () {
    return {
        keys: [
            {
                key: 'wait_enrty_num',
                value: '待入职数',
            },
            {
                key: 'plan_enrty',
                value: '今日计划入职办理进度',
            },
            {
                key: 'uninvited',
                value: '未邀请登记',
            },
            {
                key: 'auditing',
                value: '资料待审核',
            },
            {
                key: 'unemployed',
                value: '未如期入职',
            },
        ],
        staffCensusList: {},
    }
  },
  created () {
    this.getStaffCensus();
  },
  watch: {
    freshen(val) {
        if(val) {
            this.getStaffCensus();
            this.$emit('update:freshen', false);
        }
    }
  },
  methods: {
    // 获取员工统计数据
    getStaffCensus() {
        inductionStatistics().then(res => {
            this.staffCensusList = res.data;
        })
    },
    // 回显文字
    echoText(key) {
        let { value } = this.keys.find(item => item.key === key);
        return value
    },
    // 切换选中
    selectActive(selectKey) {
        if(this.active === selectKey) {
            this.$emit('selectActive', {key:''});
        }else{
            this.$emit('selectActive', {key:selectKey});
        }
    },
  },
}
</script>

<style scoped lang="less">
.staff-type {
    width: 100%;
    padding: 12px 24px 16px;
    .box_flex {
        display: flex;
    }
    .staff-type-list {
        width: 100%;
        height: 98px;
        background: #F5F5F5;
        border-radius: 4px;
        overflow: hidden;
        display: flex;
        padding: 12px;
        user-select: none;
        .item, .item-active {
            height: 74px;
            padding: 8px 8px 8px 12px;
            border-radius: 4px;
            background: #fff;
            cursor: pointer;
            .top {
                min-width: 92px;
                white-space: nowrap;
                font-weight: 400;
                font-size: 12px;
                color: #595959;
                display: flex;
                justify-content: space-between;
            }
            .bottom {
                font-size: 28px;
                font-family: DIN-Medium, DIN;
                font-weight: 500;
                color: #1F1F1F;
            }
            .icon-check {
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background: #1AAC88;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 6px;
            }
            .icon-check-null {
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background: #fff;
                color: #fff;
                margin-left: 6px;
            }
        }
        .item {
            border: 1px solid #fff;
        }
        .item-active {
            border: 1px solid #1AAC88;
            .top, .bottom { color: #1AAC88;}
        }
        .item[target=yes_margin_left] {
            margin-left: 12px;
        }
        .spacing-bar {
            width: 1px;
            height: 50px;
            border: 1px solid #D9D9D9;
            margin: 12px 0 0 12px;
        }
    }
    .staff-type-list:hover{
        overflow-x: auto;
    }
}
</style>
