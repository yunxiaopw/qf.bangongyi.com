<template>
  <div class="wholeList">
    <draggable
      class="leftCon"
      :list="tolList"
    >
      <div class="leftConLi" v-for="element in tolList" :key="element.id">
        {{ element.name }}
      </div>
    </draggable>
    
    <ul class="oneUl">
      <li
        class="oneLi"
        v-for="(item,index) in tolList"
        :key="index"
      >
        <!--拖拽内容部分-1-->
        <draggable
          v-if="index === 0"
          class="dragArea list-group"
          :list="item.children"
          :clone="clone"
          :group="{ name: 'people', pull: pullFunction }"
          @start="start"
        >
          <div v-for="element in item.children" :key="element.id" class="list-group-item">
            {{ element.name }}
          </div>
        </draggable>
        <!--拖拽内容部分-其他-->
        <draggable
          v-else
          class="dragArea list-group"
          :list="item.children"
          :clone="clone"
          group="people"
        >
          <div v-for="element in item.children" :key="element.id" class="list-group-item">
            {{ element.name }}
          </div>
        </draggable>
      </li>
 
    </ul>
 
    <el-button @click="getNewList">点我看console里面的最新数据</el-button>
  </div>
</template>
 
<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  data() {
    return {
      tolList: [
        {
          name: '第一天',
          children: [
            {
              name: '11111', id: 1
            }
          ]
        }, {
          name: '第二天',
          children: [
            {
              name: 'aaaaa', id: 11
            }, {
              name: 'bbbbbb', id: 12
            }
          ]
        },
        {
          name: '第三天',
          children: [
            {
              name: ',,,111,,', id: 21
            }
          ]
        }
      ],
      controlOnStart: true
    }
  },
  methods: {
    clone({ name, id }) {
      return { name, id: id }
    },
    pullFunction() {
      return this.controlOnStart ? 'clone' : true
    },
    start({ originalEvent }) {
      this.controlOnStart = originalEvent.ctrlKey
    },
    getNewList() {
      let a = this.tolList
      console.log(a)
    }
  }
}
</script>
<style lang="less" scoped>
  .wholeList{
    margin-top:200px;
    width:500px;
    display: flex;
    flex-wrap: wrap;
    .leftCon{
      width: 100px;
      .leftConLi{
        background: #42B974;
        line-height: 80px;
        margin-bottom:10px;
      }
    }
    .oneUl{
      width: calc(100% - 100px);
      .oneLi{
        display: flex;
        height: 80px;
        margin-bottom:10px;
        border:1px solid red;
        .dragArea{
          width: 100%;
          min-height: 30px;
        }
      }
 
    }
  }
</style>