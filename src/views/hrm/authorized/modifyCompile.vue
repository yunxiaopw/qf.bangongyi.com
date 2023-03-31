<template>
   <div class="main-box">
     <HeadLine goback>{{ branchForm.we_name }}</HeadLine>
    
    <div class="form-box">
        <el-form
            :model="branchForm"
            ref="branchForm"
            label-width="120px" 
            size="small"
        >
            <div class="title"><span></span>部门直属编制<span>*部门总编制 = 部门直属编制 + 子部门编制</span></div>
            <el-form-item label="正式编制：">
                <el-input v-model="branchForm.formal_num" :maxlength="max_length"></el-input>
            </el-form-item>
            <el-form-item label="非正式编制：">
                <el-input v-model="branchForm.informal_num" :maxlength="max_length"></el-input>
            </el-form-item>
            <div class="title title2"><span></span>岗位编制<span @click="postDialogShow">选择岗位</span></div>
            <!-- <el-form-item v-for="item in branchForm.position_config" :key="item.id" :label="item.title+'：'" :prop="`rules_${item.position_no}`"> -->
            <el-form-item v-for="item in branchForm.position_config" :key="item.id" :label="item.title+'：'" >
                <el-input v-model="item.num" :maxlength="max_length"></el-input>
            </el-form-item>
            <div class="btns">
              <el-button size="small" type="primary" @click="keepDate">保存</el-button>
              <el-button size="small" @click="$router.back()">取消</el-button>
            </div>
        </el-form>
    </div>

    <!-- 选择岗位弹层 -->
    <el-dialog
      class="dialog"
      title="选择岗位"
      width="720px"
      :visible.sync="postDialog"
      destroy-on-close
    >   
        <div class="main">
            <div class="left">
                <div class="query-form">
                    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
                        <el-form-item label="">
                            <TreeSelect v-model="queryForm.treeId" :data="treeData" :props="treeProps" placeholder="岗位分类" />
                        </el-form-item>
                        <el-form-item label="">
                            <el-input
                                size="small"
                                v-model="queryForm.position_no"
                                placeholder="岗位编码"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input
                                size="small"
                                v-model="queryForm.title"
                                placeholder="岗位名称"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-button size="small" type="primary" @click="search">查询</el-button>
                            <el-button size="small" @click="reset">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="title">岗位</div>
                    <div class="checkboxs">
                        <el-checkbox-group v-model="checkedPosition">
                            <el-checkbox v-for="city in position" :label="city.id" :key="city.id">{{ city.title }}<span class="code">{{ city.position_no }}</span></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="title">已选择的岗位</div>
                <div class="list">
                    <div v-for="(city, index) in checkedPositionList" :key="index" class="li">
                        <span>{{ city.title }}</span>
                        <span>{{ city.position_no }}</span>
                        <span @click="deleteCheckedCitie(city.id)"><el-icon class="el-icon-close"></el-icon></span>
                    </div>
                </div>
            </div>
        </div>
          

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="postDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmPostList">确定</el-button>
      </div>
    </el-dialog>

   </div>
</template>
<script>
import { authiruzed, setAuthiruzed } from "@/api/hrm/authorized";
import { positionType, positionList} from "@/api/hrm/position";

export default {
   name: 'modifyCompile',
   data() {
     return {
        max_length: 10,
        we_id: "",
        // 岗位信息
       branchForm: {
        formal_num: 0,
        informal_num: 0,
        position_config: []
       },
       // 手动添加的岗位配置数据
       branchFormPosition: [],
       //  选择岗位
       postDialog: false,
       queryForm: {
            position_type: "",
            title: "",
            position_no: "",
        },
        position_type: "",
        // 树形选框数据
        treeData: [],
        treeProps: {
            label: 'title',
            children: 'child'
        },
        // 弹层 选中项
        checkedPosition: [],
        position: [],
     }
   },
   computed: {
    // 选中的岗位列表
     checkedPositionList: {
        get: function() {
            if(this.checkedPosition.length > 0 && this.position.length > 0 ){
                return this.position.filter(i => (i.id === this.checkedPosition.find(item => i.id === item)))
            }else{
                return []
            }
        },
        set: function(v) {
            this.checkedPosition = v.filter(i => this.position.find(item => item.id === i.id)).map(i => i.id);
        }
     }
   },
   async created() {
     this.we_id = this.$route.query.id;
     await this.getAuthiruzed();
     await this.getPositionType();
   },
   methods: {
    // 获取部门编制列表
    async getAuthiruzed() {
      await authiruzed({we_id: this.we_id}).then(res => {
          this.branchForm = {
            formal_num: res.data.formal_num ? res.data.formal_num : 0,
            informal_num: res.data.informal_num ? res.data.informal_num : 0,
            position_config: res.data.position_config ? res.data.position_config : [],
            we_name: res.data.we_name,
          }
      })
    },
    // 获取岗位分类下拉项数据
    async getPositionType() {
      await positionType().then(res => {
        this.treeData = [res.data];
        this.position_type = [res.data][0].id;
        this.queryForm.position_type = [res.data][0].id;
      })
    },
    // 获取岗位列表
    async getPositionList() {
      await positionList(this.queryForm).then(res => {
        this.position = res.data;
      })
    },
    // 选择岗位弹出
    async postDialogShow(){
        await this.search();
        this.checkedPositionList = this.branchForm.position_config;
        this.postDialog = true;
    },
    // 查询
    async search() {
        await this.getPositionList();
    },
    // 重置
    reset() {
        this.queryFormReset();
        this.search();
    },
    // 重置 queryForm
    queryFormReset() {
        this.queryForm = {
            position_type: this.position_type,
            title: "",
            position_no: "",
        }
    },
    // 删除已选中
    deleteCheckedCitie(id){
        this.checkedPosition = this.checkedPosition.filter(i => i !== id)
    },
    // 选择岗位弹出 确认
    confirmPostList(){
        this.postDialog = false;
        this.branchFormPosition = this.checkedPositionList;
        // 动态处理 最终的校验项以及校验规则项
        if(this.branchFormPosition.length > 0){
            let arr = [];
            for (let item of this.branchFormPosition) {
                arr.push({
                    id: item.id,
                    title: item.title,
                    position_no: item.position_no,
                    num: 0,
                });
            }
            this.branchForm.position_config = arr;
        }else{
            this.branchForm = {
                formal_num: 0,
                informal_num: 0,
                position_config: [],
            }
        }
    },
    // 保存
     keepDate(){
        this.$refs.branchForm.validate((valid) => {
          if (valid) {
            let data = JSON.parse(JSON.stringify(this.branchForm));
            data.we_id = this.we_id;
            if(this.nonnegativeNumber(data)) {
                setAuthiruzed(data).then(res => {
                    this.$message({
                        showClose: true,
                        message: res.errmsg ? res.errmsg : 'success',
                        type: 'success'
                    });
                    this.$router.back();
                }).catch((error) => {
                    this.$message({
                        showClose: true,
                        message: error.errmsg,
                        type: 'error'
                    });
                })
            }
          } else {
            return false;
          }
        });
     },
        // 对所有输入项进行校验
        nonnegativeNumber(data) {
            if (data.position_config.length > 0) {
                let no = data.position_config.some(i => (i.num*1 < 0 || isNaN(i.num*1)));
                if(no) {
                    this.$message({
                        showClose: true,
                        message: "所有输入项应为非负整数",
                        type: 'error'
                    });
                    return false;
                } else {
                    if(data.formal_num*1 < 0 || data.informal_num*1 < 0 || isNaN(data.formal_num*1) || isNaN(data.informal_num*1)) {
                        this.$message({
                            showClose: true,
                            message: "所有输入项应为非负整数",
                            type: 'error'
                        });
                        return false;
                    } else {
                        return true;
                    }
                }
            } else {
                if(data.formal_num*1 < 0 || data.informal_num*1 < 0 || isNaN(data.formal_num*1) || isNaN(data.informal_num*1)) {
                    this.$message({
                        showClose: true,
                        message: "所有输入项应为非负整数",
                        type: 'error'
                    });
                    return false;
                } else {
                    return true;
                }
            }
        },
   }
};
</script>
<style lang='less' scoped>
.form-box{
    width: 35%;
    padding: 24px 50px;
    // 标题内部样式 
  .title{
    margin-bottom: 22px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 700;
    color: #555555;
    span:nth-child(1){
      display: inline-block;
      width: 4px;
      height: 22px;
      background: #1AAC88;
      margin-right: 6px;
    }
    span:nth-child(2){
      font-weight: 400;
      color: #AAAAAA;
      margin-left: 40px;
    }
  }
  .title2 {
    padding-top: 22px;
    span:nth-child(2){
        color: #1AAC88;
        text-decoration: underline;
        cursor: pointer;
    }
  }
  /deep/.el-form-item{
    // width: 20%;
    padding-left: 20px;
  }
  .btns{
    display: flex;
    justify-content: center;
    margin-top: 44px;
  }
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
    padding: 0 16px ;
  }
  /deep/.el-dialog__footer {
    height: 52px;
    border-top: 1px solid #f0f0f0;
    padding: 10px 24px;
  }
  // 中心内容样式
  .main{
    height: 420px;
    display: flex;
    .left{
        width: 420px;
        height: 420px;
        padding: 24px 24px 0 0;
        border-right:1px solid #F0F0F0;
        .el-form {
            padding-left: 8px;
        }
        /deep/.el-form-item{
            margin-right: 0;
            margin-bottom: 0;
            .el-form-item__content{
                width: 177px;
            }
        }
        /deep/.el-form-item:nth-child(1){
            margin-right: 8px;
        }
        /deep/.el-form-item:nth-child(3){
            margin-right: 8px;
        }
        /deep/.el-button+.el-button{
            margin-left: 8px
        }
        .title{
            padding: 24px 0 14px 8px;
            font-size: 12px;
            font-family: PingFang-SC-Medium, PingFang-SC;
            font-weight: 500;
            color: #8C8C8C;
        }
        .checkboxs{
            height: 245px;
            overflow-y: auto;
            overflow-x: hidden;
            /deep/.el-checkbox-group{
                display: grid;
                grid-template-columns: repeat(1, 100%);
                .el-checkbox{
                    width: 380px;
                    height: 36px;
                    line-height: 36px;
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #434343;
                    padding-left: 8px;
                    margin-right: 0px;
                    .code{
                        display: inline-block;
                        margin-left: 8px;
                        padding: 1px 8px;
                        background: #F5F5F5;
                        border-radius: 2px;
                        border: 1px solid #D9D9D9;
                        font-size: 12px;
                        font-weight: 500;
                        color: #8C8C8C;
                        text-align: center;
                    }
                }
                .el-checkbox__input.is-checked+.el-checkbox__label{
                    color: #434343;
                }
                .el-checkbox:hover{
                    background: #F5F5F5;
                }
            }
        }
        .checkboxs::-webkit-scrollbar{
            display: none;
        }
        
    }
    .right{
        width: 300px;
        height: 420px;
        padding: 24px 16px 0px;
        .title{
            margin-left: 8px;
            font-size: 12px;
            font-family: PingFang-SC-Medium, PingFang-SC;
            font-weight: 500;
            color: #8C8C8C;
            margin-bottom: 16px;
        }
        .list{
            height: 320px;
            overflow-y: auto;
            overflow-x: hidden;
            .li{
                padding: 0 8px;
                height: 36px;
                display: flex;
                align-items: center;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #434343;
                cursor: pointer;
                & span:nth-child(2){
                    display: inline-block;
                    margin-left: 8px;
                    padding: 1px 8px;
                    background: #F5F5F5;
                    border-radius: 2px;
                    border: 1px solid #D9D9D9;
                    font-size: 12px;
                    font-weight: 500;
                    color: #8C8C8C;
                    text-align: center;
                }
                & span:nth-child(3){
                    margin-left: auto;
                }
            }
            .li:hover{
                background: #F5F5F5;
            }
        }
    }
  }
}
</style>