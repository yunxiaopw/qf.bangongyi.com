
<template>
  <div class="main-box">
    <!-- 页头 -->
    <HeadLine goback>异动详情</HeadLine>

    <!-- 内容区 -->
    <div style="padding: 24px 48px">
      <div class="staff_care_title">异动信息</div>
      <div class="staffing">
        <div v-for="item in adjustFormDict" :key="item.key" class="item">
          <div class="item_label">{{ item.title }}：</div>
          <div class="item_text">{{ $vj(adjustInfoData.adjust_data, `${item.key}.text`) }}</div>
        </div>
      </div>

      <div class="staff_care_title">异动状态</div>
      <div class="staffing">
        <div class="item">
          <div class="item_label">异动状态：</div>
          <div class="item_text">{{ $vj(adjustInfoData.adjust, 'status_desc') }}</div>
        </div>
        <div class="item">
          <div class="item_label">发起人：</div>
          <div class="item_text">{{ $vj(adjustInfoData.adjust, 'creator_name') }}</div>
        </div>
        <div class="item">
          <div class="item_label">发起时间：</div>
          <div class="item_text">{{ $vj(adjustInfoData.adjust, 'initiation_time_desc') }}</div>
        </div>
      </div>

      <div class="staff_care_title">异动审批</div>
      <div class="staffing">
        <div class="item">
          <div class="item_label">离职审批单：</div>
          <div class="item_text">{{ $vj(adjustInfoData.flow_data, 'flow_id') }}</div>
        </div>
        <!-- <div class="item">
          <div class="item_label">发起时间：</div>
          <div class="item_text">{{ $vj(adjustInfoData.flow_data, 'flow_id') }}</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { dictFormData } from "@/api/hrm/staff/index";
import { adjustInfo } from "@/api/hrm/transactedMode";
import { setMoreInputI_item } from "@/utils/utils";

export default {
  name: "transactedModeInfor",
  data () {
    return {
      id: this.$route.query.id,
      // 异动详情
      adjustInfoData: {},
      adjustFormDict: [],
    }
  },
  async created() {
    await this.getDictFormData();
    this.getAdjustInfo();
  },
  methods: {
    // 获取 异动详情
    getAdjustInfo() {
      adjustInfo({id: this.id}).then(res => {
        this.adjustInfoData = res.data;

        // 异动几个固定值做处理
        let obj = {
          staff: {text: res.data.we_name},
          operation_type: {text: res.data.adjust_type_name},
          operation_time: {text: res.data.effective_time_desc},
          operation_reason: {text: res.data.reason},
          remark: {text: res.data.remark},
        }
        this.adjustInfoData.adjust_data = {...this.adjustInfoData.adjust_data, ...obj}
      })
    },
    // 获取字典列表
    async getDictFormData() {
      await dictFormData().then(res => {
        // 异动字典字段
        this.adjustFormDict = setMoreInputI_item(res.data.filter(i => i.type === '5')[0].dict);
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
  min-height: 32px;
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
