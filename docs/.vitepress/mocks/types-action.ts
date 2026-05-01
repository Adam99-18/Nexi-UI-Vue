/** ActionItem 类型 stub */
export interface ActionItem {
  key: string
  label?: string
  auth?: string[]
  icon?: string
  type?: 'link' | 'text' | 'default' | 'primary' | 'dashed'
  danger?: boolean
  disabled?: boolean
  visible?: boolean | ((params?: any) => boolean)
  confirm?: string | {
    title: string
    okText?: string
    cancelText?: string
    icon?: string
    color?: string
  }
  tooltip?: string | {
    title: string
    placement?: string
    color?: string
  }
  onClick?: (...args: any[]) => any | Promise<any>
}
