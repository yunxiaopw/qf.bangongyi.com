<template>
   <div class="Tolead">
     <el-button size="small" @click="isShow = true" disabled>导入</el-button>

    <!-- 导出弹层 -->
    <el-dialog
      class="dialog"
      :title="title"
      width="480px"
      :visible.sync="isShow"
      destroy-on-close
    >
      <div class="li">
        1、<span>下载模板</span>
      </div>
      <div class="li">
        2、
        <el-upload
        class="upload-demo"
        ref="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small">选取文件</el-button>
        <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
        </el-upload>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="isShow = false"
          >取消</el-button
        >
        <el-button size="small" type="primary" @click="submitForm('delete')"
          >保存</el-button
        >
      </div>
    </el-dialog>
   </div>
</template>
<script>
export default {
   name: 'Tolead',
   props: {
     title: {
        type: String,
        default: '导入'
     }
   },
   data() {
     return {
       isShow: false,
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
     }
   },
   computed: {
     
   },
   watch: {
     
   },
   mounted() {
     
   },
   methods: {
    submitUpload() {
        this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
        console.log(file);
    }
   }
};
</script>
<style lang='less' scoped>
.Tolead{
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
    font-size: 15px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 400;
    color: #333333;
    .li:nth-child(1) {
        margin-bottom: 20px;
        span{
            text-decoration: underline;
            color: #5896C9;
            cursor: pointer;
        }
    }
    .li:nth-child(2){
        margin-bottom: 30px;
        display: flex;
    }
  }
  /deep/.el-dialog__footer {
    height: 52px;
    border-top: 1px solid #f0f0f0;
    padding: 10px 24px;
  }
}
</style>