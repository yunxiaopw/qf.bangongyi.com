<!-- 第一步 -->
<template>
  <div class="container_first" style="width:55%;position: relative;">
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="135px" class="demo-ruleForm">
      <el-form-item label="采集表名称：" prop="gather_title">
        <el-input v-model="formData.gather_title"></el-input>
      </el-form-item>
      <el-form-item label="填报说明：" prop="explain">
        <el-input v-model="formData.explain" style="width: 380px;" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="采集类型：" prop="gather_type">
        <el-select placeholder="请选择" v-model="formData.gather_type">
          <el-option v-for="item in dateOption" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="适用的发薪方案：" prop="gather_project">
        <el-select placeholder="请选择" v-model="formData.gather_project">
          <el-option v-for="item in projectList" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="formData.gather_project === 2" label="发薪方案：" prop="project">
        <el-select placeholder="请选择" v-model="formData.project">
          <el-option v-for="item in getSalaryList" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="填报人员：" prop="filling_type">
        <el-select placeholder="请选择" v-model="formData.filling_type">
          <el-option v-for="item in staffList" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="formData.filling_type" label="采集范围" prop="range_data">
        <MoreInput
          v-if="formData.filling_type === 1"
          :i_item="{
            type: 'staff_widget',
            form_item_type: '成员',
            widget__init_text: formData.range_data,
            form_item_radio: true
          }"
          :v-model.sync="formData.range_data"
          style="width: 380px" />
        <CollectRangeSelect v-if="formData.filling_type === 2" :rangeData.sync="formData.range_data"></CollectRangeSelect>
      </el-form-item>
      <el-form-item label="代办提醒" v-if="formData.gather_type">
        <div style="display: flex">
          <div v-if="formData.gather_type === 1">
            <vxe-select v-model="formData.start" placeholder="请选择" clearable style="width: 96px;margin-right: 8px;height:32px;">
              <vxe-option v-for="num in 31" :key="num" :value="num" :label="`${num}号`"></vxe-option>
            </vxe-select>
            <vxe-select v-model="formData.end" placeholder="请选择" clearable style="width: 96px;margin-right: 8px;height:32px;">
              <vxe-option v-for="num in 31" :key="num" :value="num" :label="`${num}号`"></vxe-option>
            </vxe-select>
          </div>
          <el-date-picker
            v-else
            style="margin-right: 10px;"
            v-model="formData.date"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <span>每天提醒</span>
        </div>
      </el-form-item>
      <el-form-item>
        <div>
          <el-button style="margin-top: 12px;" @click="handleCancel">取消</el-button>
          <el-button style="margin-top: 12px;" @click="handleNext
          " type="primary">下一步</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getSalaryProject,addGatherList } from "@/api/remuneration/dataCollection/newCollectData/index.js";
import CollectRangeSelect from './collectRangeSelect.vue'
export default {
  name: 'firstStep',
  components: {
    CollectRangeSelect
  },
  data() {
    return {
      formData: {
        name: '',
        describe: '',
        type: '',
        scheme_type: '',
        filling_type: '',
        rule_ids: '',
        filling_range: '',
        remind_begin: '',
        remind_finish: '',
        dept_ids: '',
        staff_id: '',
        tag_ids: '',
        staff_ids: '',
        date: '',
        range_data: [
          {
            id: '5156',
            we_name: '张三',
            we_userid: '15105asdas',
            we_avatar: 'asdasdasd',
          }
        ]
      },

      ruleForm: {
        name: '',
        region: '',
      },
      dateOption: [
        { id: 1, label: '按月填写' },
        { id: 2, label: '限填一次' }
      ],
      dateMoth: [
        { id: 1, label: '当月' },
        { id: 2, label: '下一月' }
      ],
      projectList: [
        { id: 1, label: '全部' },
        { id: 2, label: '部分' },
        { id: 3, label: '不适用' }
      ],
      staffList: [
        { id: 1, label: '由指定人员填报' },
        { id: 2, label: '由员工自行填报' },
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
        gather_title: [
          { required: true, message: '请输入发薪方案名称', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,    //正则校验不用字符串
            message: "仅支持输入中文，英文，数字、-、()等常规字符串", trigger: "blur"
          }
        ],
        gather_type: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        gather_project: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        project: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        filling_type: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        range_data :[
          { required: true, message: '请选择', trigger: 'change' },
        ]
      },
      getSalaryList:[{ id: 1, title: 'qqq' }, { id: 2, title: 'ddd' }]
    }
  },
  created() {
    this.init()
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
    async init(){
      await getSalaryProject({}).then((res)=>{
        this.getSalaryList=res.data.reduce((r,item)=>r.concat(item),[])
        this.$emit('init',this.formData)
        
      })
    },
    // 保存数据获取下一步
    handleNext() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$emit('onStep', {step: 1, data: this.formData})
        } else {
          return false;
        }
      })
    },
    // 取消
    handleCancel() {
      this.$emit('handleCancel')
    },
    //  getConfigAction(){
    //   this.formData=this.dealObjectValue(this.formData)
    //   configAction(this.formData).then(res=>{
    //     console.log(res)
    //     this.rule_id=res.data.rule_id;
    //     this.$emit('handleAddBtn',rule_id);
    //     console.log(rule_id)
    //   })
    //   .catch(()=>{})
    //  }  
  }
}

</script>
<style  lang="less" scoped>
.el-input {
  width: 380px;
  height: 32px;
  border-radius: 2px;

}

.el-select {
  width: 380px;
  height: 32px;
  border-radius: 2px;
}

.el-input__inner {
  height: 32px;
  border-radius: 2px;
}

.el-textarea {
  height: auto;
}

.gater_list {
  .el-input {
    width: 160px;
    height: 32px;
    border-radius: 2px;
    float: left;
  }

  p {
    margin-bottom: 0em;
    line-height: 40px !important;
    margin-left: 1em;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1F1F1F;
  }

  p:nth-child(1) {
    margin-left: 0em;
  }
}

.el-input__icon {
  line-height: 32px;
}

.delete {
  width: 17px;
  height: 17px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  display: inline-block;
  top: 3px;
  position: relative;
}

.delete {
  background-image: url(../../../../../assets/svgs/delete.svg);

  &:hover {
    background-image: url(../../../../../assets/svgs/delete-active.svg);
  }
}

.el-form-item {
  margin-bottom: 16px !important;
}

</style>

