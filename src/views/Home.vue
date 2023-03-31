<template>
  <div id="home">
    <LeftButtonArea />
    <MiddleDragArea />
    <RightConfigurationArea />
  </div>
</template>

<script>
  import LeftButtonArea from "@/components/LeftButtonArea"
  import MiddleDragArea from "@/components/MiddleDragArea"
  import RightConfigurationArea from "@/components/RightConfigurationArea"

  export default {
    components: {
      LeftButtonArea,
      MiddleDragArea,
      RightConfigurationArea
    },
    mounted() {

    //   console.log(id)
    },
    created() {
       // if(this.getUrlParams("id") == null || this.getUrlParams("token") == null || this.getUrlParams("sid") == null){
       //      window.location.href = process.env.API_HOST
       //     this.$router.push({
       //              name: ''
       //          })
       // }
      let url = process.env.NODE_ENV == 'development' ? '/api/attend/admin/tplapi/get-custom' :
        process.env.API_HOST + '/attend/admin/tplapi/get-custom'

      //初始化调取配置
      this.$axios({
        method: 'get',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'type-id': this.getUrlParams("id"),
          'token': this.getUrlParams("token"),
          'sid': this.getUrlParams("sid"),
        }
      }).then((response) => { //这里使用了ES6的语法
        console.log(response)
        let data = response.data.data == null ? [] :  response.data.data.data.config //请求成功返回的数据
        data.forEach((element, index) => {
          element.string = index + 1
          if (element.title == '请假类型') {
            element.dragPosition = 'bottom';
            element.type = "one_drop_down"
            element.is_required = true
          } else if (element.title == '结束时间') {
            element.dragPosition = 'bottom'
            element.type = "timePicker"
            element.is_required = true
          } else if (element.title == '抄送人') {
            element.dragPosition = 'bottom'
            element.type = "make"
            element.is_required = false
          } else if (element.title == '开始时间') {
            element.dragPosition = 'top'
            element.type = "timePicker"
            element.is_required = true
          } else if (element.title == '请假事由') {
            element.is_required = false
            element.type = 'askForLeaveFor'
            element.dragPosition = 'all'
          } else if (element.title == '下一级审批人') {
            element.is_required = false
            element.dragPosition = 'top'
            element.type = 'nextLower'
          }

          if (element.type == 'single_choice' || element.type == 'mutil_choice') {
            if (element.hasOwnProperty('other_list')) {
              let data = JSON.parse(JSON.stringify(element.other_list))
              delete element.other_list
              element.other_list = [data]
            } else {
              element.other_list = []
            }

          } else if (element.type == 'two_drop_down') {
            element.firstDefault = element.checked_sort[0]
            element.secondaryDefault = element.checked_sort[1]
          }
        });
        // console.log(data)
        this.$store.commit('initConfigFormData', data)
      })
    

    },
    methods: {
      getUrlParams(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
    },
  }

</script>

<style>
  #home {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .el-drawer__wrapper {
    left: auto;
  }

</style>
