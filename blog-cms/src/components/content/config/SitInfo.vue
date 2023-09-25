<script setup lang="ts">
import { queryConfigSitInfo, updateConfigSitInfo } from '@/api/services/config'
import useForm from '@/hooks/useForm'
interface ISiteInfo {
  blogName: string;
  copyright: {
    title: string;
    siteName: string;
  },
  beian: string;
}
const { ruleForm, ruleFormRef, rules } = useForm<ISiteInfo>({
  formData: {
    blogName: "",
    copyright: {
      siteName: "",
      title: "",
    },
    beian: ""
  },
  formRule: {
    blogName: [{ required: true, trigger: "blur", message: "博客名称不能为空!" }],
    "copyright.title": [{ required: true, trigger: "blur", message: "版权标题不能为空!" }],
    "copyright.siteName": [{ required: true, trigger: "blur", message: "版权名称不能为空!" }],
    beian: [{ required: true, trigger: "blur", message: "备案信息不能为空!" }],
  }
})

const onRefresh = async () => {
  return queryConfigSitInfo().then(({ data }) => {
    const siteInfo = data ? JSON.parse(data.site_info) : {}
    Object.assign(ruleForm, siteInfo)
  })
}

const onConfirm = async () => {

  return ruleFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const siteInfo = JSON.stringify(ruleForm)
      const data = { siteInfo }
      await updateConfigSitInfo(data)
    }
  })
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
  <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px">
    <el-form-item label="博客名称" prop="blogName">
      <el-input v-model="ruleForm.blogName" />
    </el-form-item>
    <el-form-item label="版权标题" prop="copyright.title">
      <el-input v-model="ruleForm.copyright.title" />
    </el-form-item>
    <el-form-item label="版权名称" prop="copyright.siteName">
      <el-input v-model="ruleForm.copyright.siteName" />
    </el-form-item>
    <el-form-item label="备案信息" prop="beian">
      <el-input v-model="ruleForm.beian" />
    </el-form-item>
  </el-form>
</template>