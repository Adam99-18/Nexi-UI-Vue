export type PermissionResolver = (auth: string | string[]) => boolean;
export type ActionItem = Record<string, any> & {
  key: string;
  label?: string;
  auth?: string[];
  icon?: any;
  isShow?: boolean;
  onClick?: (...args: any[]) => any;
  popConfirm?: Record<string, any>;
  tooltip?: string | Record<string, any>;
};

let permissionResolver: PermissionResolver = () => true;

export const setPermissionResolver = (resolver: PermissionResolver) => {
  permissionResolver = resolver;
};

export const usePermission = (auth: string | string[]) => {
  return permissionResolver(auth);
};

export const isAsyncFunction = (value: unknown) => {
  return Object.prototype.toString.call(value) === "[object AsyncFunction]";
};

export const resetObj = <T extends Record<string, any>>(value: T): T => {
  Object.keys(value).forEach((key) => {
    const item = value[key];
    if (Array.isArray(item)) {
      value[key] = [] as T[typeof key];
    } else if (item && typeof item === "object") {
      value[key] = resetObj({ ...item }) as T[typeof key];
    } else {
      value[key] = undefined as T[typeof key];
    }
  });
  return value;
};

export const useTool = () => ({ resetObj });

export type QueryForm = Record<string, any>;
export type FormParams = Record<string, any>;

export const useQueryForm = <T extends QueryForm[]>(columns: T) => columns;

export const getScheduleList = async () => ({
  code: 200,
  data: [],
});
