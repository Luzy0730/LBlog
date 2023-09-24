import type { UnwrapNestedRefs } from "vue";
import { ElForm, type FormRules, type FormItemRule } from 'element-plus'
export type UseFormResult<T> = {
  ruleFormRef: globalThis.Ref<typeof ElForm>;
  ruleForm: UnwrapNestedRefs<T>;
  rules: UnwrapNestedRefs<Partial<Record<any, FormItemRule[]>>>
}

// 表单hook
export default function useForm<T extends object>(option: {
  formData: T, formRule?: FormRules<T>, afterCreated?: Function, afterUpdated?: Function
}): UseFormResult<T> {
  const { formData, formRule } = option
  const ruleFormRef = ref();
  const ruleForm = reactive<T>(formData)
  const rules = reactive<FormRules<typeof ruleForm>>((formRule as FormRules<typeof ruleForm>)) as Partial<Record<any, FormItemRule[]>>;
  return { ruleFormRef, ruleForm, rules }
}
