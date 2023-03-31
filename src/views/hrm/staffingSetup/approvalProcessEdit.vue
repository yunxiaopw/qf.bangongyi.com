<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine goback>编辑审批流程</HeadLine>

    <!-- 表单区域 -->
    <div class="main_content">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" size="small">
            <el-form-item label="流程名称：" prop="name">
                <el-input v-model="formData.name" maxlength="20" :style="el_select_style"></el-input>
            </el-form-item>
            <!-- 流程设置 -->
            <div class="main_content_staff main_content_item">
                <div class="main_content_head">流程设置</div>
                <div :class="formData.staffs && formData.staffs.length > 9 ? 'main_content_staff_lists' : ''">
                    <div class="main_content_staff_list" v-for="(item, index) in formData.staffs" :key="index">
                        <div class="bg_F5">
                            <el-form-item label="审批人：">
                                <el-row>
                                    <el-col :span="10">
                                        <el-select v-model="item.name" placeholder="请选择" :style="el_select_style">
                                            <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="10" :offset="1" v-if="item.name === '1'">
                                        <el-input class="main_content_staff_item" v-model="item.mobile" placeholder="请选择" :style="el_select_style"></el-input>
                                    </el-col>
                                    <el-col :span="2">
                                        <span @click="formDataStaffDelet(index)"><el-icon class="el-icon-delete pointer"></el-icon></span>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </div>
                    </div>
                </div>
                <el-button type="text" icon="el-icon-plus" @click="formDataStaffAdd">添加</el-button>
            </div>

            <el-form-item label="抄送人：" prop="region">
                <el-input v-model="formData.region" placeholder="请选择抄送人" :style="el_select_style"></el-input>
            </el-form-item>
        </el-form>
    </div>

    <!-- 底部按钮 -->
    <div class="bottom_btns">
        <el-button size="small" @click="$router.back()">取消</el-button>
        <el-button size="small" type="primary" @click="submit('formData')">保存</el-button>
    </div>
  </div>
</template>

<script>
import { disableList } from "@/api/hrm/department";

export default {
  name: "approvalProcessEdit",
  components: {},
  data() {
    return {
        // 页面下拉框宽度
        el_select_style: {
            width: '240px'
        },
        options: [
            {
                value: '1',
                label: '固定人员'
            },
            {
                value: '2',
                label: '直接上级'
            },
            {
                value: '3',
                label: '自由选择'
            }
        ],
        formData: {
          name: '',
          region: '',
          staffs: [{
            name: "",
            mobile: "",
        }],
        },
        rules: {
          name: [
            { required: true, message: '请输入流程名称', trigger: 'blur' },
          ],
        }
    };
  },
  created() {
  },
  methods: {
    // 入职人员删除
    formDataStaffDelet(index) {
        this.formData.staffs.splice(index, 1);
    },
    // 入职人员添加
    formDataStaffAdd() {
        this.formData.staffs.push({
            name: "",
            mobile: "",
        })
    },
    // 保存
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        //   departmentEdit(this.basics).then(res => {
        //     this.$message({
        //       showClose: true,
        //       message: res.errmsg,
        //       type: 'success'
        //     });
        //     this.getDepartmentTabInfos(this.activeName);
        //     this.isEdit = false;
        //   }).catch((error) => {
        //     this.$message({
        //       showClose: true,
        //       message: error.errmsg,
        //       type: 'error'
        //     });
        //   })
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang='less' scoped>
// 表单区域
.main_content {
    width: 100%;
    padding: 24px 24px 65px;
    .main_content_item {
        padding: 0 0px 16px;
        margin-top: 15px;
    }
    .main_content_staff {
        .main_content_staff_lists {  
            height: 395px;
            overflow-y: auto;
        }
        .main_content_staff_list {
            display: flex;
            align-items: center;
            .main_content_staff_item+.main_content_staff_item {
                margin-left: 8px;
            }
            .el-icon-delete {
                margin-left: 24px;
            }
            .el-icon-delete:hover {
                color: red;
            }
        }
        .main_content_staff_list+.main_content_staff_list {
            margin-top: 8px;
        }
    }
    // 表格内标题头
    .main_content_head {
        height: 54px;
        display: flex;
        align-items: center;
        padding: 16px 0;
        font-size: 16px;
        font-weight: 500;
        color: #262626;
        padding-left: 8px;
        position: relative;
    }
    .main_content_head::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        display: inline-block;
        width: 2px;
        height: 14px;
        background: #1AAC88;
        border-radius: 2px 2px 0px 0px;
    }
    .bg_F5 {
        width: 660px;
        background: #F5F5F5;
        border-radius: 2px;
        padding: 16px 16px 16px 0;
    }
}

// 底部按钮
.bottom_btns {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 55px;
    background: #FFFFFF;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.14);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>