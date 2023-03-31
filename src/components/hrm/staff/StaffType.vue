<template>
    <div class="staff-type">
        <div class="staff-type-list">
            <div v-for="(item, key, index) in staffCensusList" :key="key" class="box_flex">
                <!-- 间隔条 -->
                <div class="spacing-bar" v-if="key === 'count_on' || key === 'count_full'"></div>

                <div v-if="item > 0" :class="(key === active ? 'item item-active': 'item')" :target="index === 0 ? 'no_margin_left': 'yes_margin_left'" @click="selectActive(key)">
                    <div class="top">
                        <span>{{ echoText(key) }}</span>
                        <div v-show="key === active" class="icon-check">
                            <el-icon class="el-icon-check"></el-icon>
                        </div>
                    </div>
                    <div class="bottom">{{ item }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { staffCensus } from "@/api/hrm/staff/index";

export default {
  name:"StaffType",
  props: {},
  data () {
    return {
        keys: [
            {
                key: 'count_normal',
                value: '在职员工',
                status: '-1',
            },
            {
                key: 'count_on',
                value: '已转正',
                status: '0',
            },
            {
                key: 'count_trial',
                value: '试用期',
                status: '1',
            },
            {
                key: 'count_quite',
                value: '已离职',
                status: '3',
            },
            {
                key: 'count_full',
                value: '全职',
                type: '1',
            },
            {
                key: 'count_part',
                value: '兼职',
                type: '2',
            },
            {
                key: 'count_trainee',
                value: '实习',
                type: '3',
            },
            {
                key: 'count_labor_dispatch',
                value: '劳务派遣',
                type: '4',
            },
            {
                key: 'count_labor_outsourcing',
                value: '劳务外包',
                type: '5',
            },
            {
                key: 'count_hourly_labour',
                value: '小时工',
                type: '6',
            },
            {
                key: 'count_temporary_worker',
                value: '临时工',
                type: '7',
            },
        ],
        active: 'count_normal',
        staffCensusList: {},
    }
  },
  created () {
    this.getStaffCensus();
  },
  methods: {
    // 获取员工统计数据
    getStaffCensus() {
        staffCensus().then(res => {
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
        if(selectKey === 'count_normal' && this.active === selectKey) return
        if(this.active === selectKey) {
            this.active = 'count_normal';
            // 默认全部在职员工
            let obj = {
                key: 'status',
                value: '-1'
            };
            this.$emit('selectActive', obj);
        } else {
            this.active = selectKey;
            let obj = this.activeObj(selectKey);
            this.$emit('selectActive', obj);
        }
    },
    // 选中项处理
    activeObj(selectKey) {
        // 默认全部在职员工
        let obj = {
            key: 'status',
            value: '-1'
        };
        this.keys.forEach(item => {
            if(item.key === selectKey) {
                obj.key = item.status ? 'status' : 'type';
                obj.value = item.status ? item.status : item.type;
            }
        })

        return obj
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
</style>
