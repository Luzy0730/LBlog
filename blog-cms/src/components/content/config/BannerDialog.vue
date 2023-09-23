<script setup lang="ts">
import { useFormDialog } from '@/hooks/useDialog'
import { cloneDeep } from 'lodash';
const emit = defineEmits<{
  (event: "update", banner: IBanner): void;
  (event: "create", banner: IBanner): void;
}>()
export interface IBanner {
  id: number;
  sort: number;
  url: string;
}
const { dialogVisible, title, ruleFormRef, ruleForm, rules, close, isEdit, update, create } = useFormDialog<IBanner>({
  formData: {
    id: -1,
    sort: -1,
    url: ""
  },
  formRule: {
    sort: [{ required: true, trigger: "blur", message: "序号不能为空!" }],
    url: [{ required: true, trigger: "blur", message: "图片地址不能为空!" }],
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
  update,
  create
})

</script>
<template>
  <el-dialog v-model="dialogVisible" :title="title" @close="close">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px">
      <el-form-item label="排序" prop="cover">
        <el-input v-model="ruleForm.sort" />
      </el-form-item>
      <el-form-item label="图片地址" prop="name">
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