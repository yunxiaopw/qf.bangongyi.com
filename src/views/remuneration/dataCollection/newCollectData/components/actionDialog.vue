<template>
    <div class="add-data-collect">

        <el-dialog :title.sync="title" :visible.sync="dialogFormVisible" custom-class="add-modal">
            <el-form :model="form" :rules="rules">
                <el-form-item label="名称：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="值类型：" :label-width="formLabelWidth" prop="value_type_name" :disabled="disabledBtn">
                    <el-select v-model="form.value_type_name" placeholder="请选择">
                        <el-option v-for="item in tpyeList" :key="item.value_type" :label="item.value"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <div class="getSelect" v-show="form.region == '单选'">
                    <el-form-item label="选项内容：" :label-width="formLabelWidth">
                        <el-form-item :label="inputList.label" prop="region" v-for="(item) in inputList"
                            :key="item.key" style="margin-bottom:12px;">
                            <el-input v-model="inputList.value"></el-input>
                            <div class="delete" @click="removeDomain(inputList[item])"></div>
                            <!-- <el-button @click.prevent="removeDomain(inputList[item])">删除</el-button> -->
                        </el-form-item>
                    </el-form-item>
                    <el-form-item :label-width="formLabelWidth">
                        <el-button type="text" @click="addDomain()" style="padding-left: 0px !important;top: -22px;"
                            class="addBtn-add">+添加</el-button>
                    </el-form-item>
                </div>
                <div class="getNumSelect" v-show="form.region == '数值'">
                    <el-form-item label="小数保留位数：" :label-width="formLabelWidth">
                        <el-select v-model="form.select_num" placeholder="活动区域">
                            <el-option v-for="item in numList" :label="item" :key="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </div>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleAction('close')">取 消</el-button>
                <el-button type="primary" @click="handleAction('save')">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { gatherItemAction } from "@/api/remuneration/dataCollection/newCollectData/index.js";
export default {
    name: "actionDialog",
    // props: {
    //     title: {
    //         type:String,
    //         default:''
    //     }
    // },
    // provide() {
    //     return {
    //         reload:this.reload
    //     }
    // },
    data() {
        return {
            dialogFormVisible: false,
            form: {
                id:'',
                name: '',
                value_type: '',
                value_type_name: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                num: 1,
                select_num: 2,
                region:''
            },
            rules: {
                num: [
                    { required: true, message: '输入数字或小数点进行填写', trigger: 'blur' },
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],

            },
            tpyeList: [
                { value_type: 1, value: '数值' },
                { value_type: 2, value: '文本' },
                { value_type: 3, value: '日期' },
                { value_type: 4, value: '单选' },
            ],
            formLabelWidth: '120px',
            value1: '',
            value2: '',
            title: '',
            inputs: '',
            errno: 0,
            inputList: [
                { value: '' },
                { value: '' },
            ],
            numList: [0, 1, 2, 3, 4],
            disabledBtn: false,
        }
    },
    methods: {
        handleAction(action) {
            switch (action) {
                // 新建采集项
                case 'add':
                    this.title = "新建采集项",
                        this.form = {
                            name: '',
                            region: '',
                            delivery: false,
                            type: [],
                            resource: '',
                            desc: '',
                            num: 1,
                            select_num: 2
                        },
                        this.dialogFormVisible = true;
                    this.disabledBtn = false
                    break;
                case 'edit':
                    this.title = "编辑采集项";
                    this.form = {
                        name: '',
                        region: '',
                        delivery: false,
                        type: [],
                        resource: '',
                        desc: '',
                        num: 1,
                        select_num: 2
                    },

                        this.dialogFormVisible = true;
                    this.disabledBtn = true;

                    break;
                case "save":
                    //TODO 需要校验是否重复录入
                    this.$nextTick(() => {
                        this.$emit('form', this.form)
                        this.handleSave()
                    //TODO 保存成功刷新
                        // if (this.errno == 0) {
                        //     this.dialogFormVisible = false
                        //     // window.location.reload()

                        // }
                    })
                    break;
                case 'close':
                    this.dialogFormVisible = false;
                    break;
                case 'continueAdd':
                    console.log('1111继续新增')
                    break;
                default:
                    break;
            }
        },
        removeDomain(item) {
            //FIXME  方法需要优化 数组转对象
            console.log("删除把")
            item = this.inputList.map(item => item)
            var keys = Object.keys(item)
            if (keys[item] !== 0) {
                this.inputList.splice(keys[item], 1)
            }
            //     console.log(keys)
            // var index = this.inputList.indexOf(item.value)
            // debugger
            // if (index !== -1) {
            //     this.inputList.splice(index, 1)

            // }
        },
        addDomain() {
            this.inputList.push({
                value: '',
                key: Date.now()
            });
        },
        async handleSave() {
            await gatherItemAction({ name: this.form.name, data_id: 3, value_type:2}).then((res) => {
                this.errno = res.errno
            }).catch((err) => { console.log(err, "error") })
        }
    }
}
</script>
<style  lang="less" scoped>
.add-modal {
    width: 480px;
    height: auto;
    background: #FFFFFF;
    box-shadow: 0px 12px 48px 16px rgba(0, 0, 0, 0.03), 0px 9px 28px 0px rgba(0, 0, 0, 0.05), 0px 6px 16px -8px rgba(0, 0, 0, 0.08);
    border-radius: 2px;


    .el-dialog__header {
        width: 480px;
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


        .el-select {
            width: 220px;
        }

        .el-input {
            width: 220px;
        }

        .delete {
            width: 17px;
            height: 17px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            cursor: pointer;
            margin-left: 17px;
            display: inline-block;
        }

        .delete {
            background-image: url(../../../../../assets/svgs/delete.svg);

            &:hover {
                background-image: url(../../../../../assets/svgs/delete-active.svg);
            }
        }

        .el-form-item {
            margin-bottom: 16px;
        }

    }

    .el-button {
        border-radius: 2px;
        height: 32px;
        padding: 0 auto;
    }

    .el-dialog__footer {
        border-top: 1px solid #F0F0F0;
        height: 52px;
    }
}
</style>