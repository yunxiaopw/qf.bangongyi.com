<!-- 第一步 -->
<template>
  <div class="container_first" style="width:55%;position: relative;">
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="145px" class="demo-ruleForm">
      <el-form-item label="发薪方案名称：" prop="title">
        <el-input v-model="formData.title" style="width: 380px;height: 32px;"></el-input>
      </el-form-item>
      <!-- 适用人员 -->
      <el-form-item label="适用人员：" prop="region">
        <MoreInput
                    :i_item="{
                      type: 'staff_widget',
                      form_item_type: '成员',
                      widget__init_text:formData.staff_name,
                      form_item_radio: true,
                    }"
                    :v-model.sync="formData.staff_name"
                    />
      </el-form-item>
      <!-- 排除人员 -->
      <el-form-item label="排除人员：" prop="region">
        <MoreInput
                    :i_item="{
                      type: 'staff_widget',
                      form_item_type: '成员',
                      widget__init_text:formData.dept_name,
                      form_item_radio: true,
                    }"
                    :v-model.sync="formData.dept_name"
                    />
      </el-form-item>
      <!-- 计薪周期 -->
      <el-form-item label="计薪周期：" prop="wages_month" >
        <el-select placeholder="请选择" v-model="formData.wages_month" style="width: 96px;margin-right: 8px;height:32px;" >
          <el-option v-for="item in dateOption" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
        <vxe-select v-model="formData.wages_day" placeholder="请选择" clearable style="width: 96px;margin-right: 8px;height:32px;">
          <vxe-option v-for="num in 31" :key="num" :value="num" :label="`${num}号`"></vxe-option>
        </vxe-select>
        <p
          style="display: inline-block;margin-right: 16px;height: 22px;font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #8C8C8C;line-height: 22px;">
          至</p>
        <span
          style="display: inline-block;height: 22px;font-size: 14px;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #1F1F1F;line-height: 22px;">{{
            dateDate }}</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { configAction } from "@/api/remuneration/intellectSalary/index";
export default {
  name: 'firstStep',
  data() {
    return {
      formData: {
        title: '',
        dept_ids: '',
        dept_name: '',
        staff_name:'',
        tag_ids: '',
        staff_ids: '',
        wages_month: '当月',//月份范围
        wages_day: '1号'//日期范围
      },
      ruleForm: {
        name: '',
        region: '',
      },
      dateOption: [
        { id: 1, label: '当月' },
        { id: 2, label: '下一月' }
      ],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      value: '办公逸总部',
      dateDate: '当月最后1天',
      date: '当月',
      rules: {
        title: [
          { required: true, message: '请输入发薪方案名称', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,    //正则校验不用字符串
            message: "仅支持输入中文，英文，数字、-、()等常规字符串", trigger: "blur"
          }
        ],
        date: [
          { required: true, message: '请选择', trigger: 'blur' },
          // { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ]
      },
    }
  },
  created() {
    // this.getConfigAction()
  },
  methods: {
     //  判断传参是否为空值
 dealObjectValue(obj) {
    var param = {};
    if (obj === null || obj === undefined || obj === "") return param;
    for (var key in obj) {
        if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
            param[key] = obj[key];
        }
    }
    return param;
},
   getConfigAction(){
    this.formData=this.dealObjectValue(this.formData)
    configAction(this.formData).then(res=>{
      console.log(res)
      this.rule_id=res.data.rule_id;
      this.$emit('handleAddBtn',rule_id);
      console.log(rule_id)
    })
    .catch(()=>{})
   }  
  }
}

</script>
<style >

</style>

