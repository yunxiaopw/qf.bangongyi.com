<template>
  <div class="mideel-box">
    <div class="middle-drag-area">
      <div class="iphone">

        <div class="iphone-top">
          <span class="camera"></span>
          <span class="sensor"></span>
          <span class="speaker"></span>
        </div>
        <div class="top-bar"></div>
        <div class="iphone-screen">
          <el-form id="chatContainer" size="small" label-position="right" label-width="100px">
            <!-- 拖拽展示组件 -->
            <draggable v-model="list_data" v-bind="{ group: 'people'}" class="container-form" handle=".movetag"
              :move='onMove' @start="onStart" @end="onEnd">
              <!-- 循环展示拖拽的组件 -->
              <div v-for="(item, index) in list_data" :key="index" class="formitem-style">
                <!-- 栅格布局 -->
                <template>
                  <WidgetFormItem v-if="item && item.string" :index='index' :eleItem="item" :eleIndex="index"
                    :listdata="list_data">
                  </WidgetFormItem>
                </template>
              </div>
            </draggable>
          </el-form>
        </div>
        <div class="buttons">
          <span class="on-off"></span>
          <span class="sleep"></span>
          <span class="up"></span>
          <span class="down"></span>
        </div>
        <div class="bottom-bar"></div>
        <div class="iphone-bottom">
          <span></span>
        </div>
      </div>

    </div>
    <el-button @click="sumbitForm" type="primary" size="small" class="sumbit-btn">保存</el-button>
  </div>

</template>

<script>
  import {
    mapState,
  } from "vuex";
  import draggable from "vuedraggable";
  import WidgetFormItem from "./WidgetFormItem"
  export default {
    components: {
      draggable,
      WidgetFormItem
    },

    watch: {
      'lowestLevel'() {
        this.$nextTick(() => {
          const scrollTarget = document.getElementById('chatContainer');
          scrollTarget.scrollTop = scrollTarget.scrollHeight;
        })
      },


      changeConfigFormData() {
        this.list_data = JSON.parse(JSON.stringify(this.configFormData))
        // console.log(this.list_data, 'this.list_data')
      },
    },
    computed: {
      ...mapState({
        componentsIndex: (state) => state.formItem.componentsIndex,
        configFormData: (state) => state.formItem.configFormData,
        changeConfigFormData: (state) => state.formItem.changeConfigFormData,
        lowestLevel: (state) => state.formItem.lowestLevel,
      }),
    },
    created() {
      this.list_data = JSON.parse(JSON.stringify(this.configFormData))
    },

    data() {
      return {
        list_data: [],
        isChange: false,
        type: {

        }

      }
    },
    mounted() {


    },
    methods: {
      sumbitForm() {
        let data = JSON.parse(JSON.stringify(this.list_data));
        data.forEach((item, index) => {
          item.sort = index + 1
          delete item.string
          delete item.dragPosition
          if (item.bgy_field_sort) {
            // delete item.type
            delete item.system
          }
          if (item.type == 'single_choice' || item.type == 'mutil_choice') {
            item.other_list = item.other_list[0]
            item.choice_list = item.choice_list.sort((n1,n2) => {
                return n1.sort - n2.sort
            })
            console.log(item.choice_list)
          }
          if (item.type == 'two_drop_down' && item.is_bgy_default_field == false) {
            // let data = []
            // let arr = []
            // data.push(item.firstValueData)
            // for (let i in item.secondValueData) {
            //   arr.push(...item.secondValueData[i])
            // }
            // data.push(arr)
            // item.drop_down_list = data
            // if(item.firstValueData == ''){
            //     item.checked_sort
            // }
            item.checked_sort = [item.firstDefault, item.secondaryDefault]
            // delete item.firstValueData
            // delete item.secondValueData
            delete item.firstDefault
            delete item.secondaryDefault
          }
        })


        let url = process.env.NODE_ENV == 'development' ? '/api/attend/admin/tplapi/save-custom' :
         process.env.API_HOST + '/attend/admin/tplapi/save-custom'
        // 在请求发送前
        url = decodeURI(encodeURI(url).replace(/%E2%80%8B/g, ''))
        this.$axios({
          method: 'post',
          url: url,
          headers: {
            'Content-Type': 'application/json',
            'type-id': this.getUrlParams("id"),
            'token': this.getUrlParams("token"),
            'sid': this.getUrlParams("sid"),
          },
          data: {
            config: data
          }
        }).then((response) => { //这里使用了ES6的语法
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          //友盟埋点
          this.handelPoint(data);
        }).catch((err) => {
          this.$message.error('保存失败');

        });
      },
      getUrlParams(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      onMove(e) {
        this.isChange = true
        // e.willInsertAfter == false 是拖入上面
        let data = JSON.parse(JSON.stringify(this.list_data))
        // console.log(e.relatedContext.element.dragPosition)
        // console.log(e.relatedContext.element)
        if (e.relatedContext.element.dragPosition == 'top') {
          if (e.willInsertAfter) {
            this.returnToOriginalPosition(data)
            return false
          }
        } else if (e.relatedContext.element.dragPosition == 'bottom') {
          if (!e.willInsertAfter) {
            this.returnToOriginalPosition(data)
            return false
          }
        }
      },
      onStart() {},
      onEnd(e) {
        if (this.isChange) {
          this.$store.commit('handeleChangeComponentItemPosition', {
            row: this.list_data,
            index: e.newIndex
          })
        }

      },
      returnToOriginalPosition(data) {
        this.isChange = false
        this.list_data = data
      },
      handelPoint(data){
        data.forEach(item=>{
          window.aplus_queue && window.aplus_queue.push({
            action: 'aplus.record',
            arguments: [`templete_${item.type}`,'CLK',{}]
          });
        })
        window.aplus_queue && window.aplus_queue.push({
          action: 'aplus.record',
          arguments: ['button_save_holiday_templete','CLK',{}]
        });
      }

    }
  }

</script>

<style>
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }

  /* .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
      background: rgb(250, 248, 248);
  } */
  .mideel-box {
    width: 62%;
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center; */


  }

  .sumbit-btn {
    position: relative;
    left: 50%;
    margin-left: -28px !important;
  }

  .middle-drag-area {
    /* background: #000; */
    width: 100%;
    height: 90%;
    overflow: hidden;
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .el-form-item--small .el-form-item__content,
  .el-form-item--small .el-form-item__label {
    display: flex;
  }

  .container-form {
    /* background: #dedbdb; */
    width: 100%;
    height: 100%;
  }

  /* 样式1 */
  .iphone {
    box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px #999, 0 0 30px 0px rgba(0, 0, 0, 0.7);
    border: 5px solid #d9dbdc;
    background: #f8f8f8;
    padding: 15px;
    border-radius: 50px;
    height: 877px;
    width: 423px;
    position: relative;
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
  }

  .iphone-top {
    padding: 5px 110px 40px;
    position: relative;
  }

  .iphone-top .speaker {
    display: block;
    width: 70px;
    height: 6px;
    margin: 0 auto;
    border-radius: 6px;
    background: #292728;
  }

  .iphone-top .camera {
    display: block;
    margin: 0 auto;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    margin-bottom: 13px;
    background: #333;
  }

  .iphone-top .sensor {
    display: block;
    width: 15px;
    height: 15px;
    float: left;
    background: #333;
    margin-top: -5px;
    border-radius: 50%;
  }

  .iphone .top-bar,
  .iphone .bottom-bar {
    display: block;
    width: 423px;
    height: 15px;
    border-left: 5px solid #BBB;
    border-right: 5px solid #BBB;
    position: absolute;
    left: -5px;
  }

  .iphone .top-bar {
    top: 65px;
  }

  .iphone .bottom-bar {
    bottom: 65px;
  }

  .iphone-screen {
    background: #eee;
    border: 1px solid #fff;
    height: 677px;
    width: 375px;
    margin: 0 auto;
    border: 2px solid rgba(0, 0, 0, 0.9);
    border-radius: 3px;
    /* overflow: hidden; */
    padding: 5px;
    overflow: auto;
  }

  .iphone-screen img {
    width: 100%;
  }

  .iphone .buttons .on-off,
  .iphone .buttons .up,
  .iphone .buttons .down,
  .iphone .buttons .sleep {
    display: block;
    background: #CCC;
    position: absolute;
    border-radius: 2px 0px 0px 2px;
  }

  .iphone .buttons .on-off {
    height: 40px;
    width: 3px;
    top: 100px;
    left: -8px;
  }

  .iphone .buttons .up,
  .iphone .buttons .down,
  .iphone .buttons .sleep {
    height: 60px;
    width: 5px;
    left: -10px;
  }

  .iphone .buttons .up {
    top: 170px;
  }

  .iphone .buttons .down {
    top: 250px;
  }

  .iphone .buttons .sleep {
    left: auto;
    right: -10px;
    top: 170px;
    border-radius: 0px 2px 2px 0px;
  }

  .iphone-bottom {
    padding: 10px 0 0;
  }

  .iphone-bottom span {
    display: block;
    margin: 0 auto;
    width: 68px;
    height: 68px;
    background: #ccc;
    border-radius: 50%;
    background: -webkit-linear-gradient(315deg, #303233 0%, #b5b7b9 50%, #f0f2f2 69%, #303233 100%);
    background: linear-gradient(135deg, #303233 0%, #b5b7b9 50%, #f0f2f2 69%, #303233 100%);
    position: relative;
  }

  .iphone-bottom span:after {
    content: "";
    display: block;
    width: 60px;
    height: 60px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    left: 4px;
    top: 4px;
  }

  #chatContainer {
    height: 100%;
    overflow: auto;
  }

</style>
