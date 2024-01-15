<script setup lang="ts">
import { queryConfiOSS, queryOSSList, downloadOSSFile, uploadOSS, deleteOSS, type OSSObject, type QueryConfiOSSParmas } from '@/api/services/oss'
import { ElImageViewer } from 'element-plus'
import OSSDialog from '@/components/content/config/OSSDialog.vue';
import Search from '@/components/content/element/Search.vue';
import TableLimit from '@/components/content/element/TableLimit.vue';
import Icon from '@/components/content/icon/index.vue';
const searchList = reactive([
  {
    type: 'upload', props: {
      action: "",
      "auto-upload": false,
      "show-file-list": false,
      "on-change": uploadFileToOss
    },
    children: [
      { type: 'button', value: '上传文件', props: { type: 'primary' } },
    ]
  },
  { type: 'button', value: '配置', events: { click: setOSSConfig } }
])

type TableItem = (Omit<OSSObject, "name"> & { isPath?: boolean; name: string[] | string })
const tableData = ref<TableItem[]>([]);
const tableField = [
  { label: '文件名', args: { minWidth: '250' }, slotKey: 'name' },
  { label: '文件大小', args: { width: '200' }, slotKey: 'size' },
  { label: '更新时间', args: { width: '300' }, slotKey: 'time' },
  { label: '操作', args: { width: '250' }, slotKey: 'action' },
]

type ossListParams = Pick<QueryConfiOSSParmas, 'delimiter' | 'maxKeys'> & { prefixList: string[] }
const ossListParams = reactive<ossListParams>({
  prefixList: [],
  delimiter: '/',
  maxKeys: 50
})

const instance = getCurrentInstance()
const iconStlye = computed(() => (object: TableItem) => {
  if (object.isPath) {
    return {
      name: 'arrow-go-back-fill',
      class: 'text-cyan-500 cursor-pointer',
    }
  } else {
    return {
      name: object.dir ? 'folder-3-fill' : 'file-3-fill',
      class: object.dir ? 'text-amber-500' : 'text-cyan-500',
    }
  }
})
const dateFormat = computed(() => (time?: number) => {
  if (time) {
    return instance?.proxy?.$dayjs(time).format('YYYY年M月D日 HH:mm:ss')
  }
})
const sizeFormat = computed(() => (size: number | undefined) => {
  // 格式化文件大小
  var formattedSize = '';
  if (size === undefined) {
    return formattedSize
  } else if (size < 1024) {
    formattedSize = size + ' B';
  } else if (size < 1024 * 1024) {
    formattedSize = (size / 1024).toFixed(2) + ' KB';
  } else if (size < 1024 * 1024 * 1024) {
    formattedSize = (size / 1024 / 1024).toFixed(2) + ' MB';
  } else {
    formattedSize = (size / 1024 / 1024 / 1024).toFixed(2) + ' GB';
  }
  return formattedSize
})

// 点击返回按钮
function handleBackClick(allow: boolean, index?: number) {
  if (!allow) return
  if (index !== undefined) {
    ossListParams.prefixList.splice(index)
  } else {
    ossListParams.prefixList.pop()
  }
  onQueryOSSList()
}

// 点击文件/文件夹
const isPreview = ref(false)
const viewerList = ref<string[]>([])
function handleObjectClick(object: TableItem) {
  if (object.dir) {
    ossListParams.prefixList.push(object.name as string)
    onQueryOSSList()
  } else {
    viewerList.value = [object.url as string]
    isPreview.value = true
  }
}
function handleCloseViewer() {
  isPreview.value = false
  viewerList.value = []
}

// 下载文件
function handleDownload(object: TableItem) {
  const name = ossListParams.prefixList.join('') + object.name
  downloadOSSFile({ name }).then(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = object.name as string;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url)
  })
}

// 复制文件链接
function handleCopyLink(url: string) {
  navigator.clipboard.writeText(url)
    .then(() => {
      instance?.proxy?.$message({
        type: "success",
        message: "已成功复制到剪贴板",
      });
    })
    .catch((error) => {
      instance?.proxy?.$message({
        type: "error",
        message: "复制到剪贴板时出错",
      });
    });
}

function handleDelOSS(object: TableItem) {
  const data = object.dir
    ? { prefix: ossListParams.prefixList.join("") + object.name }
    : { name: ossListParams.prefixList.join("") + object.name }
  deleteOSS(data).then(() => {
    instance?.proxy?.$message({
      type: "success",
      message: "删除成功",
    });
    onQueryOSSList()
  })
    .catch((error) => {
      instance?.proxy?.$message({
        type: "error",
        message: "删除失败",
      });
    });
}

// 设置oss配置
const ossDialogRef = ref()
function setOSSConfig() {
  queryConfiOSS().then(({ data }) => {
    const oss = data.oss ? JSON.parse(data.oss) : {}
    ossDialogRef.value.update(oss)
  })
}

// 上传文件到当前目录
function uploadFileToOss(result: { name: string; raw: File }) {
  uploadOSS({
    name: ossListParams.prefixList.join("") + result.name,
    file: result.raw
  }).then(() => {
    instance?.proxy?.$message({
      type: "success",
      message: "上传成功",
    });
    onQueryOSSList()
  })
    .catch((error) => {
      instance?.proxy?.$message({
        type: "error",
        message: "上传失败",
      });
    });
}

// 查询oss列表
function onQueryOSSList() {
  queryOSSList({
    ...ossListParams,
    prefix: ossListParams.prefixList.join('')
  }).then(res => {
    tableData.value = res.data
    if (ossListParams.prefixList.length) {
      tableData.value.unshift({
        dir: false,
        isPath: true,
        name: ['/', ...ossListParams.prefixList],
      })
    }
  })
}

onMounted(() => {
  onQueryOSSList()
})

</script>

<template>
  <el-image-viewer v-if="isPreview" :url-list="viewerList" @close="handleCloseViewer" :hide-on-click-modal="true" />
  <OSSDialog ref="ossDialogRef" />
  <TableLimit :tableField="tableField" :tableData="tableData">
    <template #search>
      <Search :searchList="searchList" />
    </template>
    <template #name="{ row }">
      <div class="flex">
        <Icon :size="20" :name="iconStlye(row).name" :class="iconStlye(row).class" @click="handleBackClick(true)"></Icon>
        <div v-if="!row.isPath" class="flex ml-3 text-cyan-500 cursor-pointer hover:underline"
          @click="handleObjectClick(row)">
          {{ row.name }}
        </div>
        <div class="flex" v-else>
          <div :class="['ml-3', index === row.name.length - 1 ? '' : 'text-cyan-500 cursor-pointer hover:underline']"
            v-for="(name, index) in row.name" :key="index" @click="handleBackClick(index !== row.name.length - 1, index)">
            {{ name }}
          </div>
        </div>
      </div>
    </template>
    <template #size="{ row }">
      {{ sizeFormat(row.size) }}
    </template>
    <template #time="{ row }">
      {{ dateFormat(row.timeModified) }}
    </template>
    <template #action="{ row }">
      <template v-if="!row.isPath">
        <el-popconfirm title="确定删除吗?" @confirm="handleDelOSS(row)">
          <template #reference>
            <el-button type="primary" link>彻底删除</el-button>
          </template>
        </el-popconfirm>
        <el-button type="primary" v-if="!row.dir" link @click="handleCopyLink(row.url)">复制链接</el-button>
        <el-button type="primary" v-if="!row.dir" link @click="handleDownload(row)">下载</el-button>
      </template>
    </template>
  </TableLimit>
</template>