<script setup lang="ts">
import { queryConfigSitInfo, updateConfigSitInfo } from '@/api/services/config'
import { type UploadFile } from 'element-plus'
import useForm from '@/hooks/useForm'
interface ISiteInfo {
  blogName: string;
  ico: string;
  copyright: {
    title: string;
    siteName: string;
  },
  beian: string;
}
const loading = ref(false)

const { ruleForm, ruleFormRef, rules } = useForm<ISiteInfo>({
  formData: {
    ico: "",
    blogName: "",
    copyright: {
      siteName: "",
      title: "",
    },
    beian: ""
  },
  formRule: {
    ico: [{ required: true, trigger: "blur", message: "博客图标不能为空!!" }],
    blogName: [{ required: true, trigger: "blur", message: "博客名称不能为空!" }],
    "copyright.title": [{ required: true, trigger: "blur", message: "版权标题不能为空!" }],
    "copyright.siteName": [{ required: true, trigger: "blur", message: "版权名称不能为空!" }],
    beian: [{ required: true, trigger: "blur", message: "备案信息不能为空!" }],
  }
})

const onRefresh = async () => {
  loading.value = true
  return queryConfigSitInfo().then(({ data }) => {
    const siteInfo = data ? JSON.parse(data.siteInfo) : {}
    Object.assign(ruleForm, siteInfo)
  }).finally(() => {
    loading.value = false
  })
}

const onConfirm = async () => {
  return ruleFormRef.value.validate().then(async (valid: boolean) => {
    if (valid) {
      const siteInfo = JSON.stringify(ruleForm)
      const data = { siteInfo }
      await updateConfigSitInfo(data)
    }
    return valid
  })
}

const onChange = (uploadFile: UploadFile) => {
  const fileReader = new FileReader();
  fileReader.onload = () => {
    const srcData = fileReader.result as string;
    ruleForm.ico = srcData
  }
  fileReader.readAsDataURL(uploadFile.raw as File)
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
  <el-form v-loading="loading" ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px">
    <el-form-item label="博客图标" prop="ico">
      <el-upload action="" :auto-upload="false"
        class="w-[150px] h-[150px] relative flex items-center justify-center	border rounded" :show-file-list="false"
        :on-change="onChange">
        <img v-if="ruleForm.ico" :src="ruleForm.ico" />
        <el-icon v-else class="avatar-uploader-icon absolute w-full h-full">
          <Plus />
        </el-icon>
      </el-upload>
    </el-form-item>
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