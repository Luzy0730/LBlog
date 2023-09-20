import type { UnwrapRef } from "vue";
import { ElForm, type FormRules, type FormItemRule } from 'element-plus'
type UseFormDialogResult<T> = {
  dialogVisible: globalThis.Ref<boolean>;
  title: globalThis.Ref<string>;
  isEdit: globalThis.Ref<boolean>;
  ruleFormRef: globalThis.Ref<typeof ElForm>;
  ruleForm: UnwrapRef<T>;
  rules: UnwrapRef<Partial<Record<any, FormItemRule[]>>>
  open: (cb?: Function) => void;
  close: (cb?: Function) => void;
  create: () => void;
  update: (data: T) => void;
}

export function useFormDialog<T = object>(option: {
  formData?: T, formRule?: FormRules<T>, afterCreated?: Function, afterUpdated?: Function
}): UseFormDialogResult<T> {
  const { formData, formRule, afterCreated, afterUpdated } = option

  const dialogVisible = ref(false);
  const title = ref("新增");
  const isEdit = ref(false)

  const ruleFormRef = ref();
  const ruleForm = reactive<object>((formData as object))
  const rules = reactive<FormRules<typeof ruleForm>>((formRule as FormRules<typeof ruleForm>));

  const open = (cb?: Function) => {
    dialogVisible.value = true
    cb && cb()
  }

  const close = (cb?: Function) => {
    dialogVisible.value = false
    ruleFormRef.value.resetFields();
    cb && cb()
  };

  const create = () => {
    title.value = "新增";
    isEdit.value = false
    open(afterCreated);
  }

  const update = (data: T) => {
    title.value = "编辑";
    isEdit.value = true
    open();
    nextTick(() => {
      Object.assign((ruleForm as any), data)
      afterUpdated && afterUpdated()
    })
  }


  return { dialogVisible, title, isEdit, ruleFormRef, ruleForm, rules, open, close, create, update }
}