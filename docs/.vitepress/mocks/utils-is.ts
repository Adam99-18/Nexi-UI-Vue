/** 判断是否为 async 函数 */
export function isAsyncFunction(fn: any): boolean {
  return fn?.constructor?.name === 'AsyncFunction'
}
