import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const components = [
  "Action",
  "Button",
  "CheckboxFilter",
  "CheckboxFilterSearch",
  "CustomExtra",
  "CustomOverflowSuspension",
  "DropDown",
  "DropDownFilter",
  "DropDownSearch",
  "Form",
  "Html",
  "Icon",
  "IconArrowDown",
  "IconFont",
  "Img",
  "InfoCell",
  "Input",
  "LayoutDrawer",
  "Loading",
  "Modal",
  "ModalForm",
  "ModalScheduleDetail",
  "ModalTip",
  "Null",
  "SearchForm",
  "Switch",
  "Table",
  "TableBackup",
  "TableScrollBar",
  "Tabs",
  "TextArea",
  "TextHighlight",
  "TimeItem",
  "View",
  "WeekCalendar",
];

const declaration = `import type { App, DefineComponent } from "vue";

export type NexiComponent = DefineComponent<Record<string, unknown>, Record<string, unknown>, any>;
export interface NexiUIPlugin {
  install(app: App): void;
}
export type PermissionResolver = (auth: string | string[]) => boolean;

${components.map((name) => `export const ${name}: NexiComponent;`).join("\n")}
export const setPermissionResolver: (resolver: PermissionResolver) => void;

declare const NexiUI: NexiUIPlugin;
export default NexiUI;
`;

const distDir = resolve("dist");
await mkdir(distDir, { recursive: true });
await writeFile(resolve(distDir, "index.d.ts"), declaration, "utf8");
