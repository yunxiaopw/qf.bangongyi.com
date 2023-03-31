<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine goback>离职证明</HeadLine>

    <!-- 内容区 -->
    <div class="left_to_prove">
      <div class="left_to_prove_title">离职证明</div>
      <div class="left_to_prove_content">
        <el-input v-model="queryForm.name" placeholder="姓名" size="small" style="width: 100px"></el-input>，性别
        <el-input v-model="queryForm.gender" placeholder="性别" size="small" style="width: 58px"></el-input>，身份证号码
        <el-input v-model="queryForm.idcode" placeholder="身份证号码" size="small" style="width: 186px"></el-input>，于
        <el-input v-model="queryForm.entry_time_year" placeholder="年" size="small" style="width: 78px"></el-input>年
        <el-input v-model="queryForm.entry_time_month" placeholder="月" size="small" style="width: 59px"></el-input>月
        <el-input v-model="queryForm.entry_time_day" placeholder="日" size="small" style="width: 61px"></el-input>日入职，现担任
        <el-input v-model="queryForm.position" placeholder="职位" size="small" style="width: 100px"></el-input>，
        <el-input v-model="queryForm.quite_time_year" placeholder="年" size="small" style="width: 78px"></el-input>年
        <el-input v-model="queryForm.quite_time_month" placeholder="月" size="small" style="width: 59px"></el-input>月
        <el-input v-model="queryForm.quite_time_day" placeholder="日" size="small" style="width: 61px"></el-input>日因
        <el-input v-model="queryForm.quite_reason" placeholder="离职原因" size="small" style="width: 330px"></el-input>申请离职。经公司研究决定，同意其离职，已办理各种离职交接手续。
        <div>
          <el-input type="textarea" v-model="queryForm.remark" :autosize="{ minRows: 5, maxRows: 5}" maxlength="60" placeholder="您可以在此填写补充内容"></el-input>
        </div>
          特此证明。
      </div>
      <div class="left_to_prove_b_r">
        <div class="left_to_prove_b_r_all">
          <div class="left_to_prove_b_r_all_top">
            <div>单位公章：</div>
            <div>员工签字：</div>
          </div>
          <div class="left_to_prove_b_r_all_bottom">
            <el-input v-model="queryForm.create_date_year" placeholder="年" size="small" style="width: 78px"></el-input>年
            <el-input v-model="queryForm.create_date_month" placeholder="月" size="small" style="width: 59px"></el-input>月
            <el-input v-model="queryForm.create_date_day" placeholder="日" size="small" style="width: 61px"></el-input>日
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="main-box">
      <div class="left_to_prove" style="width: 100%; padding: 24px 0;">
        <div class="left_to_prove_title" style="text-align: center; font-size: 16px; font-weight: 500; color: #262626; margin-bottom: 16px;">离职证明</div>
        <div class="left_to_prove_content" style="width: 100%; line-height: 25px; font-size: 14px; font-weight: 400; color: #434343;">
          小蒋，性别 男，身份证号码 132435454987654，于 3050 年 10 月 15日入职，现担任 开发人员，4080 年 10 月 15日因 功德圆满申请离职。经公司研究决定，同意其离职，已办理各种离职交接手续。
          <div style="line-height: 25px;">您可以在此填写补充内容</div>
          特此证明。
        </div>
        <div class="left_to_prove_b_r" style="width: 100%; height: 70px; text-align: right;">
          <span class="left_to_prove_b_r_all" style="width: 100%; font-size: 14px; font-weight: 400; color: #434343; display: inline-block;">
            <p style="width: 30%;">单位公章：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <p style="width: 30%;">员工签字：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <p class="left_to_prove_b_r_all_bottom" style="margin-top: 8px;">
              4080 年 10月 15日
            </p>
          </span>
        </div>
      </div>

      <div class="bar" style="width: 100%; border-bottom: 2px dashed #000;"></div>

      <div class="left_to_prove" style="width: 100%; padding: 24px 0;">
        <div class="left_to_prove_title" style="text-align: center; font-size: 16px; font-weight: 500; color: #262626; margin-bottom: 16px;">离职证明</div>
        <div class="left_to_prove_content" style="width: 100%; line-height: 25px; font-size: 14px; font-weight: 400; color: #434343;">
          小蒋，性别 男，身份证号码 132435454987654，于 3050 年 10 月 15日入职，现担任 开发人员，4080 年 10 月 15日因 功德圆满申请离职。经公司研究决定，同意其离职，已办理各种离职交接手续。
          <div style="line-height: 25px;">您可以在此填写补充内容</div>
          特此证明。
        </div>
        <div class="left_to_prove_b_r" style="width: 100%; height: 70px; text-align: right;">
          <span class="left_to_prove_b_r_all" style="width: 100%; font-size: 14px; font-weight: 400; color: #434343; display: inline-block;">
            <p style="width: 30%;">单位公章：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <p style="width: 30%;">员工签字：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <p class="left_to_prove_b_r_all_bottom" style="margin-top: 8px;">
              4080 年 10月 15日
            </p>
          </span>
        </div>
      </div>
    </div> -->

    <!-- 底部按钮 -->
    <div class="bottom_btns">
      <el-button size="small" @click="download">下载</el-button>
      <el-button size="small" type="primary" @click="preserve">保存</el-button>
    </div>

  </div>
</template>

<script>
import { quitProve, quitProveEdit, quitProveDownload } from "@/api/hrm/dimission";

export default {
  name: "printDimission",
  data() {
    return {
      id: this.$route.query.id || '',
      queryForm: {
        name: '',
        gender: '',
        idcode: '',
        position: '',
        entry_time: '',
        quite_time: '',
        quite_reason: '',
        remark: '',
        create_date: '',
        entry_time_year: '',
        entry_time_month: '',
        entry_time_day: '',
        quite_time_year: '',
        quite_time_month: '',
        quite_time_day: '',
        create_date_year: '',
        create_date_month: '',
        create_date_day: '',
      },
    };
  },
  async created() {
    await this.getQuitProve();
  },
  methods: {
    // 获取保存好的离职证明信息
    async getQuitProve() {
      await quitProve({id:this.id}).then(res => {
        this.queryForm = this.editQueryForm(res.data);
      })
    },
    // init queryForm
    editQueryForm(data) {
      let obj = {};
      for (let key in data) {
        if(key==='entry_time' || key==='quite_time' || key==='create_date') {
          let arr = data[key].split("-");
          if(arr.length >= 3) {
            obj[`${key}_year`] = arr[0];
            obj[`${key}_month`] = arr[1];
            obj[`${key}_day`] = arr[2];
          }
        }
        obj[key] = data[key];
      }
      return obj
    },
    // 保存
    preserve() {
      if(this.queryFormRules()) {
        let data = this.setQueryData(this.queryForm);
        quitProveEdit(data).then(res => {
            if(res.errno === 0) {
                this.$message({
                    showClose: true,
                    message: res.errmsg,
                    type: 'success'
                });
                this.getQuitProve();
            }else{
                this.$message({
                    showClose: true,
                    message: res.errmsg,
                    type: 'error'
                });
            }
        }).catch((error) => {
            this.$message({
                showClose: true,
                message: error.errmsg,
                type: 'error'
            });
        })
      }
    },
    // 下载
    download() {
      if(this.queryFormRules()) {
        let data = this.setQueryData(this.queryForm);
        quitProveDownload(data).then(res => {
            const fileName = '离职证明.pdf';
            const blob = new Blob([res],{
              type: "application/pdf", 
            });
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl; 
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(blobUrl);
        }).catch((error) => {
            this.$message({
                showClose: true,
                message: error.errmsg,
                type: 'error'
            });
        })
      }
    },
    // 保存时处理数据格式
    setQueryData(data) {
      let newData = JSON.parse(JSON.stringify(data));
      for (let key in data) {
        if(key==='entry_time' || key==='quite_time' || key==='create_date') {
          newData[key] = `${data[`${key}_year`]}-${data[`${key}_month`]}-${data[`${key}_day`]}`;
        }
      }
      newData.id = this.id;
      return newData
    },
    // 必填校验
    queryFormRules() {
      let is_ok = true;
      for (let key in this.queryForm) {
        if (key !== 'remark' && this.queryForm[key] === '') is_ok = false; 
      }
      if(!is_ok) {
        this.$message({
          showClose: true,
          message: '除补充内容外均必填',
          type: 'error'
        });
      }
      return is_ok
    },
  },
};
</script>

<style lang='less' scoped>
.left_to_prove {
  width: 800px;
  margin: 0 auto;
  padding: 24px 0;
  &_title {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: #262626;
    margin-bottom: 16px;
  }
  &_content {
    line-height: 50px;
    font-size: 14px;
    font-weight: 400;
    color: #434343;
  }
  &_b_r {
    display: flex;
    justify-content: end;
    &_all {
      width: 260px;
      display: flex;
      flex-direction: column;
      font-size: 14px;
      font-weight: 400;
      color: #434343;
      &_bottom {
        margin-top: 12px;
      }
    }
  }
}

.bottom_btns {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style>
  /* html,body {
      width: 100%;
      height: 100%;
  }
  .main-box {
      width: 100%;
      height: 100%;
      font-family: PingFangSC-Regular, PingFang SC;
  }
  .left_to_prove {
    width: 800px;
    margin: 0 auto;
    padding: 24px 0;
  }
  .left_to_prove_title {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: #262626;
    margin-bottom: 16px;
  }
  .left_to_prove_content {
    line-height: 35px;
    font-size: 14px;
    font-weight: 400;
    color: #434343;
  }
  .left_to_prove_b_r {
    width: 100%;
    height: 100px;
    position: relative;
  }
  .left_to_prove_b_r_all {
    width: 260px;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: 400;
    color: #434343;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .left_to_prove_b_r_all_bottom {
    margin-top: 12px;
  }
  .bar {
    width: 100%;
    border-bottom: 2px dashed #000;
  } */
</style>
