<script setup lang="ts">
import { updateConfiOSS } from '@/api/services/oss'
import { useFormDialog } from '@/hooks/useDialog'
import { cloneDeep } from 'lodash'
const emit = defineEmits<{
  (event: "update", oss: OSS): void;
  (event: "create", oss: OSS): void;
}>()
export interface OSS {
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  bucket: string;
}
const { dialogVisible, title, ruleFormRef, ruleForm, rules, close, isEdit, update, create } = useFormDialog<OSS>({
  formData: {
    region: "",
    accessKeyId: "",
    accessKeySecret: "",
    bucket: ""
  },
  formRule: {
    region: [{ required: true, trigger: "blur", message: "Bucket所在地域不能为空!" }],
    accessKeyId: [{ required: true, trigger: "blur", message: "accessKeyId不能为空!" }],
    accessKeySecret: [{ required: true, trigger: "blur", message: "accessKeySecret不能为空!" }],
    bucket: [{ required: true, trigger: "blur", message: "bucket名称不能为空!" }],
  },
})

const onSubmit = async () => {
  await updateConfiOSS({
    oss: JSON.stringify(cloneDeep(ruleForm))
  })
  close()
}

defineExpose({
  update,
  create
})

</script>
<template>
  <el-dialog v-model="dialogVisible" :title="title" @close="close">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="150px">
      <el-form-item label="Bucket所在地域" prop="region">
        <el-input v-model="ruleForm.region" />
      </el-form-item>
      <el-form-item label="accessKeyId" prop="accessKeyId">
        <el-input v-model="ruleForm.accessKeyId" />
      </el-form-item>
      <el-form-item label="accessKeySecret" prop="accessKeySecret">
        <el-input v-model="ruleForm.accessKeySecret" />
      </el-form-item>
      <el-form-item label="bucket名称" prop="bucket">
        <el-input v-model="ruleForm.bucket" />
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