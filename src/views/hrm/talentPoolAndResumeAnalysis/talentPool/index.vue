<template>
    <div class="main-box">
        <!-- 页头 -->
        <HeadLine>
            人才库
            <template #r-content>
                <el-button size="small" @click="dialogAll('addChildren')">新增人才</el-button>
            </template>
        </HeadLine>

        <!-- 表格 -->
        <el-table
        :data="tableData"
        style="width: 100%"
        max-height="480"
        :header-cell-style="{
            height: '34px',
            padding: '0',
            background: '#FAFAFA',
            color: '#8C8C8C',
            fontSize: '12px',
            fontFamily: 'PingFangSC-Medium, PingFang SC',
            fontWeight: '500',
        }"
        row-key="id"
        >
            <el-table-column prop="we_name" align="center" label="岗位"></el-table-column>
            <el-table-column prop="all_we_parentids" align="center" label="人才总数"></el-table-column>
            <el-table-column prop="type" align="center" label="操作"></el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <pagination
        v-show="tableDataTotal>0"
        :total="tableDataTotal"
        :page.sync="queryForm.page"
        :limit.sync="queryForm.size"
        @pagination="getTabelList"
        />

        <!-- 新增/编辑人才 弹层 -->
        <el-dialog
        class="dialog"
        :title="addChildrenTitle"
        width="480px"
        :visible.sync="addChildrenDialog"
        destroy-on-close
        >
            <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px" size="small">
                <el-form-item label="姓名：" prop="name">
                    <el-input  v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号：" prop="mobeil">
                    <el-input v-model="addForm.mobeil"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="推荐岗位：" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="来源：" prop="type">
                    <el-select v-model="addForm.type" placeholder="请选择人才来源">
                        <el-option v-for="(item, index) in addFormTypes" :key="index" :label="item.label" :value="item.label"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="addChildrenDialog = false">取消</el-button>
                <el-button size="small" type="primary" @click="submitForm('addForm')">保存</el-button>
            </div>
        </el-dialog>

        <!-- 标记招聘状态 弹层 -->
        <el-dialog
        class="dialog"
        title="标记招聘状态"
        width="480px"
        :visible.sync="recruitDialog"
        destroy-on-close
        >
            <el-form :model="recruitForm" label-width="100px" size="small">
                <el-form-item label="招聘中：">
                    <el-switch v-model="recruitForm.value"></el-switch>
                </el-form-item>
                <el-form-item label="当前需求人数：">
                    <el-input v-model="recruitForm.num" type="number" :min="0"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="recruitDialog = false">取消</el-button>
                <el-button size="small" type="primary" @click="recruitDialog = true">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

export default {
    name: "talentPool",
    data () {
        return {
            // 查询入参
            queryForm: {
                page: 1,
                size: 15,
            },
            // 表格数据
            tableData: [],
            tableDataTotal: 40,
            // 新增/编辑人才 弹层
            addChildrenDialog: false,
            addChildrenTitle: "",
            addForm: {
                name: "",
                mobeil: "",
                email: "",
            },
            addRules: {
                name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
                mobeil: [{ required: true, message: "请输入手机号", trigger: "blur" }],
            },
            addFormTypes: [
                { label: "部门", },
                { label: "中心", },
                { label: "组", },
                { label: "事业部", },
                { label: "事业群", },
                { label: "办公室", },
                { label: "区域", },
                { label: "项目组", },
                { label: "子公司", },
                { label: "门店", },
                { label: "网点", },
                { label: "分支机构", },
            ],
            // 标记招聘状态 弹层
            recruitDialog: false,
            recruitForm: {
                name: "",
                mobeil: "",
                email: "",
            },
        }
    },
    created () {
        this.getTableData();
    },
    methods: {
        // 获取表格数据
        getTableData(){
            
        },
        // 分页
        getTabelList(){
            this.getTableData();
        },
        // 弹窗显示
        async dialogAll(dialog, row, isUpdate = false) {
            if (isUpdate) {
                await this.getDepartmentInfo(row.we_id);
                this.addChildrenTitle = "编辑人才";
                this[dialog + "Dialog"] = true;
            } else {
                this.resetAddForm();
                this.addChildrenTitle = "新增人才";
                this[dialog + "Dialog"] = true;
            }
        },
        // 人才资料弹窗 详情回显
        async getDepartmentInfo(id){
            // await departmentInfo({we_id: id}).then(res => {
            //     this.addForm = res.data
            // })
        },
        // 重置新增/修改弹层表单数据
        resetAddForm() {
            this.addForm = {
                name: "",
                mobeil: "",
                email: "",
            }
        },
        // 新增/修改人才 保存
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addChildrenDialog = false;
                    // if(this.addChildrenTitle === "新增人才"){
                    //     createChild(this.addForm).then(res => {
                    //     this.$message({
                    //         showClose: true,
                    //         message: res.errmsg,
                    //         type: 'success'
                    //     });
                    //     this.resetQueryForm();
                    //     this.search();
                    //     this.addChildrenDialog = false;
                    //     }).catch((error) => {
                    //     this.$message({
                    //         showClose: true,
                    //         message: error.errmsg,
                    //         type: 'error'
                    //     });
                    //     })
                    // }else if(this.addChildrenTitle === "编辑人才"){
                    //     departmentEdit(this.addForm).then(res => {
                    //     this.$message({
                    //         showClose: true,
                    //         message: res.errmsg,
                    //         type: 'success'
                    //     });
                    //     this.resetQueryForm();
                    //     this.search();
                    //     this.addChildrenDialog = false;
                    //     }).catch((error) => {
                    //     this.$message({
                    //         showClose: true,
                    //         message: error.errmsg,
                    //         type: 'error'
                    //     });
                    //     })
                    // }
                } else {
                    return false;
                }
            });
        },
    },
}
</script>

<style scoped lang="less">
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