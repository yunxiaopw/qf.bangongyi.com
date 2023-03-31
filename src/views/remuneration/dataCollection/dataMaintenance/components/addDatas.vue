<template>
    <div class="add-data-collect">

        <el-dialog title="新增数据" :visible.sync="dialogFormVisible" custom-class="add-modal">
            <el-form :model="form" :rules="rules">
                <div class="el_form_item" v-for="(item, index) in elFormList" :key="index">
                    <el-form-item :label="`${item.name}：`" :id="item.id" :label-width="formLabelWidth">

                        <el-input v-if="item.value_type == 2" v-model="elFormList[index].value_json"></el-input>
                        <vxe-input v-else-if="item.value_type == 1" v-model="elFormList[index].value_json" placeholder=""
                            type="float" step="1.0" clearable min="0" max="99999999.9999"></vxe-input>
                        <el-date-picker v-else-if="item.value_type == 3 && item.name == '薪资所属期'"
                            v-model="elFormList[index].value_json" type="month" placeholder="选择日期"  value-format="yyyy-MM">
                        </el-date-picker>
                        <el-date-picker v-else-if="item.value_type == 3 && item.name !== '薪资所属期'"
                            v-model="elFormList[index].value_json" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd">
                        </el-date-picker>
                        <el-select v-else v-model="value2">
                            <el-option v-for="(item, index ) in elFormList[index].value_json" :label="item" :key="index"
                                placeholder="请选择" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleAction('continueAdd')">继续新增</el-button>
                <el-button @click="handleAction('close')">取 消</el-button>
                <el-button type="primary" @click="handleAction('save')">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getAddsData, getUserInfo, addDataList } from '@/api/remuneration/dataCollection/dataMaintenance/index.js'
import { get } from 'sortablejs';
export default {
    name: "addDatas",
    data() {
        return {
            dialogFormVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                num: 1
            },
            rules: {
                num: [
                    { required: true, message: '输入数字或小数点进行填写', trigger: 'blur' },
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'blur' }
                ],
                numId: [
                    { required: true, message: '必填项', trigger: 'blur' },
                ]

            },
            formLabelWidth: '120px',
            value1: '',
            value2: '',
            num: '',
            elFormList: [],
            selectList: [],
            data_id: '',
        }
    },
    methods: {
        handleAction(action, data) {
            switch (action) {
                case 'open':
                    this.dialogFormVisible = true;
                    this.init()
                    break;
                case "save":
                    //TODO 需要校验是否重复录入
                    this.$nextTick(() => {
                        // this.dialogFormVisible = false
                        var data = []
                        this.elFormList.find((item, index) => {
                            var value_json = item.value_json
                            var id = item.id
                            var obj = {}
                            Object.defineProperties(obj, {
                                item_id: {
                                    enumerable:true,
                                    value: id,

                                },
                                value: {
                                    enumerable:true,
                                    writable:true,
                                    value: value_json,
                                    
                                }
                            })
                            if(obj.item_id==5){
                                obj.value=this.value2
                            }
                            data.push(obj)
                        })
                        console.log(data)
                        addDataList({ data_id: 2, staff_id:5576552, data_list: data,source_date:'2023-03' }).then((res) => {
                            
                        }).catch(() => {

                        })



                    })
                    break;
                case 'close':
                    //FIXME 数据清除
                    this.dialogFormVisible = false;
                    break;
                case 'continueAdd':
                    console.log('1111继续新增')
                    break;
                default:
                    break;
            }
        },
        async init() {
            await getAddsData({ id: 2 }).then((res) => {
                this.elFormList = res.data
                // this.data_id=this.$parent.data_id
                // this.selectList=this.elFormList.value_json
                //   console.log(res.data.value_json)
            })
            await getUserInfo({ staff_id: 5576552 }).then((res) => {
                console.log(res)
            })
        },
        // 保存
        async handleSave() {
            await addDataList({ data_id: 2, staff_id: 5576552, }).then((res) => {

            }).catch(() => {

            })


        }
    },
    created() {
        // this.init()
    }
}
</script>

<style  lang="less" scoped>
.add-modal {
    width: 720px;
    height: auto;
    background: #FFFFFF;
    box-shadow: 0px 12px 48px 16px rgba(0, 0, 0, 0.03), 0px 9px 28px 0px rgba(0, 0, 0, 0.05), 0px 6px 16px -8px rgba(0, 0, 0, 0.08);
    border-radius: 2px;

    .el-dialog__header {
        width: auto;
        height: 48px;
        padding: 12px 24px;
        border-bottom: 1px solid #F0F0F0;

        .el-dialog__title {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #000000;
        }

        .el-dialog__headerbtn {
            top: 10px;
        }
    }

    .el-dialog__body {
        padding: 16px 24px;
        padding-left: 20%;

        .el-select {
            width: 300px;
        }

        .el-input {
            width: 300px;
        }

        .numBtn {
            width: 21px;
            border-radius: 0px 2px 0px 0px;
            display: inline-block;

            .el-input {
                width: 67px;
                float: left;

                .el-input__inner {
                    border-radius: 2px;
                }
            }

            // .num-button {
            //     .el-form-item__content{
            //         line-height: 34px;
            //     }
            //     li {
            //         height: 17px;
            //         display: inline-block;
            //         display: flex;
            //         flex-direction: column;
            //     }

            //     .el-button {
            //         width: 21px;
            //         height: 17px;
            //         border-radius: 2px;
            //         padding: 0px 2px;
            //         display: inline-block;
            //     }
            // }

        }
    }

    .el-dialog__footer {
        border-top: 1px solid #F0F0F0;
        height: 62px;
    }

    /deep/.el-button {
        border-radius: 2px;
        height: 32px;
        padding: 10px 20px;


    }

}
</style>

<style>
.modal-content[data-v-6a04fb0c] .el-dialog__footer {
    height: 66px;
    padding: 11px 20px 30px !important;
}

.v-modal {
    z-index: 2000 !important;
}
</style>


