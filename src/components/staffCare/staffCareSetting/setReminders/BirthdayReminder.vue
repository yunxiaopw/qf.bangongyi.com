<template>
  <div class="content_box">
    <el-form ref="remindFormData" :model="remindFormData" label-width="150px" size="small">
        <el-form-item label="发送至员工上级：">
            <el-switch v-model="remindFormData.is_open_leader"></el-switch>
        </el-form-item>
        <el-form-item label="员工上级提醒内容：">
            <el-input type="textarea" id="textarea_top_box" v-model="remindFormData.leader_content" :autosize="{ minRows: 5, maxRows: 5}"></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-button icon="el-icon-plus" size="small" @click="setTopContent('{生日日期}')">生日日期</el-button>
            <el-button icon="el-icon-plus" size="small" @click="setTopContent('{部门名称}')">部门名称</el-button>
            <el-button icon="el-icon-plus" size="small" @click="setTopContent('{员工姓名}')">员工姓名</el-button>
            <el-button icon="el-icon-plus" size="small" @click="setTopContent('{领导姓名}')">领导姓名</el-button>
            <span class="hint">点击按钮，在适当的位置添加变量</span>
        </el-form-item>
        <el-form-item label="发送至固定人员：">
            <el-switch v-model="remindFormData.is_open_staff"></el-switch>
        </el-form-item>
        <el-form-item label="发送至固定人员：">
            <el-input v-model="queryListWidget.query_master.name" readonly @focus="dialogListWidget(queryListWidget.query_master, false, 'query_master')"></el-input>
        </el-form-item>
        <el-form-item label="固定人员提醒内容：">
            <el-input type="textarea" id="textarea_bottom_box" v-model="remindFormData.staff_content" :autosize="{ minRows: 5, maxRows: 5}"></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-button icon="el-icon-plus" size="small" @click="setBottomContent('{生日日期}')">生日日期</el-button>
            <el-button icon="el-icon-plus" size="small" @click="setBottomContent('{部门名称}')">部门名称</el-button>
            <el-button icon="el-icon-plus" size="small" @click="setBottomContent('{员工姓名}')">员工姓名</el-button>
            <span class="hint">点击按钮，在适当的位置添加变量</span>
        </el-form-item>
        
        <el-form-item label="提醒时间：">
            提前
            <el-select v-model="remindFormData.remind_day" style="width: 82px;">
                <el-option v-for="(item, index) in 61" :key="item" :label="index" :value="index"></el-option>
            </el-select>
            天，
            <el-select v-model="remindFormData.remind_time" style="width: 82px;">
                <el-option v-for="(item, index) in 24" :key="item" :label="index" :value="index"></el-option>
            </el-select>
            点发送
        </el-form-item>
        <el-form-item>
            <el-button @click="$router.back()">取消</el-button>
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
    </el-form>

    <!-- 修改 主/子负责人弹层 -->
    <ListWidget :tabType="listWidgetTabType" :emitType="listWidgetEmitType" :selects="listWidgetSelects" :radio="listWidgetRadio" :visible="listWidgetShow" @ackSelect="ackSelect" @listWidgetHide="listWidgetHide" />
  </div>
</template>
<script>
import { remind, remindSetStaffEdit } from "@/api/staffCare/index"
import { insertStr } from "@/utils/utils"

export default {
  name: "BirthdayReminder",
  props: {},
  data() {
    return {
        id: this.$route.query.id || null,
        remindFormData: {},
        // ListWidget 组件相关数据
        listWidgetShow: false,
        listWidgetRadio: false,
        listWidgetEmitType: "",
        listWidgetTabType: "",
        listWidgetSelects: [],
        // 查询条件 弹层获取的主/子负责人 展示文本信息
        queryListWidget: {
            query_master: {
                name: "",
                id: "",
            }
        },
    };
  },
  created() {
    this.getRemind();
  },
  methods: {
    // 员工关怀设置 数据回显
    getRemind() {
        remind({id: this.id}).then(res => {
            this.remindFormData = res.data;
            this.remindFormData.is_open_leader = Boolean(Number(res.data.is_open_leader));
            this.remindFormData.is_open_staff = Boolean(Number(res.data.is_open_staff));
            this.queryListWidget.query_master.id = res.data.staffids ? res.data.staffids : "";
            this.queryListWidget.query_master.name = res.data.staffs_name ? res.data.staffs_name : "";
        })
    },
    // 员工上级提醒内容添加字段
    setTopContent(text) {
        let { selectionStart } = document.getElementById('textarea_top_box');
        this.remindFormData.leader_content = insertStr(this.remindFormData.leader_content, selectionStart, text);
    },
    // 固定人员提醒内容添加字段
    setBottomContent(text) {
        let { selectionStart } = document.getElementById('textarea_bottom_box');
        this.remindFormData.staff_content = insertStr(this.remindFormData.staff_content, selectionStart, text);
    },
    // 保存
    onSubmit() {
        let { id, leader_content, staff_content, staffids, remind_day, remind_time, is_open_leader, is_open_staff } = this.remindFormData;
        let number_is_open_leader = Number(is_open_leader);
        let number_is_open_staff = Number(is_open_staff);
        remindSetStaffEdit({ id, leader_content, staff_content, staffids, remind_day, remind_time, is_open_leader: number_is_open_leader, is_open_staff: number_is_open_staff }).then(res => {
            if(res.errno === 0) {
                this.$message({
                    showClose: true,
                    message: res.errmsg,
                    type: 'success'
                });
                this.$router.back();
            }else{
                this.$message({
                    showClose: true,
                    message: res.errmsg,
                    type: 'error'
                });
            }
        }).catch(error => {
            this.$message({
            showClose: true,
            message: error.errmsg,
            type: 'error'
            });
        })
    },
    // 查询/修改 主/子负责人弹层
    async dialogListWidget(data, radio = false, emitType) {
      if(emitType === "query_master") {
        // 查询条件 主/子负责人
        let we_names = data.name.split(',').filter(i=> i && i.trim());
        this.listWidgetSelects = data.id.split(',').filter(i=> i && i.trim()).map((i, index) => (i = {id: i , we_name: we_names[index]}));
        this.listWidgetTabType = "成员";
      }
      this.listWidgetShow = true;
      this.listWidgetRadio = radio;
      this.listWidgetEmitType = emitType;
    },
    // 查询/修改 主/子负责人弹层 确定
    ackSelect(data) {
      let { emitType, visible, selects } = data;
      this.listWidgetShow = visible;
      this.listWidgetSelects = selects;
      if(emitType === "query_master") {
        // 查询条件 主负责人
        this.queryListWidget.query_master.name = selects.map(i => i.we_name).join(",");
        this.queryListWidget.query_master.id = selects.map(i => i.id).join(",");
        this.remindFormData.staffids = this.queryListWidget.query_master.id;
      }
    },
    // 修改主/子负责人弹层 隐藏
    listWidgetHide(visible){
      this.listWidgetShow = visible;
    },
  }
};
</script>
<style lang="less" scoped></style>
