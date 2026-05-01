import { ref, reactive } from 'vue'

/** usePermission - 权限校验 stub，文档环境默认通过 */
export function usePermission(auth: string | string[]) {
  return true
}

/** useGlobalStore - 全局状态 stub */
export function useGlobalStore() {
  return {
    toggleGlobalModal: ref(false),
  }
}

/** useTool - 工具函数 stub */
export function useTool() {
  return {
    resetObj: <T extends Record<string, any>>(obj: T): T => {
      const result = {} as T
      for (const key of Object.keys(obj)) {
        ;(result as any)[key] = undefined
      }
      return result
    },
  }
}

/** useDictionaryStore - 字典 store stub */
export function useDictionaryStore() {
  return {
    dictionaryFilter: [],
  }
}

/** useQueryForm - 查询表单列处理 stub */
export function useQueryForm(columns: any[], _customRequestOptions?: boolean) {
  return columns
}

/** useForm - 表单类型 stub */
export function useForm() {
  return {}
}
