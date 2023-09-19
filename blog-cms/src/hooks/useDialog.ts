import { type FormItemRule, type FormRules } from "element-plus";
import type { Arrayable } from "element-plus/es/utils/typescript.mjs";
import type { UnwrapRef } from "vue";

type UseFormDialogResult<T> = {
  dialogVisible: globalThis.Ref<boolean>;
  title: globalThis.Ref<string>;
  ruleFormRef: globalThis.Ref<HTMLElement>;
  ruleForm: UnwrapRef<T>;
  rules: UnwrapRef<Partial<Record<any, Arrayable<FormItemRule>>>>
  open: (cb: Function) => void;
  close: (cb: Function) => void;
  create: () => void;
  update: (data: T) => void;
}

export function useFormDialog<T = object>(option: { formData?: T, formRule?: FormRules<T> }): UseFormDialogResult<T> {
  const { formData, formRule } = option

  const dialogVisible = ref(false);
  const title = ref("新增");

  const ruleFormRef = ref();
  const ruleForm = reactive<object>((formData as object))
  const rules = reactive<FormRules<typeof ruleForm>>((formRule as FormRules<typeof ruleForm>));

  const open = (cb?: Function) => {
    dialogVisible.value = true
    cb && cb()
  }

  const close = (cb?: Function) => {
    ruleFormRef.value.resetFields();
    cb && cb()
  };

  const create = () => {
    title.value = "新增";
    open();
  }

  const update = (data: T) => {
    title.value = "编辑";
    open();
    nextTick(() => {
      Object.assign((ruleForm as any), data)
    })
  }


  return { dialogVisible, title, ruleFormRef, ruleForm, rules, open, close, create, update }
}