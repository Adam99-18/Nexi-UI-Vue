<script lang="ts" setup>
import {
  DoubleRightOutlined,
  DoubleLeftOutlined,
  InfoCircleFilled,
  // QuestionOutlined,
  RightOutlined,
  PlusCircleFilled,
  PlusCircleOutlined,
  PauseOutlined,
  PauseCircleOutlined,
  MinusOutlined,
  MinusCircleFilled,
  MinusCircleOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
  InfoOutlined,
  InfoCircleOutlined,
  ExclamationOutlined,
  ExclamationCircleOutlined,
  CloseOutlined,
  CloseCircleOutlined,
  CloseCircleFilled,
  CloseSquareOutlined,
  CheckOutlined,
  CheckCircleFilled,
  CheckCircleOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  IssuesCloseOutlined,
  StopOutlined,
  FormOutlined,
  CopyOutlined,
  ScissorOutlined,
  SnippetsOutlined,
  DiffOutlined,
  HighlightOutlined,
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BgColorsOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  RedoOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  FontColorsOutlined,
  FontSizeOutlined,
  LineHeightOutlined,
  DashOutlined,
  SmallDashOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  DragOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  RadiusSettingOutlined,
  ColumnWidthOutlined,
  BorderOutlined,
  AreaChartOutlined,
  PieChartOutlined,
  BarChartOutlined,
  DotChartOutlined,
  LineChartOutlined,
  RadarChartOutlined,
  HeatMapOutlined,
  FallOutlined,
  RiseOutlined,
  StockOutlined,
  BoxPlotOutlined,
  FundOutlined,
  SlidersOutlined,
  AccountBookOutlined,
  AimOutlined,
  AlertOutlined,
  ApartmentOutlined,
  ApiOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
  AudioOutlined,
  AudioMutedOutlined,
  AuditOutlined,
  BankOutlined,
  BarcodeOutlined,
  BarsOutlined,
  BellOutlined,
  BlockOutlined,
  BookOutlined,
  BorderlessTableOutlined,
  BranchesOutlined,
  BugOutlined,
  BuildOutlined,
  BulbOutlined,
  CalculatorOutlined,
  CalendarOutlined,
  CameraOutlined,
  CarOutlined,
  CarryOutOutlined,
  CiCircleOutlined,
  CiOutlined,
  ClearOutlined,
  CloudDownloadOutlined,
  CloudOutlined,
  CloudServerOutlined,
  CloudSyncOutlined,
  CloudUploadOutlined,
  ClusterOutlined,
  CodeOutlined,
  CoffeeOutlined,
  CommentOutlined,
  CompassOutlined,
  CompressOutlined,
  ConsoleSqlOutlined,
  ContactsOutlined,
  ContainerOutlined,
  ControlOutlined,
  CopyrightCircleOutlined,
  CopyrightOutlined,
  CreditCardOutlined,
  CrownOutlined,
  CustomerServiceOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  DeleteColumnOutlined,
  DeleteRowOutlined,
  DeliveredProcedureOutlined,
  DeploymentUnitOutlined,
  DesktopOutlined,
  DingtalkOutlined,
  DisconnectOutlined,
  DislikeOutlined,
  DollarCircleOutlined,
  DollarOutlined,
  EllipsisOutlined,
  EnvironmentOutlined,
  EuroCircleOutlined,
  EuroOutlined,
  ExceptionOutlined,
  ExpandAltOutlined,
  ExpandOutlined,
  ExperimentOutlined,
  ExportOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  FieldBinaryOutlined,
  FieldNumberOutlined,
  FieldStringOutlined,
  FieldTimeOutlined,
  FileAddOutlined,
  FileDoneOutlined,
  FileExcelOutlined,
  FileExclamationOutlined,
  FileOutlined,
  FileGifOutlined,
  FileImageOutlined,
  FileJpgOutlined,
  FileMarkdownOutlined,
  FilePdfOutlined,
  FilePptOutlined,
  FileProtectOutlined,
  FileSearchOutlined,
  FileSyncOutlined,
  FileTextOutlined,
  FileUnknownOutlined,
  FileWordOutlined,
  FileZipOutlined,
  FilterOutlined,
  FireOutlined,
  FlagOutlined,
  FolderAddOutlined,
  FolderOutlined,
  FolderOpenOutlined,
  FolderViewOutlined,
  ForkOutlined,
  FormatPainterOutlined,
  FrownOutlined,
  FunctionOutlined,
  FundProjectionScreenOutlined,
  FundViewOutlined,
  FunnelPlotOutlined,
  GatewayOutlined,
  GifOutlined,
  GiftOutlined,
  GlobalOutlined,
  GoldOutlined,
  GroupOutlined,
  HddOutlined,
  HeartOutlined,
  HistoryOutlined,
  HolderOutlined,
  HomeOutlined,
  HourglassOutlined,
  IdcardOutlined,
  ImportOutlined,
  InboxOutlined,
  InsertRowAboveOutlined,
  InsertRowBelowOutlined,
  InsertRowLeftOutlined,
  InsertRowRightOutlined,
  InsuranceOutlined,
  InteractionOutlined,
  KeyOutlined,
  LaptopOutlined,
  LayoutOutlined,
  LikeOutlined,
  LineOutlined,
  LinkOutlined,
  Loading3QuartersOutlined,
  LoadingOutlined,
  MacCommandOutlined,
  MailOutlined,
  ManOutlined,
  MedicineBoxOutlined,
  MehOutlined,
  MenuOutlined,
  MergeCellsOutlined,
  MessageOutlined,
  MobileOutlined,
  MoneyCollectOutlined,
  MonitorOutlined,
  NodeCollapseOutlined,
  NodeExpandOutlined,
  NodeIndexOutlined,
  NotificationOutlined,
  NumberOutlined,
  OneToOneOutlined,
  PaperClipOutlined,
  PartitionOutlined,
  PayCircleOutlined,
  PercentageOutlined,
  PhoneOutlined,
  PictureOutlined,
  PlaySquareOutlined,
  PoundCircleOutlined,
  PoundOutlined,
  PoweroffOutlined,
  PrinterOutlined,
  ProfileOutlined,
  ProjectOutlined,
  PropertySafetyOutlined,
  PullRequestOutlined,
  PushpinOutlined,
  QrcodeOutlined,
  ReadOutlined,
  ReconciliationOutlined,
  RedEnvelopeOutlined,
  ReloadOutlined,
  RestOutlined,
  RobotOutlined,
  RocketOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SafetyCertificateOutlined,
  SafetyOutlined,
  SaveOutlined,
  ScanOutlined,
  ScheduleOutlined,
  SecurityScanOutlined,
  SelectOutlined,
  SendOutlined,
  ShakeOutlined,
  ShareAltOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SisternodeOutlined,
  SkinOutlined,
  SmileOutlined,
  SolutionOutlined,
  SoundOutlined,
  SplitCellsOutlined,
  StarOutlined,
  SubnodeOutlined,
  SwitcherOutlined,
  SyncOutlined,
  TableOutlined,
  TabletOutlined,
  TagOutlined,
  TagsOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  ToTopOutlined,
  ToolOutlined,
  TrademarkCircleOutlined,
  TrademarkOutlined,
  TransactionOutlined,
  TranslationOutlined,
  TrophyOutlined,
  UngroupOutlined,
  UnlockOutlined,
  UsbOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
  UsergroupDeleteOutlined,
  VerifiedOutlined,
  VideoCameraAddOutlined,
  VideoCameraOutlined,
  WalletOutlined,
  WhatsAppOutlined,
  WifiOutlined,
  WomanOutlined,
  SettingOutlined,
  SettingFilled,
  ColumnHeightOutlined,
  MoreOutlined,
  LockOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UserOutlined,
  SearchOutlined,
  UploadOutlined,
  DownloadOutlined,
  QuestionCircleOutlined,
  QuestionCircleFilled,
  SwapOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  LoginOutlined,
  LogoutOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignBottomOutlined,
  DownOutlined,
  UpOutlined,
  LeftOutlined,
  PlayCircleOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
  ArrowsAltOutlined,
  ThunderboltTwoTone,
  ExclamationCircleFilled,
} from "@ant-design/icons-vue";

const props = defineProps({
  icon: {
    type: String,
    // icon-setting
    default: () => "",
  },
  color: {
    type: String,
    // icon-setting
    default: () => "",
  },
  fill: {
    type: Boolean,
    default: () => false,
  },
  size: {
    type: [Number, String],
    default: () => ".875rem",
  },
  cursor: {
    type: String,
    default: () => "pointer",
  },
});

const getIcon = () => {
  switch (props.icon) {
    case "double-right":
      return DoubleRightOutlined;
    case "double-left":
      return DoubleLeftOutlined;
    case "plus-circle":
      return props.fill ? PlusCircleFilled : PlusCircleOutlined;
    case "pause":
      return PauseOutlined;
    case "pause-circle":
      return PauseCircleOutlined;
    case "minus":
      return MinusOutlined;
    case "minus-circle":
      return props.fill ? MinusCircleFilled : MinusCircleOutlined;
    case "plus-square":
      return PlusSquareOutlined;
    case "minus-square":
      return MinusSquareOutlined;
    case "info":
      return props.fill ? InfoCircleFilled : InfoOutlined;
    case "info-circle":
      return InfoCircleOutlined;
    case "exclamation":
      return ExclamationOutlined;
    case "exclamation-circle":
      return props.fill ? ExclamationCircleFilled : ExclamationCircleOutlined;
    case "close":
      return CloseOutlined;
    case "close-circle":
      return props.fill ? CloseCircleFilled : CloseCircleOutlined;
    case "close-square":
      return CloseSquareOutlined;
    case "check":
      return CheckOutlined;
    case "check-circle":
      return props.fill ? CheckCircleFilled : CheckCircleOutlined;
    case "check-square":
      return CheckSquareOutlined;
    case "clock-circle":
      return ClockCircleOutlined;
    case "warning":
      return WarningOutlined;
    case "issues-close":
      return IssuesCloseOutlined;
    case "stop":
      return StopOutlined;
    case "form":
      return FormOutlined;
    case "copy":
      return CopyOutlined;
    case "scissor":
      return ScissorOutlined;
    case "snippets":
      return SnippetsOutlined;
    case "diff":
      return DiffOutlined;
    case "highlight":
      return HighlightOutlined;
    case "align-center":
      return AlignCenterOutlined;
    case "align-left":
      return AlignLeftOutlined;
    case "left":
      return LeftOutlined;
    case "right":
      return RightOutlined;
    case "align-right":
      return AlignRightOutlined;
    case "bgcolors":
      return BgColorsOutlined;
    case "bold":
      return BoldOutlined;
    case "italic":
      return ItalicOutlined;
    case "underline":
      return UnderlineOutlined;
    case "strikethrough":
      return StrikethroughOutlined;
    case "redo":
      return RedoOutlined;
    case "undo":
      return UndoOutlined;
    case "zoom-in":
      return ZoomInOutlined;
    case "zoom-out":
      return ZoomOutOutlined;
    case "font-colors":
      return FontColorsOutlined;
    case "font-size":
      return FontSizeOutlined;
    case "line-height":
      return LineHeightOutlined;
    case "dash":
      return DashOutlined;
    case "small-dash":
      return SmallDashOutlined;
    case "sort-ascending":
      return SortAscendingOutlined;
    case "sort-descending":
      return SortDescendingOutlined;
    case "drag":
      return DragOutlined;
    case "ordered-list":
      return OrderedListOutlined;
    case "unordered-list":
      return UnorderedListOutlined;
    case "radius-setting":
      return RadiusSettingOutlined;
    case "column-width":
      return ColumnWidthOutlined;
    case "border":
      return BorderOutlined;
    case "area-chart":
      return AreaChartOutlined;
    case "pie-chart":
      return PieChartOutlined;
    case "bar-chart":
      return BarChartOutlined;
    case "dot-chart":
      return DotChartOutlined;
    case "line-chart":
      return LineChartOutlined;
    case "radar-chart":
      return RadarChartOutlined;
    case "heat-map":
      return HeatMapOutlined;
    case "fall":
      return FallOutlined;
    case "rise":
      return RiseOutlined;
    case "stock":
      return StockOutlined;
    case "box-plot":
      return BoxPlotOutlined;
    case "fund":
      return FundOutlined;
    case "sliders":
      return SlidersOutlined;
    case "account-book":
      return AccountBookOutlined;
    case "aim":
      return AimOutlined;
    case "alert":
      return AlertOutlined;
    case "apartment":
      return ApartmentOutlined;
    case "api":
      return ApiOutlined;
    case "appstore-add":
      return AppstoreAddOutlined;
    case "appstore":
      return AppstoreOutlined;
    case "audio":
      return AudioOutlined;
    case "audio-muted":
      return AudioMutedOutlined;
    case "audit":
      return AuditOutlined;
    case "bank":
      return BankOutlined;
    case "barcode":
      return BarcodeOutlined;
    case "bars":
      return BarsOutlined;
    case "bell":
      return BellOutlined;
    case "block":
      return BlockOutlined;
    case "book":
      return BookOutlined;
    case "borderless-table":
      return BorderlessTableOutlined;
    case "branches":
      return BranchesOutlined;
    case "bug":
      return BugOutlined;
    case "build":
      return BuildOutlined;
    case "bulb":
      return BulbOutlined;
    case "calculator":
      return CalculatorOutlined;
    case "calendar":
      return CalendarOutlined;
    case "camera":
      return CameraOutlined;
    case "car":
      return CarOutlined;
    case "carry-out":
      return CarryOutOutlined;
    case "ci-circle":
      return CiCircleOutlined;
    case "ci":
      return CiOutlined;
    case "clear":
      return ClearOutlined;
    case "cloud-download":
      return CloudDownloadOutlined;
    case "cloud":
      return CloudOutlined;
    case "cloud-server":
      return CloudServerOutlined;
    case "cloud-sync":
      return CloudSyncOutlined;
    case "cloud-upload":
      return CloudUploadOutlined;
    case "cluster":
      return ClusterOutlined;
    case "code":
      return CodeOutlined;
    case "coffee":
      return CoffeeOutlined;
    case "comment":
      return CommentOutlined;
    case "compass":
      return CompassOutlined;
    case "compress":
      return CompressOutlined;
    case "console-sql":
      return ConsoleSqlOutlined;
    case "contacts":
      return ContactsOutlined;
    case "container":
      return ContainerOutlined;
    case "control":
      return ControlOutlined;
    case "copyright-circle":
      return CopyrightCircleOutlined;
    case "copyright":
      return CopyrightOutlined;
    case "credit-card":
      return CreditCardOutlined;
    case "crown":
      return CrownOutlined;
    case "customer-service":
      return CustomerServiceOutlined;
    case "dashboard":
      return DashboardOutlined;
    case "database":
      return DatabaseOutlined;
    case "delete-column":
      return DeleteColumnOutlined;
    case "delete-row":
      return DeleteRowOutlined;
    case "delivered-procedure":
      return DeliveredProcedureOutlined;
    case "deployment-unit":
      return DeploymentUnitOutlined;
    case "desktop":
      return DesktopOutlined;
    case "dingtalk":
      return DingtalkOutlined;
    case "disconnect":
      return DisconnectOutlined;
    case "dislike":
      return DislikeOutlined;
    case "dollar-circle":
      return DollarCircleOutlined;
    case "dollar":
      return DollarOutlined;
    case "ellipsis":
      return EllipsisOutlined;
    case "environment":
      return EnvironmentOutlined;
    case "euro-circle":
      return EuroCircleOutlined;
    case "euro":
      return EuroOutlined;
    case "exception":
      return ExceptionOutlined;
    case "expand-alt":
      return ExpandAltOutlined;
    case "expand":
      return ExpandOutlined;
    case "experiment":
      return ExperimentOutlined;
    case "export":
      return ExportOutlined;
    case "eye":
      return EyeOutlined;
    case "eye-invisible":
      return EyeInvisibleOutlined;
    case "field-binary":
      return FieldBinaryOutlined;
    case "field-number":
      return FieldNumberOutlined;
    case "field-string":
      return FieldStringOutlined;
    case "field-time":
      return FieldTimeOutlined;
    case "file-add":
      return FileAddOutlined;
    case "file-done":
      return FileDoneOutlined;
    case "file-excel":
      return FileExcelOutlined;
    case "file-exclamation":
      return FileExclamationOutlined;
    case "file":
      return FileOutlined;
    case "file-gif":
      return FileGifOutlined;
    case "file-image":
      return FileImageOutlined;
    case "file-jpg":
      return FileJpgOutlined;
    case "file-markdown":
      return FileMarkdownOutlined;
    case "file-pdf":
      return FilePdfOutlined;
    case "file-ppt":
      return FilePptOutlined;
    case "file-protect":
      return FileProtectOutlined;
    case "file-search":
      return FileSearchOutlined;
    case "file-sync":
      return FileSyncOutlined;
    case "file-text":
      return FileTextOutlined;
    case "file-unknown":
      return FileUnknownOutlined;
    case "file-word":
      return FileWordOutlined;
    case "file-zip":
      return FileZipOutlined;
    case "filter":
      return FilterOutlined;
    case "fire":
      return FireOutlined;
    case "flag":
      return FlagOutlined;
    case "folder-add":
      return FolderAddOutlined;
    case "folder":
      return FolderOutlined;
    case "folder-open":
      return FolderOpenOutlined;
    case "folder-view":
      return FolderViewOutlined;
    case "fork":
      return ForkOutlined;
    case "format-painter":
      return FormatPainterOutlined;
    case "frown":
      return FrownOutlined;
    case "function":
      return FunctionOutlined;
    case "fund-projection-screen":
      return FundProjectionScreenOutlined;
    case "fund-view":
      return FundViewOutlined;
    case "funnel-plot":
      return FunnelPlotOutlined;
    case "gateway":
      return GatewayOutlined;
    case "gif":
      return GifOutlined;
    case "gift":
      return GiftOutlined;
    case "global":
      return GlobalOutlined;
    case "gold":
      return GoldOutlined;
    case "group":
      return GroupOutlined;
    case "hdd":
      return HddOutlined;
    case "heart":
      return HeartOutlined;
    case "history":
      return HistoryOutlined;
    case "holder":
      return HolderOutlined;
    case "home":
      return HomeOutlined;
    case "hourglass":
      return HourglassOutlined;
    case "idcard":
      return IdcardOutlined;
    case "import":
      return ImportOutlined;
    case "inbox":
      return InboxOutlined;
    case "insert-row-above":
      return InsertRowAboveOutlined;
    case "insert-row-below":
      return InsertRowBelowOutlined;
    case "insert-row-left":
      return InsertRowLeftOutlined;
    case "insert-row-right":
      return InsertRowRightOutlined;
    case "insurance":
      return InsuranceOutlined;
    case "interaction":
      return InteractionOutlined;
    case "key":
      return KeyOutlined;
    case "laptop":
      return LaptopOutlined;
    case "layout":
      return LayoutOutlined;
    case "like":
      return LikeOutlined;
    case "line":
      return LineOutlined;
    case "link":
      return LinkOutlined;
    case "loading-3-quarters":
      return Loading3QuartersOutlined;
    case "loading":
      return LoadingOutlined;
    case "mac-command":
      return MacCommandOutlined;
    case "mail":
      return MailOutlined;
    case "man":
      return ManOutlined;
    case "medicine-box":
      return MedicineBoxOutlined;
    case "meh":
      return MehOutlined;
    case "menu":
      return MenuOutlined;
    case "merge-cells":
      return MergeCellsOutlined;
    case "message":
      return MessageOutlined;
    case "mobile":
      return MobileOutlined;
    case "money-collect":
      return MoneyCollectOutlined;
    case "monitor":
      return MonitorOutlined;
    case "node-collapse":
      return NodeCollapseOutlined;
    case "node-expand":
      return NodeExpandOutlined;
    case "node-index":
      return NodeIndexOutlined;
    case "notification":
      return NotificationOutlined;
    case "number":
      return NumberOutlined;
    case "one-to-one":
      return OneToOneOutlined;
    case "paper-clip":
      return PaperClipOutlined;
    case "partition":
      return PartitionOutlined;
    case "pay-circle":
      return PayCircleOutlined;
    case "percentage":
      return PercentageOutlined;
    case "phone":
      return PhoneOutlined;
    case "picture":
      return PictureOutlined;
    case "play-square":
      return PlaySquareOutlined;
    case "pound-circle":
      return PoundCircleOutlined;
    case "pound":
      return PoundOutlined;
    case "poweroff":
      return PoweroffOutlined;
    case "printer":
      return PrinterOutlined;
    case "profile":
      return ProfileOutlined;
    case "project":
      return ProjectOutlined;
    case "property-safety":
      return PropertySafetyOutlined;
    case "pull-request":
      return PullRequestOutlined;
    case "pushpin":
      return PushpinOutlined;
    case "qrcode":
      return QrcodeOutlined;
    case "read":
      return ReadOutlined;
    case "reconciliation":
      return ReconciliationOutlined;
    case "red-envelope":
      return RedEnvelopeOutlined;
    case "reload":
      return ReloadOutlined;
    case "rest":
      return RestOutlined;
    case "robot":
      return RobotOutlined;
    case "rocket":
      return RocketOutlined;
    case "rotate-left":
      return RotateLeftOutlined;
    case "rotate-right":
      return RotateRightOutlined;
    case "safety-certificate":
      return SafetyCertificateOutlined;
    case "safety":
      return SafetyOutlined;
    case "save":
      return SaveOutlined;
    case "scan":
      return ScanOutlined;
    case "schedule":
      return ScheduleOutlined;
    case "security-scan":
      return SecurityScanOutlined;
    case "select":
      return SelectOutlined;
    case "send":
      return SendOutlined;
    case "shake":
      return ShakeOutlined;
    case "share-alt":
      return ShareAltOutlined;
    case "shop":
      return ShopOutlined;
    case "shopping-cart":
      return ShoppingCartOutlined;
    case "shopping":
      return ShoppingOutlined;
    case "sisternode":
      return SisternodeOutlined;
    case "skin":
      return SkinOutlined;
    case "smile":
      return SmileOutlined;
    case "solution":
      return SolutionOutlined;
    case "sound":
      return SoundOutlined;
    case "split-cells":
      return SplitCellsOutlined;
    case "star":
      return StarOutlined;
    case "subnode":
      return SubnodeOutlined;
    case "switcher":
      return SwitcherOutlined;
    case "sync":
    case "refresh":
      return SyncOutlined;
    case "table":
      return TableOutlined;
    case "tablet":
      return TabletOutlined;
    case "tag":
      return TagOutlined;
    case "tags":
      return TagsOutlined;
    case "team":
      return TeamOutlined;
    case "thunderbolt":
      return ThunderboltOutlined;
    case "to-top":
      return ToTopOutlined;
    case "tool":
      return ToolOutlined;
    case "trademark-circle":
      return TrademarkCircleOutlined;
    case "trademark":
      return TrademarkOutlined;
    case "transaction":
      return TransactionOutlined;
    case "translation":
      return TranslationOutlined;
    case "trophy":
      return TrophyOutlined;
    case "ungroup":
      return UngroupOutlined;
    case "unlock":
      return UnlockOutlined;
    case "usb":
      return UsbOutlined;
    case "user-add":
      return UserAddOutlined;
    case "user-delete":
      return UserDeleteOutlined;
    case "user-switch":
      return UserSwitchOutlined;
    case "usergroup-add":
      return UsergroupAddOutlined;
    case "usergroup-delete":
      return UsergroupDeleteOutlined;
    case "verified":
      return VerifiedOutlined;
    case "video-camera-add":
      return VideoCameraAddOutlined;
    case "video-camera":
      return VideoCameraOutlined;
    case "wallet":
      return WalletOutlined;
    case "whats-app":
      return WhatsAppOutlined;
    case "wifi":
      return WifiOutlined;
    case "woman":
      return WomanOutlined;

    case "del":
    case "delete":
      return DeleteOutlined;
    case "edit":
      return EditOutlined;
    case "add":
      return PlusOutlined;
    case "lock":
      return LockOutlined;
    case "more":
      return MoreOutlined;
    case "setting":
      return props.fill ? SettingFilled : SettingOutlined;
    case "column-height":
      return ColumnHeightOutlined;
    case "user":
      return UserOutlined;
    case "search":
      return SearchOutlined;
    case "upload":
      return UploadOutlined;
    case "download":
      return DownloadOutlined;
    case "question":
      return props.fill ? QuestionCircleFilled : QuestionCircleOutlined;
    case "swap":
      return SwapOutlined;
    case "fullscreen":
      return FullscreenOutlined;
    case "fullscreen-exit":
      return FullscreenExitOutlined;
    case "login":
      return LoginOutlined;
    case "logout":
      return LogoutOutlined;
    case "vertical-align-top":
      return VerticalAlignTopOutlined;
    case "vertical-align-middle":
      return VerticalAlignMiddleOutlined;
    case "vertical-align-bottom":
      return VerticalAlignBottomOutlined;
    case "down":
      return DownOutlined;
    case "up":
      return UpOutlined;
    case "play-circle":
      return PlayCircleOutlined;
    case "up-outlined":
    case "caret-up":
      return CaretUpOutlined;
    case "down-outlined":
    case "caret-down":
      return CaretDownOutlined;
    case "right-outlined":
      return CaretRightOutlined;
    case "arrows-alt":
      return ArrowsAltOutlined;
    case "thunder":
      return ThunderboltTwoTone;
    default:
      return null;
  }
};

const computedColor = () => {
  if (!props.color) return "";
  // 判断var(--，转换为#开头的颜色值
  if (props.color.startsWith("var(")) {
    const varName = props.color.slice(4, -1);
    let varValue = "";
    try {
      varValue = getComputedStyle(document.documentElement).getPropertyValue(
        varName,
      );
    } catch (error) {}
    return varValue;
  }
  return props.color;
};
</script>
<template>
  <component
    :is="getIcon()"
    :style="{
      fontSize:
        String(props.size)?.indexOf('rem') !== -1
          ? props.size
          : props.size + 'px',
      cursor,
      color: computedColor(),
    }"
  />
</template>
