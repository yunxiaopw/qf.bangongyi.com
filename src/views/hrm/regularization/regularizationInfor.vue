
<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine goback>转正详情</HeadLine>

    <!-- 内容区 -->
    <div style="padding: 24px 48px">
      <div class="staff_care_title">转正信息</div>
        <div class="staffing">
          <div class="item" v-for="item in regularizationFormDict" :key="item.key">
            <div class="item_label">{{ item.title }}：</div>
            <div class="item_text">{{ $vj(correctsInfoData.info, `${item.key}.text`) }}</div>
          </div>
        </div>

      <div class="staff_care_title">转正状态</div>
      <div class="staffing">
        <div class="item">
          <div class="item_label">转正审批状态：</div>
          <div class="item_text">{{ $vj(correctsInfoData.status, 'status') }}</div>
        </div>
        <div class="item">
          <div class="item_label">发起人：</div>
          <div class="item_text">{{ $vj(correctsInfoData.status, 'creator_name') }}</div>
        </div>
        <div class="item">
          <div class="item_label">发起时间：</div>
          <div class="item_text">{{ $vj(correctsInfoData.status, 'launch_time_desc') }}</div>
        </div>
      </div>

      <div class="staff_care_title">转正审批</div>
      <div class="staffing">
        <div class="item">
          <div class="item_label">审批单：</div>
          <div class="item_text odd">{{ $vj(correctsInfoData.approval, 'id') }}</div>
        </div>
        <div class="item">
          <div class="item_label">发起时间：</div>
          <div class="item_text">{{ $vj(correctsInfoData.approval, 'start_time_desc') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dictFormData } from "@/api/hrm/staff/index";
import { correctsInfo } from "@/api/hrm/regularization";
import { setMoreInputI_item } from "@/utils/utils"

export default {
  name: "regularizationInfor",
  data () {
    return {
      id: this.$route.query.id,
      correctsInfoData: {},
      regularizationFormDict: [],
    }
  },
  async created () {
    await this.getDictFormData();
    this.getCorrectsInfo();
  },
  methods: {
    // 获取字典列表
    async getDictFormData() {
      await dictFormData().then(res => {
        // 转正表单字典项
        this.regularizationFormDict = setMoreInputI_item(res.data.filter(i => i.type === '4')[0].dict);
      })
    },
    // 获取转正信息
    getCorrectsInfo() {
      correctsInfo({id:this.id}).then(res => {
        this.correctsInfoData = res.data;
      })
    },
  },
}
</script>

<style scoped lang="less">
.staff_care_title {
  font-size: 16px;
  font-weight: 500;
  color: #262626;
  padding-left: 16px;
  margin: 16px 0;
  position: relative;
}
.staff_care_title:nth-child(1){
  margin-top: 0;
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
.staffing {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 24px;
}
.item {
  margin-bottom: 8px;
  display: flex;
  .item_label {
    width: 120px;
    text-align: right;
    font-size: 14px;
    font-weight: 400;
    color: #8C8C8C;
  }
  .item_text {
    font-size: 14px;
    font-weight: 400;
    color: #1F1F1F;
  }
  .odd, .download{
    color: #1AAC88;
  }
  .download {
    cursor: pointer;
  }
}
</style>
