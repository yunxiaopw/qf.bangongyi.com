<template>
    <div class="main-box">
        <!-- 页头 -->
        <HeadLine goback>{{ headerTitle }}设置</HeadLine>

        <!-- 内容区 -->
        <div class="staffing_form">
            <div class="staffing_form_content">
                <!-- 左半 -->
                <div class="staffing_form_content_left">
                    <div class="staffing_form_content_left_top">
                        <div class="staffing_form_content_title">可选字段</div>
                        <div class="staffing_form_content_tabs">
                            <div :class="tabsActiveName === 'dict' ? 'staffing_form_content_tabs_active staffing_form_content_tabs_item' : 'staffing_form_content_tabs_item'" @click="tabsActiveName = 'dict'">
                                从员工信息中选择
                                <el-tooltip class="item" effect="dark" content="填写表单时带出已有数据。提交表单后自动保存为员工信息" placement="top">
                                    <i class="iconfont icon-question"></i>
                                </el-tooltip>
                            </div>
                            <div :class="tabsActiveName === 'newDict' ? 'staffing_form_content_tabs_active staffing_form_content_tabs_item' : 'staffing_form_content_tabs_item'" @click="tabsActiveName = 'newDict'">新建自定义字段</div>
                        </div>
                    </div>
                    <div class="staffing_form_content_tabs_page" v-show="tabsActiveName === 'dict'">
                        <el-input
                            size="small"
                            placeholder="输入字段名称可进行查找"
                            prefix-icon="el-icon-search"
                            v-model="tabsSearch"
                            @blur="staffingFormSetupDataSearch"
                            @keyup.enter="staffingFormSetupDataSearch">
                        </el-input>
                        <div class="staffing_form_content_left_forms">
                            <div v-for="item in staffingFormSetupData" :key="item.key" class="staffing_form_content_left_forms_item" :class="item.active ? 'staffing_form_content_left_forms_active':''" @click="staffingFormSetupDataDictSelect(item)">{{ item.title }}</div>
                        </div>
                    </div>
                    <div class="staffing_form_content_tabs_page" v-show="tabsActiveName === 'newDict'">
                        <div class="staffing_form_content_left_forms">
                            <div v-for="item in customFields" :key="item.type" class="staffing_form_content_left_forms_item" @click="dialogAll(item)">
                                <i class="iconfont" :class="item.type_icon"></i>
                                {{ item.type_title }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 右半 -->
                <div class="staffing_form_content_right">
                    <div class="staffing_form_content_title">已选字段</div>

                    <div class="staffing_form_content_right_forms" v-if="formSaveData.dict && formSaveData.dict.length > 0">
                        <div v-for="(item, index) in formSaveData.dict" :key="item.key" class="staffing_form_content_right_forms_item">
                            <div class="staffing_form_content_right_forms_item_index">{{ index+1 }}</div>
                            <div :class="item.isCustomField ? 'CustomField_title':''" @click="dialogAll(item, 'edit')">{{ item.title }}</div>
                            <div class="staffing_form_content_right_forms_item_readonly">
                                <el-checkbox v-model="item.readonly" size="small" :disabled="!item.modify_readonly">只读</el-checkbox>
                            </div>
                            <div class="staffing_form_content_right_forms_item_required">
                                <el-checkbox v-if="item.sort" v-model="item.required" size="small" :disabled="!item.modify_required">必填</el-checkbox>
                            </div>
                            <div class="staffing_form_content_right_forms_item_btns">
                                <el-button type="text" size="small" :disabled="index === 0" @click="formSaveDataDictChange(index, 'up')">上移</el-button>
                                <el-button type="text" :disabled="index === formSaveData.dict.length - 1" @click="formSaveDataDictChange(index, 'down')">下移</el-button>
                                <el-button type="text" :disabled="!item.remove" @click="formSaveDataDictChange(index, 'removed')">删除</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 开关条 区域 -->
        <div class="switchs_box" v-if="queryType === '3'">
            <el-switch v-for="item in switchList" :key="item.key" v-model="item.status" :inactive-text="item.title+'：'"></el-switch>
        </div>

        <!-- 底部按钮 -->
        <div class="footer_box">
            <el-button size="small" @click="goBack" style="margin-right: 8px">取消</el-button>
            <el-popconfirm title="确认保存当前配置吗？" @confirm="setFormSave">
                <el-button slot="reference" size="small" type="primary">保存</el-button>
            </el-popconfirm>
        </div>

        <!-- 新建自定义字段弹层 -->
        <el-dialog
        class="dialog"
        :title="addDialogTitle"
        width="480px"
        :visible.sync="addDialog"
        destroy-on-close
        >
            <el-form
                :model="addForm"
                :rules="addRules"
                ref="addForm"
                label-width="100px"
                size="small"
            >
                <el-form-item label="名称：" prop="title">
                    <el-input  maxlength="15" v-model="addForm.title"></el-input>
                </el-form-item>
                <el-form-item label="字数限制：" prop="max_length" v-if="addForm.type === 'text'">
                    <el-input  v-model="addForm.max_length"></el-input>
                </el-form-item>
                <el-form-item v-if="addForm.type === 'radio' || addForm.type === 'checkbox' || addForm.type === 'select'" label="选项：" prop="value">
                    <div class="addForm_value_list">
                        <div class="addForm_value_item" v-for="(item, index) in addForm.value" :key="index">
                            <el-input v-model="addForm.value[index]" placeholder="请输入选项内容"></el-input>
                            <span class="addForm_value_icon addForm_value_icon_m_l" @click="addFormValueDelete(index)"><el-icon class="el-icon-remove"></el-icon></span>
                        </div>
                        <span class="addForm_value_icon" @click="addFormValueAdd"><el-icon class="el-icon-circle-plus"></el-icon></span>
                    </div>
                </el-form-item>
                <el-form-item label="时间示例：" prop="time" v-if="addForm.type === 'time'">
                    <el-time-picker :value="data_time_value" size="small" disabled style="width: 100%"></el-time-picker>
                </el-form-item>
                <el-form-item label="日期示例：" prop="date" v-if="addForm.type === 'date'">
                    <el-date-picker :value="data_time_value" type="date" value-format="yyyy-MM-dd" disabled style="width: 100%"></el-date-picker>
                </el-form-item>
                <div class="text_center" v-if="addForm.type === 'file'">*支持pdf、xls、xlsx、doc、docx、png、jpg、rar、zip格式</div>
                <el-form-item label="文字说明：" prop="textarea_value" v-if="addForm.type === 'textarea'">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入文字说明" maxlength="50" v-model="addForm.textarea_value"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="addDialog = false">取消</el-button>
                <el-button size="small" type="primary" @click="customFieldsAdd()">保存</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { dictFormData, dictFormSave } from "@/api/hrm/staffingSetup/staffingFormSetup";

export default {
    name: "staffFormConfiguration",
    data () {
        let max_lengthValidator = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入字数限制'));
            } else {
                if (isNaN(value*1) || value*1 < 1) {
                    callback(new Error('请输入大于零的正整数'));
                }
                callback();
            }
        };
        return {
            queryType: '',
            headerTitle: '',
            // 表单配置项数据
            staffingFormSetupData: {},
            copy_staffingFormSetupData: {},
            // 自定义字段列表
            customFields: [
                {
                    type: 'text',
                    type_title: '单行文本',
                    type_icon: 'icon-form_text',
                },
                {
                    type: 'select',
                    type_title: '下拉选择框',
                    type_icon: 'icon-form_selecte',
                },
                {
                    type: 'radio',
                    type_title: '单选框',
                    type_icon: 'icon-form_radio',
                },
                {
                    type: 'checkbox',
                    type_title: '多选框',
                    type_icon: 'icon-form_checkbox',
                },
                {
                    type: 'time',
                    type_title: '时间选择器',
                    type_icon: 'icon-form_time',
                },
                {
                    type: 'date',
                    type_title: '日期选择器',
                    type_icon: 'icon-form_date',
                },
                {
                    type: 'file',
                    type_title: '附件',
                    type_icon: 'icon-form_fill',
                },
                {
                    type: 'textarea',
                    type_title: '文字说明',
                    type_icon: 'icon-form_textarea',
                }
            ],
            // tabs
            tabsActiveName: 'dict',
            tabsSearch: '',

            // switch选项相关
            switchsShow: false,
            switchList: [],

            // 已选字段数据
            formSaveData: {},

            // 添加自定义字段相关
            addDialog: false,
            addDialogTitle: '新建自定义字段',
            addForm: {
                title: '',
                textarea_value: '',
                type: 'text',
                value: [],
                max_length: '15',
            },
            addRules: {
                title: [{ required: true, message: "请输入名称", trigger: "blur" }],
                textarea_value: [{ required: true, message: "请输入文字说明", trigger: "blur" }],
                max_length: [{ required: true, validator: max_lengthValidator, trigger: "blur" }],
            },
            // 日期/时间示例的值
            data_time_value: new Date(),

        }
    },
    async created () {
        this.queryType = this.$route.query.type;
        await this.getDictFormData();
    },
    watch: {
        formSaveData: {
            handler: function (a, b) {
                this.copy_staffingFormSetupData = this.copy_staffingFormSetupData.map(i => {
                    let active = a.dict.some(j => j.key === i.key);
                    i.active = active;
                    return i
                })
                // 是否处于 search 方法内判断处理最终数据结果
                this.staffingFormSetupDataSearch();
            },
            deep: true,
        }
    },
    methods: {
        // 获取右侧表单项列表数据
        async getDictFormData() {
            await dictFormData({form_type: this.queryType}).then(res => {
                let obj = res.data;

                // 左侧表单可选项 列表数据
                this.staffingFormSetupData = obj.all_dict;
                this.staffingFormSetupData = this.staffingFormSetupData.map(i => {
                    i.readonly = i.readonly > 0;
                    i.required = i.required > 0;
                    i.modify_readonly = i.modify_readonly > 0;
                    i.modify_required = i.modify_required > 0;
                    i.sort = i.sort > 0;
                    return i
                })
                this.copy_staffingFormSetupData = this.staffingFormSetupData;
                this.headerTitle = obj.form_title;
                
                // 右侧表单项 列表数据
                obj.dict = obj.dict.map(i => {
                    i.readonly = i.readonly > 0;
                    i.required = i.required > 0;
                    i.modify_readonly = i.modify_readonly > 0;
                    i.modify_required = i.modify_required > 0;
                    i.sort = i.sort > 0;
                    return i
                })
                this.formSaveData = {
                    dict: obj.dict,
                    type: obj.type,
                };

                // switch选项数据
                if(this.queryType === '3') {
                    this.switchList = obj.obj_dict.map(i => {
                        i.status = i.status > 0;
                        return i
                    });
                }
            });
        },
        // 左侧表单可选项 查询
        staffingFormSetupDataSearch() {
            if(this.tabsSearch !== '') {
                this.staffingFormSetupData = this.copy_staffingFormSetupData.filter(i => i.title.indexOf(this.tabsSearch) !== -1);
            } else {
                this.staffingFormSetupData = this.copy_staffingFormSetupData;
            }
        },
        // 选中左侧表单项
        staffingFormSetupDataDictSelect(item) {
            if(!item.active) {
                this.formSaveData.dict.push(item);
            }
        },
        // 上移/下移/删除
        formSaveDataDictChange(index, type) {
            if(type === 'up') {
                // 上移
                this.formSaveData.dict[index] = this.formSaveData.dict.splice(index-1, 1, this.formSaveData.dict[index])[0];
            } else if (type === 'down') {
                // 下移
                this.formSaveData.dict[index] = this.formSaveData.dict.splice(index+1, 1, this.formSaveData.dict[index])[0];
            } else {
                // 删除
                this.formSaveData.dict.splice(index, 1);
            }
        },

        // 添加新字段弹层
        dialogAll(item, type='add') {
            if(item.custom<=0) return
            this.addDialogTitle = type === 'add' ? '新建自定义字段' : '修改自定义字段';
            this.addForm = this.addFormRestate(JSON.parse(JSON.stringify(item)), type);
            this.addDialog = true;
        },
        // 单选/复选/下拉 可选内容删除
        addFormValueDelete(index) {
            this.addForm.value.splice(index, 1);
        },
        // 单选/复选/下拉 可选内容添加
        addFormValueAdd() {
            this.addForm.value.push('');
        },
        // 添加新字段 保存
        customFieldsAdd() {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    if(this.addDialogTitle === '新建自定义字段') {
                        let { title, textarea_value, type, value, max_length } = this.addForm;
                        let obj = {key:uuidv4(), title, type, active:true, remove:true, readonly:false, required:false, sort:true, modify_readonly:true, modify_required:true, isCustomField:true, custom: 1 };
                        if(type === 'text') {
                            obj.max_length = max_length;
                        } else if (type === 'select' || type === 'radio' || type === 'checkbox') {
                            obj.value = value;
                        } else if (type === 'textarea') {
                            obj.max_length = '50';
                            obj.textarea_value = textarea_value;
                            obj.sort = false;
                            obj.readonly = true;
                            // obj.required = false;
                            obj.modify_readonly = false;
                            // obj.modify_required = false;
                        }
                        this.copy_staffingFormSetupData.push(obj);
                        this.formSaveData.dict.push(obj);
                    } else {
                        let { key, title, textarea_value, type, value, max_length, active, remove, readonly, required, sort, modify_readonly, modify_required, isCustomField, custom } = this.addForm;
                        let edit_obj = {key, title, type, active, remove, readonly, required, sort, modify_readonly, modify_required, isCustomField, custom };
                        let copy_staffingFormSetupData_index = this.copy_staffingFormSetupData.findIndex(value => value.key === key);
                        let formSaveData_dict_index = this.formSaveData.dict.findIndex(value => value.key === key);
                        if(type === 'text') {
                            edit_obj.max_length = max_length;
                        } else if (type === 'select' || type === 'radio' || type === 'checkbox') {
                            edit_obj.value = value;
                        } else if (type === 'textarea') {
                            edit_obj.max_length = '50';
                            edit_obj.textarea_value = textarea_value;
                            // edit_obj.readonly = true;
                            // edit_obj.required = false;
                            // edit_obj.modify_readonly = false;
                            // edit_obj.modify_required = false;
                        }
                        this.copy_staffingFormSetupData.splice(copy_staffingFormSetupData_index, 1, edit_obj);
                        this.formSaveData.dict.splice(formSaveData_dict_index, 1, edit_obj);
                    }
                    
                    this.tabsActiveName = 'dict';
                    this.addDialog = false;
                } else {
                    return false;
                }
            });
        },
        // addForm 重置
        addFormRestate(item, type) {
            let obj = {};
            if(type === 'add') {
                obj = {
                    title: '',
                    textarea_value: '',
                    type: item.type,
                    value: [],
                    max_length: '15',
                }
            } else if(type === 'edit') {
                obj = item;
            }
            return obj
        },
        // 最终保存表单配置项
        setFormSave() {
            if(this.queryType === '3') { 
                this.formSaveData.dict = [...this.formSaveData.dict, ...this.switchList]
            }
            dictFormSave(this.formSaveData).then(res => {
                this.$message({
                    showClose: true,
                    message: res.errmsg,
                    type: 'success'
                });
                setTimeout(() => {
                    this.goBack();
                }, 500);
            }).catch((error) => {
                this.$message({
                    showClose: true,
                    message: error.errmsg,
                    type: 'error'
                });
            });
        },
        // 返回
        goBack() {
            this.$router.back();
        },
        // 路由页面跳转
        goRouter(path, type = null) {
            if (type !== null) {
                this.$router.push({ path, query: { type } });
            }else{
                this.$router.push({ path });
            }
        },
    },
}
</script>

<style scoped lang="less">
    .staffing_form {
        padding: 24px 24px 24px;
        background: #fff;
        .staffing_form_content {
            height: 566px;
            overflow: hidden;
            border-radius: 2px;
            border: 1px solid #F0F0F0;
            display: flex;
            // 左半
            .staffing_form_content_left {
                width: 332px;
                border-right: 1px solid #F0F0F0;
                .staffing_form_content_left_top {
                    border-bottom: 1px solid #F0F0F0;
                    .staffing_form_content_tabs {
                        padding: 0 24px;
                        height: 37px;
                        display: flex;
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #595959;
                        cursor: pointer;
                        .staffing_form_content_tabs_item+.staffing_form_content_tabs_item {
                            margin-left: 32px;
                        }
                        .staffing_form_content_tabs_item i {
                            font-size: 12px;
                            color: #595959;
                            margin-left: 4px;
                        }
                        .staffing_form_content_tabs_active {
                            font-weight: 500;
                            color: #141414;
                            position: relative;
                        }
                        .staffing_form_content_tabs_active::after {
                            content: "";
                            display: inline-block;
                            width: 100%;
                            height: 2px;
                            background: #1AAC88;
                            border-radius: 2px 2px 0px 0px;
                            position: absolute;
                            bottom: 0;
                            left: 0;
                        }
                    }
                }
                .staffing_form_content_tabs_page {
                    height: 460px;
                    overflow-y: auto;
                    padding: 12px 24px;
                    .el-input {
                        margin-bottom: 24px;
                    }
                    .staffing_form_content_left_forms {
                        display: grid;
                        grid-gap: 12px;
                        grid-template-columns: repeat(2, 136px);
                        .staffing_form_content_left_forms_item {
                            width: 136px;
                            height: 32px;
                            padding: 0px 12px;
                            line-height: 32px;
                            background: #FFFFFF;
                            border: 1px solid #D9D9D9;
                            font-size: 14px;
                            font-family: PingFangSC-Regular, PingFang SC;
                            font-weight: 400;
                            color: #262626;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            text-align: center;
                            cursor: pointer;
                        }
                        .staffing_form_content_left_forms_active {
                            color: #1AAC88;
                            border: 1px solid #1AAC88;
                            cursor: not-allowed;
                        }
                    }
                }
            }

            // 右半
            .staffing_form_content_right {
                    width: 100%;
                .staffing_form_content_right_forms {
                    width: 100%;
                    height: 490px;
                    padding: 0 24px;
                    overflow-y: auto;
                    .staffing_form_content_right_forms_item {
                        width: 100%;
                        padding: 0 24px;
                        border: 1px solid #F0F0F0;
                        border-radius: 1px 1px 0px 0px;
                        display: grid;
                        grid-template-columns: repeat(5, 1fr);
                        align-items: center;
                        .CustomField_title {
                            font-size: 14px;
                            font-family: PingFang-SC-Medium, PingFang-SC;
                            font-weight: 500;
                            color: #1AAC88;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }

    .staffing_form_content_title {
        padding: 16px 24px;
        margin-bottom: 8px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #262626;
        display: flex;
        align-items: center;
    }
    .staffing_form_content_title::before {
        content: "";
        display: inline-block;
        width: 2px;
        height: 14px;
        background: #1AAC88;
        border-radius: 2px 2px 0px 0px;
        margin-right: 6px;
    }

    .staffing_form_content_tabs_page::-webkit-scrollbar {
        display: none;
    }
    .staffing_form_content_right_forms::-webkit-scrollbar {
        display: none;
    }

    .switchs_box {
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        padding: 0 24px;
        .el-switch {
            flex-grow: 1;
        }
    }

    .footer_box {
        position: fixed;
        z-index: 1;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 55px;
        background: #FFFFFF;
        box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.14);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .text_center {
        text-align: center;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #8C8C8C;
    }
    // 新增弹层中样式
    .addForm_value_list {
        width: 100%;
        max-height: 170px;
        overflow-y: auto;
    }
    .addForm_value_list::-webkit-scrollbar {
        display: none;
    }
    .addForm_value_item {
        display: flex;
        align-items: center;
    }
    .addForm_value_item+.addForm_value_item {
        margin-top: 18px;
    }
    .addForm_value_icon {
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #8C8C8C;
        cursor: pointer;
    }
    .addForm_value_icon_m_l {
        margin-left: 20px;
    }

    .staffing_form_content_right_forms_item_btns .el-button {
        display: inline-block;
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
</style>
