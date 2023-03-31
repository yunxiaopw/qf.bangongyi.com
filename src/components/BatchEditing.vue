<template>
  <el-dialog :close-on-click-modal='false' title="批量编辑" :visible.sync="isBatchEditing" width="40%"
    :before-close="clonseBatchEditing">

    <span style="margin-bottom:10px;display:block"> 每个选项通过“-”进行区隔。</span>
    <div class="content-box">

      <div class="textarea" ref="textarea" v-html="textarea" style="width:100%;height:100%" contenteditable='true'>
      </div>

    </div>
    <span style="display:flex;justify-content: space-between;" slot="footer" class="dialog-footer">
      <div></div>
      <div style="display:flex">
        <el-button size="small" @click="clonseBatchEditing">取 消</el-button>
        <el-button size="small" type="primary" @click="sumbitBatchEditing">确 定</el-button>
      </div>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    props: ['isBatchEditing', 'batchEditingData'],
    data() {
      return {
        data: {},
        textarea: ''

      }
    },
    created() {
      let str = ''
      this.batchEditingData.forEach(element => {
        element.children.forEach(data => {
          str = str + '<div>' + element.caption + '-' + data + '</div>'
        })

      });

      this.textarea = str
    },
    methods: {
      clonseBatchEditing() {
        this.$emit('clonseBatchEditing')
      },
      sumbitBatchEditing() {
        let arr = []
        let fdata = []
        let sdata = {}
        let divArr = this.$refs.textarea.innerText.replace(/[\r\n]/g, "&").split('&')
        divArr.forEach(item => {
          item = item.replace(/[\r\n]/g, '').replace(/[ ]/g, '');
          item = item.replace(/' '/g, '')
          if (Boolean(item)) {
            arr.push(item)
          }

        })
        let obj = {};
        let data = []
        
        arr.forEach((item, index) => {
          let res = item.split('-')
        res.splice(2)
          if (obj[res[0]]) {
             
            obj[res[0]] = `${obj[res[0]]}-${res[1]}`
          } else {
            obj[res[0]] = item
        
          }

        })
        data = Object.values(obj)
       
        data.forEach((item, index) => {
          sdata[index] = []
          let arr =
            item.split('-').forEach((element, idx) => {
              if (idx == 0) {
                fdata.push({
                  name: element,
                  sort: index
                })
              } else {
                sdata[index].push({
                  name: element,
                  sort: idx - 1
                })
              }
            })



        })
       

        this.$emit('sumbitBatchEditing', fdata, sdata)

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
