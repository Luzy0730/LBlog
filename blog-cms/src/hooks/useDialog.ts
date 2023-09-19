import { type FormItemRule, type FormRules } from "element-plus";
import type { Arrayable } from "element-plus/es/utils/typescript.mjs";
import type { UnwrapRef } from "vue";

type UseFormDialogResult<T> = {
  dialogVisible: globalThis.Ref<boolean>;
  title: globalThis.Ref<string>;
  isEdit: globalThis.Ref<boolean>;
  ruleFormRef: globalThis.Ref<HTMLElement>;
  ruleForm: UnwrapRef<T>;
  rules: UnwrapRef<Partial<Record<any, Arrayable<FormItemRule>>>>
  open: (cb?: Function) => void;
  close: (cb?: Function) => void;
  create: () => void;
  update: (data: T) => void;
}

export function useFormDialog<T = object>(option: { formData?: T, formRule?: FormRules<T> }): UseFormDialogResult<T> {
  const { formData, formRule } = option

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

  const create = (cb?: Function) => {
    title.value = "新增";
    isEdit.value = false
    open(cb);
  }

  const update = (data: T, cb?: Function) => {
    title.value = "编辑";
    isEdit.value = true
    open(cb);
    nextTick(() => {
      Object.assign((ruleForm as any), data)
    })
  }


  return { dialogVisible, title, isEdit, ruleFormRef, ruleForm, rules, open, close, create, update }
}