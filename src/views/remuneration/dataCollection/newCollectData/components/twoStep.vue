<!-- 配置计薪规则 -->
<template>
    <div class="set-salary-container">
        <!-- 表头 -->
        <!-- 表格内容 -->
        <div class="content">
            <div class="first-table">
                <vxe-table show-overflow ref="xTable" min-height="210px" :row-config="{ isHover: true }" :data="tableData"
                    :show-header="true" :key="tableData.id">
                    <vxe-column field="name" title="采集项名称" width="13%" :edit-render="{ type: 'default' }">
                        <template v-slot="scope">
                            <div class="salary-col">
                                <!-- <img class="drag-icon" src="../../../assets/svgs/dragIcon.svg" alt="" /> -->
                                <span>{{ scope.row.name }}</span>
                            </div>
                        </template>
                    </vxe-column>
                    <vxe-column field="desc" title="规则" :formatter="formatterSex" width="20%">
                        <template #default="{ row, rowIndex }">
                            <vxe-button type="text" @click="handleRules()">{{ row.desc }}</vxe-button>
                        </template>
                    </vxe-column>
                    //TODO 默认值需判断是否是手动录入情况，且根据值类型不同展示文本框
                    <vxe-column field="value_type" title="默认值" :formatter="formatterSex" width="10%">
                        <template #default="{ row, rowIndex }">
                            -
                        </template>
                    </vxe-column>

                    <vxe-column width="20%" field="is_require" title="是否必填">
                        <template #default="{ row, rowIndex }">
                            <el-switch v-model="row.is_require" @change="updateRecommendBy(row, '1')" active-color="#1AAC88"
                                inactive-color="#BFBFBF" :disabled="row.id == 10001" :active-value="1" :inactive-value="0">
                            </el-switch>
                        </template>
                    </vxe-column>
                    <vxe-column width="20%" field="is_unique" title="作为唯一标识" show-overflow>
                        <template #default="{ row, rowIndex }">
                            <el-switch v-model="row.is_unique" active-color="#1AAC88" inactive-color="#BFBFBF"
                                @change="updateRecommendBy(row, '2')" :active-value="1" :inactive-value="0">
                            </el-switch>
                        </template>
                    </vxe-column>
                    <vxe-column title="操作" show-overflow>
                        <template #default="{ row, rowIndex }">
                            <vxe-button type="text" @click="handleClick('edit', row)">编辑</vxe-button>
                            <vxe-button type="text" @click="removeEvent(row)">删除</vxe-button>
                            <!-- <vxe-button type="text" @click="removeEvent(row)" :title="温馨提示">删除</vxe-button> -->
                        </template>
                    </vxe-column>
                </vxe-table>
                <SetRuleModal ref="setRuleModalRef" />
                <actionDialog ref="dialogRef"></actionDialog>
            </div>
        </div>
    </div>
</template>
  
<script>
import SetRuleModal from "@/components/remuneration/setpTip/setRuleModal";
import actionDialog from '@/views/remuneration/dataCollection/newCollectData/components/actionDialog.vue'
import { gatherList, itemRequireEdit } from "@/api/remuneration/dataCollection/newCollectData/index.js";
import Vue from "vue";
import VXETable from "vxe-table";
// import editDialog from "@/components/remuneration/editDialog";
import Sortable from "sortablejs";
import { async } from "q";
import { delGatherList } from "@/api/remuneration/dataCollection/newCollectData/index.js";
const state = Vue.observable({
    tableData: [
        {
            id: 10001,
            name: "Test1",
            nickname: "T1",
            role: "Develop",
            sex: "规则设置",
            sex2: ["0"],
            num1: 40,
            value: true,
            address: "Shenzhen",
            date12: "",
            date13: "",
            flag: true,
            flags: false,
        },
        {
            id: 10002,
            name: "Test2",
            nickname: "T2",
            role: "Designer",
            sex: "应发应扣",
            sex2: ["0", "1"],
            num1: 20,
            value: false,
            address: "Guangzhou",
            date12: "",
            date13: "2020-08-20",
            flag: true,
            flags: false,
        },
        {
            id: 10003,
            name: "Test3",
            nickname: "T3",
            role: "Test",
            sex: "从花名册中获取",
            sex2: ["1"],
            num1: 200,
            value: true,
            address: "Shanghai",
            date12: "2020-09-10",
            date13: "",
            flag: false,
            flags: false,
        },
        {
            id: 10004,
            name: "Test4",
            nickname: "T4",
            role: "Designer",
            sex: "每月手动导入",
            sex2: ["1"],
            num1: 30,
            value: false,
            address: "Shenzhen",
            date12: "",
            date13: "2020-12-04",
            flag: true,
            flags: false,
        },
    ],
});
export default {
    name: "twoStep",

    components: { SetRuleModal, actionDialog },
    // props:['id'],
    data() {
        return {
            title: '',//
            rule_id: 2,
            submitLoading: false,
            tableData: [],
            selectRow: null,
            showEdit: false,
            value: true,
            value1: true,
            action: "",
            value21: "",
            addNum: 1,
            id: '',
            flag: false,
            value_type: '',
            type: '',
            data_id: ''
        };
    },
    methods: {
        formatterSex({ cellValue }) {
            let item = this.sexList.find((item) => item.value === cellValue);
            return item ? item.label : "";
        },
        visibleMethod({ data }) {
            return data.flag1 === "Y";
        },
        //   规则设置
        handleRules() {
            this.$refs.setRuleModalRef.showModal();
        },
        async confirm(row) {
            const $table = this.$refs.xTable;
            $table.remove(row);
        },
        async removeEvent(row, value) {
            console.log(row.is_unique)
            if (row.is_unique == 1) {
                this.$message({
                    showClose: true,
                    message: '必填项，不可删除',
                    type: 'warning',
                    duration: 3000,
                });
            } else {
                const type = await VXETable.modal.confirm({ title: '删除所选发薪方案', content: '删除后，此操作无法撤回' })
                const $table = this.$refs.xTable
                if (type === 'confirm') {
                    delGatherList({ id: row.id }).then((res) => {
                    })
                    $table.remove(row)
                }
            }

        },


        // 合并行
        colspanMethod({ _rowIndex, _columnIndex }) {
            if (_rowIndex % 2 === 0) {
                if (_columnIndex === 2) {
                    return { rowspan: 1, colspan: 2 };
                } else if (_columnIndex === 3) {
                    return { rowspan: 0, colspan: 0 };
                }
            }
        },

        async init() {
            await gatherList({ data_id: this.data_id }).then((res) => {
                this.tableData = res.data.reduce((r, item) => r.concat(item), [])
                // this.tableData.reduce((p,r)=>p.concat(r),[]).value_type='1'
                // if(this.tableData.is_readonly==1||this.tableData.is_unique==1){
                //     this.flag=true
                // }
                console.log(res)
            })
            // 根据sortNo升序排列
            state.tableData.sort((a, b) => {
                return a.sortNo - b.sortNo;
            });
        },
        // 拖拽功能
        initSortTable() {
            // 获取 tbody 节点
            const el = document.querySelector(
                ".first-table .vxe-table--body-wrapper tbody"
            );
            const sortable = new Sortable(el, {
                group: 'tables',
                group: {
                    pull: true, //允许拖拽到其他列表
                    put: true,//允许其他列表拖拽放置在此列表
                },
                dataIdAttr: "id",
                animation: 300, // 拖拽延时，效果更好看
                onAdd: function (evt) {
                    console.log(evt)

                },
                onEnd: async (evt) => {
                    // state.tableData.splice(
                    //   evt.newIndex,
                    //   0,
                    //   state.tableData.splice(evt.oldIndex, 1)[0]
                    // );
                    // state.tableData.forEach((item, index) => {
                    //   item.sortNo = index + 1; // 重新给sortNo赋值
                    // });
                    // 接口(param).then((res) => {})
                },
                onAdd: async (evt) => {
                    // console.log(evt)
                }
            });
        },
        handleClick(type, data) {
            // 假设这些是系统id
            const systemId = [10001, 10002, 10003];//姓名账号
            switch (type) {
                case "delete":
                    if (systemId.includes(data.id)) {
                        this.$message.warning("必含项，不可删除；");
                    } else {
                        this.$confirm(
                            "自定义采集项，支持删除；",
                            "删除该自定义采集项吗？",
                            {
                                confirmButtonText: "确定",
                                cancelButtonText: '取消',
                                // callback: (action) => {
                                //   console.log(action);
                                // },
                            }).then(() => {
                                this.removeEvent(row)
                                // this.removeEvent(row)
                                this.$message({
                                    type: 'success',
                                    message: "删除成功！"
                                }).catch(() => {
                                    this.$message({
                                        type: 'info',
                                        message: "已取消删除"
                                    })
                                })
                            })
                    }
                    break;
                case 'edit':

                    this.$refs.dialogRef.handleAction('edit');
                    break;
                case 'update':

                    break;
                default:
                    break;
            }
        },
        addBtn() {
            this.addNum++
        },
        deleteBtn(id) {
            if (id !== 2) {
                this.$message.warning("存在不可删除的项：姓名，账号，不可删除！")
            } else {
                this.$confirm(
                    "删除将一并删除分组内的薪资项及薪资规则。",
                    "确认删除【人事信息】分组吗？",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: '取消',
                        // type: warning,
                        // callback: (action) => {          
                        //   this.addNum--
                        // },
                    }).then(() => {
                        this.addNum--
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
            }
        },
        // 修改唯一标识/必填项
        updateRecommendBy(row, type) {
            console.log(row, 'row')
            itemRequireEdit({ id: row.id, type }).then((res) => {
                this.init()
            })


        }
    },
    mounted() {
        this.init();
        this.$nextTick(() => {
            this.initSortTable();
        });

        this.data_id = this.$route.query.id
    },
    created() {
        // this.init()
        // this.data_id=this.$route.query.id
        this.data_id = this.$route.query.id
        // console.log(id)
    }
};
</script>
  
<style lang="less" scoped>
.set-salary-container {
    width: 100% !important;

    .row-header {
        padding: 14px 26px;
        border: 1px solid #F0F0F0;
        border-bottom: 0;
        display: flex;
        align-items: center;
        background: #FAFAFA;
        margin-top: 14px;
        color: #434343;

        .edit,
        .delete {
            width: 17px;
            height: 17px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            cursor: pointer;
            margin-left: 17px;
        }

        //   .edit {
        //     background-image: url(../../../assets/svgs/edit.svg);

        //     &:hover {
        //       background-image: url(../../../assets/svgs/edit-active.svg);
        //     }
        //   }

        //   .delete {
        //     background-image: url(../../../assets/svgs/delete.svg);

        //     &:hover {
        //       background-image: url(../../../assets/svgs/delete-active.svg);
        //     }
        //   }

        img {
            width: 17px;
            margin-left: 17px;
            cursor: pointer;
        }
    }

    .add-row {
        padding: 14px 26px;
        border: 1px solid #F0F0F0;
        border-top: 0;
        display: flex;
        align-items: center;
        color: #8C8C8C;
        cursor: pointer;

        img {
            width: 17px;
            margin-bottom: 2px;
            margin-right: 4px;
        }
    }

    .salary-col {
        display: flex;
    }

    .drag-icon {
        opacity: 0;
        cursor: pointer;
    }

    /deep/ .vxe-table--render-default .vxe-body--row.row--hover {
        .drag-icon {
            opacity: 1;
        }
    }
}

.vxe-header--column .vxe-resizable.is--line:before {
    width: 0em;
    height: 0%;
    background-color: #d9dddf;
}

.vxe-button:not(.is--disabled),
.el-button--text {
    height: 1.25em;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1aac88;
    line-height: 20px;
}

.vxe-switch.is--on .vxe-switch--button {
    padding-right: 1.7em;
    background-color: #1aac88;
}

.content_header {
    display: flex;
    height: 36px;
    background: #fafafa;
    align-items: center;
}

.content_header span {
    display: inline-block;
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #8c8c8c;
    line-height: 48px;
    text-align: left;
}

.vxe-table--render-default .vxe-cell {
    padding: 0 24px;
}

html {
    font-size: 16px;
}

.vxe-button:not(.is--disabled) {
    height: 2.125em;
}

.vxe-form .vxe-form--item-inner>.align--center {
    text-align: right;
}

.vxe-input:not(.is--disabled).is--active .vxe-input--inner {
    border: 1px solid #1aac88;
}

.vxe-select.is--active:not(.is--filter)>.vxe-input .vxe-input--inner {
    border: 1px solid #1aac88;
}

.vxe-modal--wrapper .vxe-modal--header {
    height: 48px;
    background-color: #ffffff;
}

.add-row .vxe-button {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8C8C8C;
    padding-left: 0;
}

.add-row .vxe-button:hover {
    color: #1aac88;
}

/deep/.el-button:focus {
    color: #FFFFFF;
}

// .c--tooltip .vxe-button--content{
//   font-size: 14px;
// font-family: PingFang-SC-Medium, PingFang-SC;
// font-weight: 500;
// color: #1F1F1F;
// }
</style>
  