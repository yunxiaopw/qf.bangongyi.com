<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine>员工关怀配置</HeadLine>

    <!-- 内容 -->
    <div class="staff_care_content">
      <div v-for="item in reminds" :key="item.id" class="staff_care_content_item">
        <div class="staff_care_title">{{ item.title }}</div>
        <div class="staff_care_list">
          <div v-for="(c_item, c_index) in item.child" :key="c_index" class="staff_care_item">
            <span class="title">{{ c_item.title }}</span>
            <span v-if="c_item.title === '节日祝福'" class="center">{{ c_item.festival_list }}</span>
            <span v-else-if="c_item.title === '生日提醒' || c_item.title === '入职纪念日提醒'" class="center">{{ `提前${c_item.remind_day}天，${c_item.remind_time}点发送` }}</span>
            <span v-else class="center">{{ `提前${c_item.send_day}天，${c_item.send_time}点发送` }}</span>
            <span class="go_to_set center" @click="goRouter(c_item)">去设置</span>
            <el-switch v-if="c_item.title !== '生日提醒' && c_item.title !== '入职纪念日提醒'" class="end" v-model="c_item.is_open" @change="remindEdit(c_item)"></el-switch>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { remindList, remindSetOpenEdit } from "@/api/staffCare/index"

export default {
  name: "staffCareSetting",
  data() {
    return {
      reminds: [],
    };
  },
  created() {
    this.getRemindList();
  },
  methods: {
    // 获取员工关怀设置列表
    getRemindList() {
      remindList().then(res => {
        if(res.data && res.data.length > 0) {
          this.reminds = this.setReminds(res.data);
        }
      })
    },
    // 处理reminds数据格式
    setReminds(arr) {
      let newArr = [];
      newArr = arr.reduce((a, b)=> {
        b.is_open = Boolean(Number(b.is_open));
        b.is_open_remind = Boolean(Number(b.is_open_remind));
        if(b.type === 'birthday' || b.type === 'anniversary') {
          a = [...a, {title: b.type === 'birthday' ? '生日关怀' : '入职纪念日关怀', child: [
            {
              title: b.type === 'birthday' ? '生日祝福' : '入职纪念日祝福',
              ...b
            },
            {
              title: b.type === 'birthday' ? '生日提醒' : '入职纪念日提醒',
              ...b
            }
          ]}];
          return [...a];
        }else if(b.type === 'festival'){
          a = [...a, {title: '节日关怀', child: [
            {
              title: '节日祝福',
              ...b
            }
          ]}];
          return [...a];
        }else {
          return [];
        }
      }, [])
      // console.log(newArr);
      return newArr;
    },
    // 设置是否提醒
    remindEdit({id, is_open, is_open_remind, title}) {
      let isRemind = (title === '生日提醒' || title === '入职纪念日提醒');
      let data = { id: Number(id) };
      if(isRemind) {
        data.is_open_remind = Number(is_open_remind)
      }else{
        data.is_open = Number(is_open)
      }
      remindSetOpenEdit(data).then(res => {
        if(res.errno === 0) {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          });
        }else{
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'error'
          });
          this.getRemindList();
        }
      }).catch(error => {
        this.$message({
          showClose: true,
          message: error.errmsg,
          type: 'error'
        });
      })
    },
    // 路由跳转
    goRouter({id, title, type}) {
      let path = title.indexOf('祝福') !== -1 ? '/setBlessing' : '/setReminders';
      type = type === 'birthday' ? '1' : type === 'anniversary' ? '2' : '3'
      this.$router.push({path, query: {id, type}});
    },
  }
};
</script>
<style lang="less" scoped>
.staff_care_content {
  padding: 16px 24px;
  .staff_care_title {
    font-size: 16px;
    font-weight: 500;
    color: #262626;
    padding-left: 8px;
    margin-bottom: 16px;
    position: relative;
    margin-bottom: 16px;
    .title_icon {
      margin-right: 6px;
    }
  }
  .staff_care_title::before {
      content: '';
      display: inline-block;
      width: 2px;
      height: 14px;
      background: #1AAC88;
      border-radius: 2px 2px 0px 0px;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
  }
  .staff_care_list {
    margin-bottom: 24px;
    .staff_care_item {
      box-shadow: 0px 2px 4px 0px #FAFAFA;
      border-radius: 2px;
      border: 1px solid #F0F0F0;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 16px;
      align-items: center;
      padding: 16px 32px;
      font-size: 14px;
      font-weight: 400;
      color: #8C8C8C;
      .title {
        font-weight: 500;
        color: #141414;
      }
      .center {
        justify-self: center;
      }
      .go_to_set {
        color: #1AAC88;
        cursor: pointer;
      }
      .end {
        justify-self: end;
      }
    }
    .staff_care_item+.staff_care_item {
      margin-top: 16px;
    }
  }
}
</style>
