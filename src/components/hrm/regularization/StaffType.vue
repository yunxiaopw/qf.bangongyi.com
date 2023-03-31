<template>
    <div class="staff-type">
        <div class="staff-type-list">
            <div v-for="(item, key, index) in staffCensusList" :key="key" class="box_flex">
                <!-- 间隔条 -->
                <div class="spacing-bar" v-if="key === 'approving' || key === 'not_corrects'"></div>

                <div :class="(key === active ? 'item item-active': 'item')" :target="index === 0 ? 'no_margin_left': 'yes_margin_left'" @click="selectActive(key)">
                    <div class="top">
                        <span>{{ echoText(key) }}</span>
                        <div v-show="key === active" class="icon-check">
                            <el-icon class="el-icon-check"></el-icon>
                        </div>
                    </div>
                    <div class="bottom" :class="redTextClass(key)">{{ item }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { correctsStatistics } from "@/api/hrm/regularization/index";

export default {
  name:"StaffType",
  props: {
    active: {
        type: String,
        default: ''
    }
  },
  data () {
    return {
        keys: [
            {
                key: 'trial',
                value: '试用期',
            },
            {
                key: 'approving',
                value: '转正审批中',
            },
            {
                key: 'failed',
                value: '审批未通过',
            },
            {
                key: 'not_corrects',
                value: '到期未转正',
            },
        ],
        staffCensusList: {},
    }
  },
  created () {
    this.getCorrectsStatistics();
  },
  methods: {
    // 获取员工统计数据
    getCorrectsStatistics() {
        correctsStatistics().then(res => {
            this.staffCensusList = res.data;
        })
    },
    // 回显文字
    echoText(key) {
        let { value } = this.keys.find(item => item.key === key);
        return value
    },
    // 红色字体 类名
    redTextClass(key) {
        return (key === 'failed' || key === 'not_corrects') ? 'red' : ''
    },
    // 切换选中
    selectActive(selectKey) {
        if(this.active === selectKey) {
            this.$emit('update:active', '');
            this.$emit('selectActive');
        } else {
            this.$emit('update:active', selectKey);
            this.$emit('selectActive');
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
.red {
    color: #F52F3E !important;
}
</style>
