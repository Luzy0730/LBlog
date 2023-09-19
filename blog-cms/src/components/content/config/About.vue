<script setup lang="ts">
import { queryConfigAbout, updateConfigAbout } from '@/api/services/config'
import AboutAudioDialog, { type IAudio } from './AboutAudioDialog.vue'
import WangEditor from '../editor/WangEditor.vue';

const audioList = ref<IAudio[]>([]);
const audioConfig = ref<{ [key: string]: any }>({})
const audioConfigSelects = [
  { name: '吸底模式:', option: 'fixedOption', value: 'fixed' },
  { name: '折叠歌曲列表:', option: 'listFoldedOption', value: 'listFolded' },
  { name: '自动播放:', option: 'autoplayOption', value: 'autoplay' },
  { name: '预加载歌曲:', option: 'preloadOption', value: 'preload' },
  { name: '播放模式:', option: 'orderOptions', value: 'order' },
  { name: '循环模式:', option: 'loopOptions', value: 'loop' },
]
const audioConfigOptions: { [key: string]: Array<any> } = {
  fixedOption: [
    { label: '是', value: true },
    { label: '否', value: false },
  ],
  listFoldedOption: [
    { label: '是', value: true },
    { label: '否', value: false },
  ],
  autoplayOption: [
    { label: '是', value: true },
    { label: '否', value: false },
  ],
  preloadOption: [
    { label: '是', value: 'auto' },
    { label: '否', value: 'none' },
  ],
  loopOptions: [
    { label: '全部循环', value: 'all' },
    { label: '单曲循环', value: 'one' },
    { label: '只播放一次', value: 'none' },
  ],
  orderOptions: [
    { label: '列表播放', value: 'list' },
    { label: '随机播放', value: 'random' },
  ]
}


const wangeEditorRef = ref()
const audioContentTitle = ref()
const onRefresh = async () => {
  return queryConfigAbout().then(({ data }) => {
    const aboutAudio = data.about_audio ? JSON.parse(data.about_audio) : {}
    const aboutContent = data.about_content ? JSON.parse(data.about_content) : {}
    audioContentTitle.value = aboutContent.title || ""
    wangeEditorRef.value.setContent(aboutContent.content || "")
    audioList.value = aboutAudio.list || []
    audioConfig.value = aboutAudio.config || {}
  })
}

const aboutAudioDialogRef = ref()
// 新增
const onCreate = () => {
  aboutAudioDialogRef.value.create()
}
// 编辑
const onUpdate = (audio: IAudio) => {
  aboutAudioDialogRef.value.update(audio)
}
// 删除
const onDelete = (index: number) => {
  audioList.value.splice(index, 1)
}
// 弹窗新增和更新事件
const onCreateAudio = (audio: IAudio) => {
  audioList.value.push(audio)
}
const onUpdateAudio = (audio: IAudio) => {
  const find = audioList.value.find(audio => audio.id === audio.id)
  if (find) {
    Object.assign(find, audio)
  }
}

const onConfirm = async () => {
  const aboutContent = JSON.stringify({
    title: audioContentTitle.value,
    content: wangeEditorRef.value.getContent().html
  })
  const aboutAudio = JSON.stringify({
    list: audioList.value.map((audio, index) => ({ ...audio, id: index + 1 })),
    config: audioConfig.value
  })
  const data = { aboutContent, aboutAudio }
  return updateConfigAbout(data)
}

onMounted(() => {
  onRefresh()
})

defineExpose({
  onConfirm,
  onRefresh
})
</script>

<template>
  <AboutAudioDialog ref="aboutAudioDialogRef" @create="onCreateAudio" @update="onUpdateAudio" />
  <el-tabs type="border-card">
    <el-tab-pane label="播放器">
      <el-collapse>
        <el-collapse-item title="播放器配置">
          <el-row :gutter="20">
            <el-col class="mb-3" :span="6" v-for="select in audioConfigSelects" :key="select.name">
              {{ select.name }}
              <el-select v-model="audioConfig[select.value]" clearable placeholder="Select">
                <el-option v-for="item in audioConfigOptions[select.option]" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <el-divider />
      <el-row>
        <el-col :span="24">
          <el-button class="float-right" @click="onCreate">新增</el-button>
        </el-col>
      </el-row>
      <el-table class="mt-3" border :data="audioList" show-overflow-tooltip>
        <el-table-column prop="cover" label="封面" width="150" align="center">
          <template #default="{ row }">
            <el-image :src="row.cover" fit="cover"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="专辑名称" width="250" align="center" />
        <el-table-column prop="artist" label="歌手" width="200" align="center" />
        <el-table-column prop="url" label="播放地址" min-width="200" align="center" />
        <el-table-column prop="" label="操作" width="120" align="center" fixed="right">
          <template #default="{ row, $index }">
            <el-button type="primary" link @click="onUpdate(row)">编辑</el-button>
            <el-popconfirm title="确定删除吗?" @confirm="() => onDelete($index)">
              <template #reference>
                <el-button type="primary" link>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="文章内容">
      <el-card>
        <el-input v-model="audioContentTitle" placeholder="标题" />
      </el-card>
      <WangEditor class="mt-3" ref="wangeEditorRef" />
    </el-tab-pane>
  </el-tabs>
</template>