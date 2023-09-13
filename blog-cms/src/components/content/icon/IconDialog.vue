<script setup lang="ts">
import chunk from "lodash/chunk";
import Icon from "./index.vue";

const icons = ref<string[]>([]);
const regex = /\.ri-(.*)::before/;
for (let i = 0; i < document.styleSheets.length; i++) {
  const styleSheet = document.styleSheets[i];
  for (let j = 0; j < styleSheet.cssRules.length; j++) {
    const classRule = styleSheet.cssRules[j] as CSSStyleRule;
    const match = classRule.selectorText?.match(regex);
    if (match) {
      const middlePart = match[1];
      icons.value.push(middlePart);
    }
  }
}

const dialogVisible = ref(false);

// 页码配置项
const paginationOption = ref({
  currentPage: 1,
  pageSize: 72,
  handleSizeChange: (val: number) => {
    paginationOption.value.currentPage = 1;
  },
});

// 按照每页数量分割图标组
const iconChunks = computed(() =>
  chunk(icons.value, paginationOption.value.pageSize)
);

// 获取当前页面所对应的图标组
const currentPageIcons = computed(
  () => iconChunks.value[paginationOption.value.currentPage - 1]
);

// 选中icon 复制name
const instance = getCurrentInstance();
const onSelectIcon = (icon: string) => {
  var codeToCopy = icon;
  var tempInput = document.createElement("input");
  document.body.appendChild(tempInput);
  tempInput.setAttribute("value", codeToCopy);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  instance?.proxy?.$message({
    type: "success",
    message: `拷贝${icon}成功`,
  });
};
</script>

<template>
  <el-button type="primary" @click="dialogVisible = true">图标</el-button>
  <el-dialog v-model="dialogVisible" title="图标选择器" width="60%">
    <el-row :gutter="20">
      <el-col
        :span="2"
        v-for="(icon, index) in currentPageIcons"
        :key="index"
        class="mb-3"
      >
        <el-card
          shadow="hover"
          class="flex justify-center cursor-pointer"
          @click="onSelectIcon(icon)"
        >
          <Icon :name="icon" size="24" />
        </el-card>
        <div class="text-xs font-bold truncate text-center mt-2">
          {{ icon }}
        </div>
      </el-col>
    </el-row>
    <el-pagination
      v-model:current-page="paginationOption.currentPage"
      v-model:page-size="paginationOption.pageSize"
      :page-sizes="[72, 144, 216, 288]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="icons.length"
      @size-change="paginationOption.handleSizeChange"
    />
  </el-dialog>
</template>
