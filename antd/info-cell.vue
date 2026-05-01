<template>
  <div class="flex" style="cursor: pointer" @click="clickLogo">
    <div class="w60px h60px">
      <a-image
        :preview="false"
        class="border-rd-6px"
        :width="60"
        :height="60"
        :src="logoUrl"
      />
    </div>
    <div class="table-record-name">
      <CustomOverflowSuspension
        :context="name"
        :custom-title="true"
        :tooltip-style="tooltipStyle"
        :show-value-style="showValueStyle1"
      >
        <template #customTitle>
          <div class="customBox">
            <div class="customTitle">{{ name }}</div>
            <div class="customBody">
              <div>{{ description }}</div>
            </div>
          </div>
        </template>
      </CustomOverflowSuspension>
      <CustomOverflowSuspension
        :context="description"
        :custom-title="true"
        :tooltip-style="tooltipStyle"
        :show-value-style="showValueStyle2"
      >
        <template #customTitle>
          <div class="customBox">
            <div class="customTitle">{{ name }}</div>
            <div class="customBody">
              <div>{{ description }}</div>
            </div>
          </div>
        </template>
      </CustomOverflowSuspension>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    logoUrl: string;
    name: string;
    description: string;
  }>(),
  {
    logoUrl:
      "https://bsy-sdl-web-1308012692.cos.ap-guangzhou.myqcloud.com/middleground/images/ai/ai-not.png",
    name: "",
    description: "",
  },
);
const emit = defineEmits(["click-logo"]);
const clickLogo = () => {
  emit("click-logo");
};
const tooltipStyle = {
  color: "#000000",
  backgroundColor: "#FFFFFF",
  padding: 20,
  height: "auto",
  minHeight: "auto",
  width: "372px",
};
const showValueStyle1 = {
  fontFamily: "PingFang SC, PingFang SC",
  fontWeight: "400",
  fontSize: "14px",
  color: "#4B67F4",
};
const showValueStyle2 = {
  fontFamily: "PingFang SC, PingFang SC",
  fontWeight: "400",
  fontSize: "12px",
  color: "#999999",
};
</script>

<style scoped lang="scss">
.table-record-name {
  text-align: left;
  margin-left: 8px;
  // width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.customBox {
  padding: 10px 0;

  .customTitle {
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 600;
    font-size: 14px;
    color: #262626;
    padding: 0 16px;
  }

  .customBody {
    max-height: 300px;
    overflow-y: auto;
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #8c8c8c;
    padding: 0 16px;

    &::-webkit-scrollbar {
      width: 6px;
      background-color: #d8d8d8;
    }

    /*定义滚动条轨道 内阴影+圆角*/
    &::-webkit-scrollbar-track {
      border-radius: 132px;
      background-color: white;
    }

    // /*定义滑块 内阴影+圆角*/
    // &::-webkit-scrollbar-thumb {
    //   border-radius: 132px;
    //   background-color: rgba(75, 103, 244, 0.6);
    //   cursor: pointer;
    // }
  }
}
</style>
