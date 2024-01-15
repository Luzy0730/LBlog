import useForm, { type UseFormResult } from "./useForm";
import { type FormRules } from 'element-plus'

// 表单弹窗hook
type UseFormDialogResult<T> = useDialogResult<T> & UseFormResult<T>
export function useFormDialog<T extends object>(option: {
  formData: T, formRule?: FormRules<T>, afterCreated?: Function, afterUpdated?: Function
}): UseFormDialogResult<T> {
  const { formData, formRule, afterCreated, afterUpdated } = option
  const useFormResult = useForm({ formData, formRule })
  const useDialogResult = useDialog<T>({
    closed: () => useFormResult.ruleFormRef.value.resetFields(),
    afterUpdated: (data: T) => {
      Object.assign((useFormResult.ruleForm as any), data)
      afterUpdated && afterUpdated(data)
    },
    afterCreated
  })
  return { ...useFormResult, ...useDialogResult }
}

// 弹窗hook
type useDialogResult<T> = {
  dialogVisible: globalThis.Ref<boolean>;
  title: globalThis.Ref<string>;
  isEdit: globalThis.Ref<boolean>;
  open: (cb?: Function) => void;
  close: (cb?: Function) => void;
  create: (title?: string) => void;
  update: (data: T, title?: string) => void;
}
export function useDialog<T = object>(option: {
  beforeCreated?: Function, beforeUpdated?: Function, closed?: Function,
  afterCreated?: Function, afterUpdated?: Function
}): useDialogResult<T> {
  const { beforeCreated, beforeUpdated, closed, afterCreated, afterUpdated } = option
  const dialogVisible = ref(false);
  const title = ref("新增");
  const isEdit = ref(false)
  const open = (cb?: Function) => {
    dialogVisible.value = true
    cb && cb()
  }

  const close = (cb?: Function) => {
    dialogVisible.value = false
    closed && closed()
    cb && cb()
  };

  const create = (_title: string = "新增") => {
    title.value = _title;
    isEdit.value = false
    beforeCreated && beforeCreated()
    open();
    nextTick(() => {
      afterCreated && afterCreated()
    })
  }

  const update = (data: T, _title: string = "编辑") => {
    title.value = _title;
    isEdit.value = true
    beforeUpdated && beforeUpdated(data)
    open();
    nextTick(() => {
      afterUpdated && afterUpdated(data)
    })
  }
  return { dialogVisible, title, isEdit, open, close, create, update }
}