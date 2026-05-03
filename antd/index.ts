import type { App, Component } from "vue";

import Action from "./action.vue";
import Button from "./button.vue";
import CheckboxFilter from "./checkbox-filter.vue";
import CheckboxFilterSearch from "./checkbox-filter-search.vue";
import CustomOverflowSuspension from "./custom-overflow-suspension.vue";
import DropDown from "./drop-down.vue";
import DropDownFilter from "./drop-down-filter.vue";
import DropDownSearch from "./drop-down-search.vue";
import Form from "./form.vue";
import Html from "./html.vue";
import Icon from "./icon.vue";
import IconArrowDown from "./icon-arrow-down.vue";
import IconFont from "./icon-font.vue";
import Img from "./img.vue";
import InfoCell from "./info-cell.vue";
import Input from "./input.vue";
import LayoutDrawer from "./layout-drawer.vue";
import Loading from "./loading.vue";
import Modal from "./modal.vue";
import ModalForm from "./modal-form.vue";
import ModalScheduleDetail from "./modal-schedule-detail.vue";
import ModalTip from "./modal-tip.vue";
import Null from "./null.vue";
import SearchForm from "./search-form.vue";
import Switch from "./switch.vue";
import Table from "./table.vue";
import TableScrollBar from "./table-scroll-bar.vue";
import Tabs from "./tabs.vue";
import TextArea from "./text-area.vue";
import TextHighlight from "./text-highlight.vue";
import TimeItem from "./time-item.vue";
import View from "./view.vue";
import WeekCalendar from "./week-calendar.vue";

export {
  Action,
  Button,
  CheckboxFilter,
  CheckboxFilterSearch,
  CustomOverflowSuspension,
  DropDown,
  DropDownFilter,
  DropDownSearch,
  Form,
  Html,
  Icon,
  IconArrowDown,
  IconFont,
  Img,
  InfoCell,
  Input,
  LayoutDrawer,
  Loading,
  Modal,
  ModalForm,
  ModalScheduleDetail,
  ModalTip,
  Null,
  SearchForm,
  Switch,
  Table,
  TableScrollBar,
  Tabs,
  TextArea,
  TextHighlight,
  TimeItem,
  View,
  WeekCalendar,
};

export { setPermissionResolver } from "./runtime";

const components: Record<string, Component> = {
  NexiAction: Action,
  NexiButton: Button,
  NexiCheckboxFilter: CheckboxFilter,
  NexiCheckboxFilterSearch: CheckboxFilterSearch,
  NexiCustomOverflowSuspension: CustomOverflowSuspension,
  NexiDropDown: DropDown,
  NexiDropDownFilter: DropDownFilter,
  NexiDropDownSearch: DropDownSearch,
  NexiForm: Form,
  NexiHtml: Html,
  NexiIcon: Icon,
  NexiIconArrowDown: IconArrowDown,
  NexiIconFont: IconFont,
  NexiImg: Img,
  NexiInfoCell: InfoCell,
  NexiInput: Input,
  NexiLayoutDrawer: LayoutDrawer,
  NexiLoading: Loading,
  NexiModal: Modal,
  NexiModalForm: ModalForm,
  NexiModalScheduleDetail: ModalScheduleDetail,
  NexiModalTip: ModalTip,
  NexiNull: Null,
  NexiSearchForm: SearchForm,
  NexiSwitch: Switch,
  NexiTable: Table,
  NexiTableScrollBar: TableScrollBar,
  NexiTabs: Tabs,
  NexiTextArea: TextArea,
  NexiTextHighlight: TextHighlight,
  NexiTimeItem: TimeItem,
  NexiView: View,
  NexiWeekCalendar: WeekCalendar,
};

export default {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
  },
};
