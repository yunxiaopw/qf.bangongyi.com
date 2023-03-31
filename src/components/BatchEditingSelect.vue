<template>
  <el-dialog :close-on-click-modal='false' title="批量编辑" :visible.sync="isBatchEditingSelect" width="40%"
    :before-close="clonseBatchEditingSelect">
    <span style="margin-bottom:10px;display:block">每个选项换行进行间隔。</span>
    <div class="content-box">
      <div class="textarea" ref="textarea" v-html="textarea"
        style="width:100%;height:100%" contenteditable='true'>
      </div>

    </div>
    <span style="display:flex;justify-content: space-between;" slot="footer" class="dialog-footer">
      <div></div>
      <div style="display:flex">
        <el-button size="small" @click="clonseBatchEditingSelect">取 消</el-button>
        <el-button size="small" type="primary" @click="sumbitBatchEditingSelect">确 定</el-button>
      </div>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    props: ['isBatchEditingSelect', 'batchData'],
    data() {
      return {
        textarea: ''
      }
    },
    created() {
      let str = ''
      this.batchData.forEach(item => {
        str = str + '<div>' + item.name + '</div>'
      });

      this.textarea = str
    },
    methods: {
      clonseBatchEditingSelect() {
        this.$emit('clonseBatchEditingSelect')
      },
      sumbitBatchEditingSelect() {
        let arr = []
        let data = []
        let divArr = this.$refs.textarea.innerText.replace(/[\r\n]/g, "&").split('&')
        divArr.forEach(item => {
          
          item = item.replace(/[\r\n]/g, '').replace(/[ ]/g, '');
          item = item.replace(/' '/g, '')
          if (Boolean(item)) {
            arr.push(item)
          }
        })
        // return
        arr.forEach((item, index) => {
          data.push({
            name: item,
            sort: index
          })
        })
        this.$emit('sumbitBatchEditingSelect', data)
      }
    }
  }

</script>

<style>
  .el-dialog__body {
    padding: 10px 20px;
  }

  .content-box {
    width: 100%;
    height: 300px;
    border: 1px solid #b9b0b0;
    padding: 10px;
    overflow: auto;
    border-radius: 2px;
    color: rgb(51, 51, 51);
    border-color: rgb(223, 223, 223);

  }

  .textarea {
    border: 0;
    outline: none;
    resize: none;
    font-size: 14px;
    height: 295px;

  }

</style>
