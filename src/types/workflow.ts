import { Node, Edge, Connection } from '@xyflow/react';

// Base workflow node interface extending React Flow's Node
export interface WorkflowNode extends Node {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: NodeData;
  selected?: boolean;
  dragging?: boolean;
}

// Core node data interface
export interface NodeData extends Record<string, unknown> {
  label: string;
  description?: string;
  config: NodeConfig;
  validation?: ValidationRule[];
  metadata?: Record<string, any>;
}

// Node configuration based on node type
export interface NodeConfig {
  // Common properties
  title?: string;
  subtitle?: string;
  icon?: string;
  color?: string;
  
  // Form-specific properties
  fields?: FormField[];
  submitAction?: string;
  validationRules?: ValidationRule[];
  
  // Table-specific properties
  columns?: TableColumn[];
  dataSource?: string;
  pagination?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  
  // Display-specific properties
  content?: string;
  contentType?: 'text' | 'html' | 'markdown';
  template?: string;
  
  // Action-specific properties
  actionType?: 'button' | 'link' | 'trigger';
  actionTarget?: string;
  actionPayload?: Record<string, any>;
  
  // Permission-specific properties
  permissions?: Permission[];
  roles?: string[];
  conditions?: PermissionCondition[];
}

// Form field definition
export interface FormField {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  defaultValue?: any;
  options?: FieldOption[];
  validation?: ValidationRule[];
  conditional?: ConditionalLogic;
  metadata?: Record<string, any>;
}

// Field types supported by the platform
export type FieldType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'date' 
  | 'datetime' 
  | 'time'
  | 'select' 
  | 'multiselect' 
  | 'radio' 
  | 'checkbox' 
  | 'textarea' 
  | 'file' 
  | 'image'
  | 'url' 
  | 'phone' 
  | 'currency'
  | 'relation';

// Field options for select, radio, etc.
export interface FieldOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  metadata?: Record<string, any>;
}

// Validation rules for fields and nodes
export interface ValidationRule {
  type: ValidationType;
  value?: any;
  message: string;
  condition?: string;
}

export type ValidationType = 
  | 'required' 
  | 'minLength' 
  | 'maxLength' 
  | 'min' 
  | 'max' 
  | 'pattern' 
  | 'email' 
  | 'url' 
  | 'custom';

// Conditional logic for dynamic forms
export interface ConditionalLogic {
  field: string;
  operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan';
  value: any;
  action: 'show' | 'hide' | 'require' | 'disable';
}

// Table column definition
export interface TableColumn {
  id: string;
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'image' | 'link' | 'custom';
  sortable?: boolean;
  filterable?: boolean;
  width?: number;
  align?: 'left' | 'center' | 'right';
  format?: string;
  renderer?: string;
}

// Permission system
export interface Permission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: PermissionAction;
  conditions?: PermissionCondition[];
}

export type PermissionAction = 'create' | 'read' | 'update' | 'delete' | 'execute';

export interface PermissionCondition {
  field: string;
  operator: 'equals' | 'notEquals' | 'in' | 'notIn' | 'contains';
  value: any;
}

// Workflow template definition
export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  version: string;
  author?: string;
  tags?: string[];
  thumbnail?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  metadata: TemplateMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export type TemplateCategory = 
  | 'business' 
  | 'education' 
  | 'healthcare' 
  | 'finance' 
  | 'ecommerce' 
  | 'productivity' 
  | 'custom';

export interface TemplateMetadata {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedSetupTime: number; // in minutes
  requiredIntegrations?: string[];
  supportedFeatures: string[];
  documentation?: string;
  demoUrl?: string;
}

// Workflow edge extending React Flow's Edge
export interface WorkflowEdge extends Edge {
  id: string;
  source: string;
  target: string;
  type?: EdgeType;
  data?: EdgeData;
  animated?: boolean;
  style?: Record<string, any>;
}

export type EdgeType = 'default' | 'straight' | 'step' | 'smoothstep' | 'custom';

export interface EdgeData {
  label?: string;
  condition?: string;
  transform?: DataTransform;
  metadata?: Record<string, any>;
}

// Data transformation between nodes
export interface DataTransform {
  type: 'map' | 'filter' | 'reduce' | 'custom';
  config: Record<string, any>;
  script?: string;
}

// Workflow instance for runtime execution
export interface WorkflowInstance {
  id: string;
  templateId: string;
  name: string;
  status: WorkflowStatus;
  data: Record<string, any>;
  currentStep?: string;
  userId?: string;
  organizationId?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export type WorkflowStatus = 
  | 'draft' 
  | 'active' 
  | 'paused' 
  | 'completed' 
  | 'failed' 
  | 'cancelled';

// Node execution context
export interface NodeExecutionContext {
  nodeId: string;
  workflowInstanceId: string;
  inputData: Record<string, any>;
  previousNodes: Record<string, any>;
  user?: User;
  organization?: Organization;
  timestamp: Date;
}

// User and organization interfaces
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: string[];
  organizationId?: string;
  metadata?: Record<string, any>;
}

export type UserRole = 'admin' | 'editor' | 'viewer' | 'client';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  settings: OrganizationSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrganizationSettings {
  allowedDomains?: string[];
  maxUsers?: number;
  features: string[];
  branding?: BrandingSettings;
}

export interface BrandingSettings {
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  customCss?: string;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  metadata?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Event system for workflow execution
export interface WorkflowEvent {
  id: string;
  type: WorkflowEventType;
  workflowInstanceId: string;
  nodeId?: string;
  data: Record<string, any>;
  timestamp: Date;
  userId?: string;
}

export type WorkflowEventType = 
  | 'workflow.started' 
  | 'workflow.completed' 
  | 'workflow.failed' 
  | 'node.executed' 
  | 'node.failed' 
  | 'data.updated' 
  | 'user.action';

// Export all node types for easy importing
export type NodeType = 
  | 'table' 
  | 'form' 
  | 'formGroup' 
  | 'display' 
  | 'action' 
  | 'permission';

