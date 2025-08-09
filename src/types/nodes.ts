import { NodeProps } from '@xyflow/react';
import { 
  WorkflowNode, 
  NodeData, 
  FormField, 
  TableColumn, 
  Permission,
  ValidationRule,
  FieldType 
} from './workflow';

// Base node props that all custom nodes receive
export interface BaseNodeProps extends NodeProps {
  id: string;
  data: NodeData;
  selected: boolean;
}

// Table Node Types
export interface TableNodeData extends NodeData {
  config: TableNodeConfig;
}

export interface TableNodeConfig {
  title: string;
  subtitle?: string;
  columns: TableColumn[];
  dataSource: string;
  pagination: boolean;
  pageSize: number;
  sortable: boolean;
  filterable: boolean;
  searchable: boolean;
  selectable: boolean;
  exportable: boolean;
  refreshable: boolean;
  actions?: TableAction[];
  styling?: TableStyling;
}

export interface TableAction {
  id: string;
  label: string;
  type: 'button' | 'link' | 'dropdown';
  icon?: string;
  color?: string;
  action: string;
  condition?: string;
  confirmation?: {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
  };
}

export interface TableStyling {
  headerBackground?: string;
  headerTextColor?: string;
  rowAlternateBackground?: string;
  borderColor?: string;
  fontSize?: 'sm' | 'md' | 'lg';
  density?: 'compact' | 'normal' | 'comfortable';
}

export interface TableNodeProps extends BaseNodeProps {
  data: TableNodeData;
}

// Form Node Types
export interface FormNodeData extends NodeData {
  config: FormNodeConfig;
}

export interface FormNodeConfig {
  title: string;
  subtitle?: string;
  fields: FormField[];
  submitButton: FormButton;
  cancelButton?: FormButton;
  resetButton?: FormButton;
  layout: FormLayout;
  validation: FormValidation;
  styling?: FormStyling;
  behavior?: FormBehavior;
}

export interface FormButton {
  label: string;
  type: 'submit' | 'button' | 'reset';
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
}

export interface FormLayout {
  type: 'single' | 'two-column' | 'three-column' | 'custom';
  spacing: 'tight' | 'normal' | 'loose';
  fieldOrder: string[];
  groups?: FormFieldGroup[];
}

export interface FormFieldGroup {
  id: string;
  title: string;
  description?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  fields: string[];
}

export interface FormValidation {
  validateOnChange: boolean;
  validateOnBlur: boolean;
  showErrorsInline: boolean;
  showErrorSummary: boolean;
  customValidators?: CustomValidator[];
}

export interface CustomValidator {
  id: string;
  name: string;
  function: string;
  message: string;
  fields: string[];
}

export interface FormStyling {
  theme: 'default' | 'minimal' | 'bordered' | 'filled';
  labelPosition: 'top' | 'left' | 'floating';
  fieldSpacing: 'tight' | 'normal' | 'loose';
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  customCss?: string;
}

export interface FormBehavior {
  autoSave: boolean;
  autoSaveInterval?: number;
  confirmBeforeLeave: boolean;
  resetAfterSubmit: boolean;
  redirectAfterSubmit?: string;
  showProgressBar: boolean;
}

export interface FormNodeProps extends BaseNodeProps {
  data: FormNodeData;
}

// Form Group Node Types
export interface FormGroupNodeData extends NodeData {
  config: FormGroupNodeConfig;
}

export interface FormGroupNodeConfig {
  title: string;
  subtitle?: string;
  description?: string;
  childForms: string[]; // IDs of child form nodes
  layout: GroupLayout;
  navigation: GroupNavigation;
  validation: GroupValidation;
  submission: GroupSubmission;
  styling?: GroupStyling;
}

export interface GroupLayout {
  type: 'tabs' | 'accordion' | 'stepper' | 'grid';
  orientation?: 'horizontal' | 'vertical';
  allowReorder: boolean;
  showProgress: boolean;
  progressType?: 'bar' | 'steps' | 'percentage';
}

export interface GroupNavigation {
  showNavigation: boolean;
  navigationPosition: 'top' | 'bottom' | 'both';
  allowSkip: boolean;
  validateBeforeNext: boolean;
  showStepNumbers: boolean;
  customLabels?: {
    next: string;
    previous: string;
    skip: string;
    finish: string;
  };
}

export interface GroupValidation {
  validateIndividualForms: boolean;
  validateGroupAsWhole: boolean;
  stopOnFirstError: boolean;
  showValidationSummary: boolean;
  customGroupValidators?: CustomValidator[];
}

export interface GroupSubmission {
  submitStrategy: 'all-at-once' | 'step-by-step' | 'on-demand';
  requireAllForms: boolean;
  allowPartialSubmission: boolean;
  confirmBeforeSubmit: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export interface GroupStyling {
  theme: 'default' | 'card' | 'minimal' | 'bordered';
  spacing: 'tight' | 'normal' | 'loose';
  headerStyle?: 'default' | 'prominent' | 'minimal';
  customCss?: string;
}

export interface FormGroupNodeProps extends BaseNodeProps {
  data: FormGroupNodeData;
}

// Display Node Types
export interface DisplayNodeData extends NodeData {
  config: DisplayNodeConfig;
}

export interface DisplayNodeConfig {
  title: string;
  subtitle?: string;
  content: DisplayContent;
  layout: DisplayLayout;
  interactivity?: DisplayInteractivity;
  styling?: DisplayStyling;
  dataBinding?: DisplayDataBinding;
}

export interface DisplayContent {
  type: 'text' | 'html' | 'markdown' | 'template' | 'chart' | 'image' | 'video' | 'iframe';
  value: string;
  template?: string;
  templateVariables?: Record<string, string>;
  chartConfig?: ChartConfig;
  mediaConfig?: MediaConfig;
}

export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'scatter' | 'area';
  dataSource: string;
  xAxis: string;
  yAxis: string | string[];
  colors?: string[];
  responsive: boolean;
  showLegend: boolean;
  showTooltips: boolean;
}

export interface MediaConfig {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export interface DisplayLayout {
  width: 'auto' | 'full' | 'fixed';
  height: 'auto' | 'fixed';
  fixedWidth?: number;
  fixedHeight?: number;
  alignment: 'left' | 'center' | 'right';
  padding: 'none' | 'sm' | 'md' | 'lg';
  margin: 'none' | 'sm' | 'md' | 'lg';
}

export interface DisplayInteractivity {
  clickable: boolean;
  clickAction?: string;
  hoverable: boolean;
  hoverEffect?: 'highlight' | 'scale' | 'shadow' | 'custom';
  selectable: boolean;
  copyable: boolean;
  printable: boolean;
}

export interface DisplayStyling {
  theme: 'default' | 'card' | 'minimal' | 'bordered' | 'elevated';
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  customCss?: string;
}

export interface DisplayDataBinding {
  enabled: boolean;
  dataSource?: string;
  refreshInterval?: number;
  autoRefresh: boolean;
  loadingState?: string;
  errorState?: string;
  emptyState?: string;
}

export interface DisplayNodeProps extends BaseNodeProps {
  data: DisplayNodeData;
}

// Action Node Types
export interface ActionNodeData extends NodeData {
  config: ActionNodeConfig;
}

export interface ActionNodeConfig {
  title: string;
  subtitle?: string;
  actions: ActionDefinition[];
  layout: ActionLayout;
  behavior: ActionBehavior;
  styling?: ActionStyling;
  permissions?: ActionPermissions;
}

export interface ActionDefinition {
  id: string;
  label: string;
  type: ActionType;
  icon?: string;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size: 'sm' | 'md' | 'lg';
  variant: 'solid' | 'outline' | 'ghost' | 'link';
  disabled?: boolean;
  loading?: boolean;
  tooltip?: string;
  confirmation?: ActionConfirmation;
  action: ActionHandler;
}

export type ActionType = 
  | 'button' 
  | 'link' 
  | 'dropdown' 
  | 'split-button' 
  | 'toggle' 
  | 'floating-action';

export interface ActionConfirmation {
  enabled: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  type: 'info' | 'warning' | 'error';
}

export interface ActionHandler {
  type: 'navigate' | 'submit' | 'api-call' | 'custom' | 'workflow-trigger';
  target?: string;
  payload?: Record<string, any>;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  customFunction?: string;
  workflowId?: string;
}

export interface ActionLayout {
  arrangement: 'horizontal' | 'vertical' | 'grid' | 'floating';
  spacing: 'tight' | 'normal' | 'loose';
  alignment: 'left' | 'center' | 'right' | 'justify';
  wrap: boolean;
  sticky?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export interface ActionBehavior {
  clickBehavior: 'immediate' | 'debounced' | 'throttled';
  debounceMs?: number;
  throttleMs?: number;
  preventDoubleClick: boolean;
  showLoadingState: boolean;
  disableOnSubmit: boolean;
  keyboardShortcuts?: KeyboardShortcut[];
}

export interface KeyboardShortcut {
  key: string;
  modifiers?: ('ctrl' | 'alt' | 'shift' | 'meta')[];
  actionId: string;
}

export interface ActionStyling {
  theme: 'default' | 'minimal' | 'elevated' | 'custom';
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  customCss?: string;
}

export interface ActionPermissions {
  enabled: boolean;
  requiredPermissions: string[];
  requiredRoles: string[];
  hideIfNoPermission: boolean;
  disableIfNoPermission: boolean;
}

export interface ActionNodeProps extends BaseNodeProps {
  data: ActionNodeData;
}

// Permission Node Types
export interface PermissionNodeData extends NodeData {
  config: PermissionNodeConfig;
}

export interface PermissionNodeConfig {
  title: string;
  subtitle?: string;
  permissions: Permission[];
  rules: PermissionRule[];
  enforcement: PermissionEnforcement;
  fallback: PermissionFallback;
  audit: PermissionAudit;
  styling?: PermissionStyling;
}

export interface PermissionRule {
  id: string;
  name: string;
  description?: string;
  type: 'allow' | 'deny' | 'conditional';
  priority: number;
  conditions: PermissionRuleCondition[];
  actions: PermissionRuleAction[];
  timeRestrictions?: TimeRestriction[];
  ipRestrictions?: string[];
  deviceRestrictions?: DeviceRestriction[];
}

export interface PermissionRuleCondition {
  field: string;
  operator: 'equals' | 'notEquals' | 'in' | 'notIn' | 'contains' | 'startsWith' | 'endsWith' | 'regex';
  value: any;
  caseSensitive?: boolean;
}

export interface PermissionRuleAction {
  type: 'grant' | 'revoke' | 'modify' | 'log' | 'notify';
  target: string;
  parameters?: Record<string, any>;
}

export interface TimeRestriction {
  type: 'hours' | 'days' | 'dateRange' | 'recurring';
  startTime?: string;
  endTime?: string;
  days?: number[]; // 0-6, Sunday-Saturday
  startDate?: Date;
  endDate?: Date;
  timezone?: string;
}

export interface DeviceRestriction {
  type: 'allow' | 'deny';
  deviceTypes?: ('desktop' | 'mobile' | 'tablet')[];
  browsers?: string[];
  operatingSystems?: string[];
  userAgentPatterns?: string[];
}

export interface PermissionEnforcement {
  mode: 'strict' | 'permissive' | 'audit-only';
  inheritFromParent: boolean;
  cascadeToChildren: boolean;
  cachePermissions: boolean;
  cacheDuration?: number;
  realTimeValidation: boolean;
}

export interface PermissionFallback {
  onDenied: 'hide' | 'disable' | 'redirect' | 'show-message' | 'custom';
  redirectUrl?: string;
  message?: string;
  customHandler?: string;
  showAlternative?: boolean;
  alternativeContent?: string;
}

export interface PermissionAudit {
  enabled: boolean;
  logLevel: 'none' | 'basic' | 'detailed' | 'verbose';
  logActions: ('grant' | 'deny' | 'check' | 'modify')[];
  retentionDays?: number;
  alertOnViolation: boolean;
  alertThreshold?: number;
  exportable: boolean;
}

export interface PermissionStyling {
  theme: 'default' | 'security' | 'minimal' | 'prominent';
  showPermissionStatus: boolean;
  statusIndicator?: 'icon' | 'badge' | 'border' | 'background';
  customCss?: string;
}

export interface PermissionNodeProps extends BaseNodeProps {
  data: PermissionNodeData;
}

// Union types for all node data and props
export type AnyNodeData = 
  | TableNodeData 
  | FormNodeData 
  | FormGroupNodeData 
  | DisplayNodeData 
  | ActionNodeData 
  | PermissionNodeData;

export type AnyNodeProps = 
  | TableNodeProps 
  | FormNodeProps 
  | FormGroupNodeProps 
  | DisplayNodeProps 
  | ActionNodeProps 
  | PermissionNodeProps;

// Node type guards for runtime type checking
export const isTableNodeData = (data: NodeData): data is TableNodeData => {
  return 'columns' in data.config;
};

export const isFormNodeData = (data: NodeData): data is FormNodeData => {
  return 'fields' in data.config;
};

export const isFormGroupNodeData = (data: NodeData): data is FormGroupNodeData => {
  return 'childForms' in data.config;
};

export const isDisplayNodeData = (data: NodeData): data is DisplayNodeData => {
  return 'content' in data.config;
};

export const isActionNodeData = (data: NodeData): data is ActionNodeData => {
  return 'actions' in data.config;
};

export const isPermissionNodeData = (data: NodeData): data is PermissionNodeData => {
  return 'permissions' in data.config;
};

// Helper types for node creation
export interface NodeCreationOptions {
  type: 'table' | 'form' | 'formGroup' | 'display' | 'action' | 'permission';
  position: { x: number; y: number };
  data?: Partial<AnyNodeData>;
}

export interface NodeTemplate {
  id: string;
  name: string;
  description: string;
  type: 'table' | 'form' | 'formGroup' | 'display' | 'action' | 'permission';
  icon: string;
  category: string;
  defaultData: AnyNodeData;
  previewImage?: string;
}

// Node validation types
export interface NodeValidationResult {
  isValid: boolean;
  errors: NodeValidationError[];
  warnings: NodeValidationWarning[];
}

export interface NodeValidationError {
  field: string;
  message: string;
  code: string;
  severity: 'error' | 'warning';
}

export interface NodeValidationWarning {
  field: string;
  message: string;
  code: string;
  suggestion?: string;
}

// Export commonly used types
export type {
  BaseNodeProps,
  NodeCreationOptions,
  NodeTemplate,
  NodeValidationResult
};
