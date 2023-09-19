<script setup lang="ts">
import { useFormDialog } from '@/hooks/useDialog'
import { cloneDeep } from 'lodash';
const emit = defineEmits<{
  (event: "create", audio: IAudio): void;
  (event: "update", audio: IAudio): void;
}>()
export interface IAudio {
  id?: number;
  cover: string;
  name: string;
  artist: string;
  url: string
}

const { dialogVisible, title, isEdit, ruleFormRef, ruleForm, rules, close, create, update } = useFormDialog<IAudio>({
  formData: {
    cover: "",
    name: "",
    artist: "",
    url: "",
  },
  formRule: {
    cover: [{ required: true, trigger: "blur", message: "封面不能为空!" }],
    name: [{ required: true, trigger: "blur", message: "专辑名称不能为空!" }],
    artist: [{ required: true, trigger: "blur", message: "歌手信息不能为空!" }],
    url: [{ required: true, trigger: "blur", message: "播放地址不能为空!" }],
  }
})

const onSubmit = () => {
  if (isEdit.value) {
    emit('update', cloneDeep(ruleForm))
  } else {
    emit('create', cloneDeep(ruleForm))
  }
  close()
}

defineExpose({
  create,
  update
})

</script>
<template>
  <el-dialog v-model="dialogVisible" :title="title" @close="close">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px">
      <el-form-item label="封面" prop="cover">
        <el-input v-model="ruleForm.cover" />
      </el-form-item>
      <el-form-item label="专辑名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="歌手信息" prop="artist">
        <el-input v-model="ruleForm.artist" />
      </el-form-item>
      <el-form-item label="播放地址" prop="url">
        <el-input v-model="ruleForm.url" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>