'use client';

import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Background,
  Controls,
  MiniMap,
  Panel,
  NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Import custom node components
import { TableNode } from '@/components/nodes/TableNode';
import { FormNode } from '@/components/nodes/FormNode';
import { FormGroupNode } from '@/components/nodes/FormGroupNode';
import { DisplayNode } from '@/components/nodes/DisplayNode';
import { ActionNode } from '@/components/nodes/ActionNode';
import { PermissionNode } from '@/components/nodes/PermissionNode';

// Import types
import { 
  TableNodeData, 
  FormNodeData, 
  FormGroupNodeData, 
  DisplayNodeData, 
  ActionNodeData, 
  PermissionNodeData 
} from '@/types/nodes';

// Import icons
import { 
  Plus, 
  Save, 
  Play, 
  Settings, 
  Trash2,
  Table,
  FileText,
  Layers,
  Eye,
  MousePointer,
  Shield,
  Download,
  Upload,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

// Define custom node types for React Flow
const nodeTypes: NodeTypes = {
  tableNode: TableNode,
  formNode: FormNode,
  formGroupNode: FormGroupNode,
  displayNode: DisplayNode,
  actionNode: ActionNode,
  permissionNode: PermissionNode,
};

// Initial nodes for demonstration
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'tableNode',
    position: { x: 100, y: 100 },
    data: {
      label: 'Sample Table',
      config: {
        title: 'Sample Table',
        columns: [
          { id: 'name', label: 'Name', type: 'text', sortable: true },
          { id: 'email', label: 'Email', type: 'email', sortable: true },
          { id: 'status', label: 'Status', type: 'select', sortable: true }
        ],
        dataSource: 'static',
        pagination: true,
        pageSize: 10,
        sortable: true,
        filterable: true,
        searchable: true,
        selectable: false,
        exportable: true,
        refreshable: true,
        actions: [
          { id: 'edit', label: 'Edit', type: 'button', action: 'edit' },
          { id: 'delete', label: 'Delete', type: 'button', action: 'delete' }
        ]
      }
    } as TableNodeData,
  },
];

const initialEdges: Edge[] = [];

// Node Inspector Component
interface NodeInspectorProps {
  node: Node;
  onUpdateNode: (node: Node) => void;
  onDeleteNode: () => void;
}

const NodeInspector: React.FC<NodeInspectorProps> = ({ node, onUpdateNode, onDeleteNode }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    config: true,
    styling: false,
    advanced: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateNodeData = (path: string, value: unknown) => {
    const pathArray = path.split('.');
    const updatedNode = { ...node };
    let current: Record<string, unknown> = updatedNode.data;
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      if (!current[pathArray[i]]) {
        current[pathArray[i]] = {};
      }
      current = current[pathArray[i]] as Record<string, unknown>;
    }
    
    current[pathArray[pathArray.length - 1]] = value;
    onUpdateNode(updatedNode);
  };

  const renderBasicProperties = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Node ID
        </label>
        <input
          type="text"
          value={node.id}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Node Type
        </label>
        <input
          type="text"
          value={node.type || 'default'}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Label
        </label>
        <input
          type="text"
          value={String(node.data?.label || '')}
          onChange={(e) => updateNodeData('label', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Position
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="X"
            value={node.position.x}
            onChange={(e) => {
              const updatedNode = { 
                ...node, 
                position: { ...node.position, x: parseInt(e.target.value) || 0 } 
              };
              onUpdateNode(updatedNode);
            }}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <input
            type="number"
            placeholder="Y"
            value={node.position.y}
            onChange={(e) => {
              const updatedNode = { 
                ...node, 
                position: { ...node.position, y: parseInt(e.target.value) || 0 } 
              };
              onUpdateNode(updatedNode);
            }}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </div>
    </div>
  );

  const renderTableNodeConfig = () => {
    const config = (node.data?.config as Record<string, unknown>) || {};
    
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Table Title
          </label>
          <input
            type="text"
            value={String(config.title || '')}
            onChange={(e) => updateNodeData('config.title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Source
          </label>
          <select
            value={String(config.dataSource || 'static')}
            onChange={(e) => updateNodeData('config.dataSource', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="static">Static Data</option>
            <option value="api">API Endpoint</option>
            <option value="database">Database Query</option>
            <option value="form">Form Submissions</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={Boolean(config.pagination)}
                onChange={(e) => updateNodeData('config.pagination', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">Pagination</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={Boolean(config.sortable)}
                onChange={(e) => updateNodeData('config.sortable', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">Sortable</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={Boolean(config.filterable)}
                onChange={(e) => updateNodeData('config.filterable', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">Filterable</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={Boolean(config.searchable)}
                onChange={(e) => updateNodeData('config.searchable', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">Searchable</span>
            </label>
          </div>
        </div>

        {Boolean(config.pagination) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Page Size
            </label>
            <input
              type="number"
              value={Number(config.pageSize) || 10}
              onChange={(e) => updateNodeData('config.pageSize', parseInt(e.target.value) || 10)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              min="1"
              max="100"
            />
          </div>
        )}
      </div>
    );
  };

  const renderFormNodeConfig = () => {
    const config = (node.data?.config as Record<string, unknown>) || {};
    
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Form Title
          </label>
          <input
            type="text"
            value={String(config.title || '')}
            onChange={(e) => updateNodeData('config.title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Submit Action
          </label>
          <select
            value={String(config.submitAction || 'save')}
            onChange={(e) => updateNodeData('config.submitAction', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="save">Save to Database</option>
            <option value="email">Send Email</option>
            <option value="api">Call API</option>
            <option value="redirect">Redirect</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Layout Columns
            </label>
            <select
              value={Number((config.layout as Record<string, unknown>)?.columns) || 1}
              onChange={(e) => updateNodeData('config.layout.columns', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value={1}>1 Column</option>
              <option value={2}>2 Columns</option>
              <option value={3}>3 Columns</option>
            </select>
          </div>
          <div>
            <label className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                checked={Boolean((config.validation as Record<string, unknown>)?.required)}
                onChange={(e) => updateNodeData('config.validation.required', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">Required</span>
            </label>
          </div>
        </div>
      </div>
    );
  };

  const renderDisplayNodeConfig = () => {
    const config = (node.data?.config as Record<string, unknown>) || {};
    const content = (config.content as Record<string, unknown>) || {};
    const layout = (config.layout as Record<string, unknown>) || {};
    
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Title
          </label>
          <input
            type="text"
            value={String(config.title || '')}
            onChange={(e) => updateNodeData('config.title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content Type
          </label>
          <select
            value={String(content.type || 'text')}
            onChange={(e) => updateNodeData('config.content.type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="text">Plain Text</option>
            <option value="html">HTML</option>
            <option value="markdown">Markdown</option>
            <option value="template">Template</option>
            <option value="chart">Chart</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            value={String(content.value || '')}
            onChange={(e) => updateNodeData('config.content.value', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            rows={4}
            placeholder="Enter your content here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Layout
          </label>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={String(layout.width || 'auto')}
              onChange={(e) => updateNodeData('config.layout.width', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="auto">Auto Width</option>
              <option value="full">Full Width</option>
              <option value="fixed">Fixed Width</option>
            </select>
            <select
              value={String(layout.alignment || 'left')}
              onChange={(e) => updateNodeData('config.layout.alignment', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  const renderActionNodeConfig = () => {
    const config = (node.data?.config as Record<string, unknown>) || {};
    const confirmation = (config.confirmation as Record<string, unknown>) || {};
    
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Button Text
          </label>
          <input
            type="text"
            value={String(config.label || '')}
            onChange={(e) => updateNodeData('config.label', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Action Type
          </label>
          <select
            value={String(config.actionType || 'button')}
            onChange={(e) => updateNodeData('config.actionType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="button">Button</option>
            <option value="link">Link</option>
            <option value="submit">Submit Form</option>
            <option value="api">API Call</option>
            <option value="navigation">Navigate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Button Style
          </label>
          <select
            value={String(config.style || 'primary')}
            onChange={(e) => updateNodeData('config.style', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="danger">Danger</option>
            <option value="outline">Outline</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Action Target
          </label>
          <input
            type="text"
            value={String(config.target || '')}
            onChange={(e) => updateNodeData('config.target', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="URL, API endpoint, or form ID"
          />
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={Boolean(confirmation.enabled)}
              onChange={(e) => updateNodeData('config.confirmation.enabled', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700">Require Confirmation</span>
          </label>
        </div>

        {Boolean(confirmation.enabled) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmation Message
            </label>
            <input
              type="text"
              value={String(confirmation.message || '')}
              onChange={(e) => updateNodeData('config.confirmation.message', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Are you sure you want to proceed?"
            />
          </div>
        )}
      </div>
    );
  };

  const renderPermissionNodeConfig = () => {
    const config = (node.data?.config as Record<string, unknown>) || {};
    
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Permission Name
          </label>
          <input
            type="text"
            value={String(config.name || '')}
            onChange={(e) => updateNodeData('config.name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resource
          </label>
          <input
            type="text"
            value={String(config.resource || '')}
            onChange={(e) => updateNodeData('config.resource', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="e.g., users, posts, workouts"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Actions
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['create', 'read', 'update', 'delete'].map((action) => (
              <label key={action} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={Array.isArray(config.actions) && config.actions.includes(action)}
                  onChange={(e) => {
                    const currentActions = Array.isArray(config.actions) ? config.actions : [];
                    const newActions = e.target.checked
                      ? [...currentActions, action]
                      : currentActions.filter((a: unknown) => a !== action);
                    updateNodeData('config.actions', newActions);
                  }}
                  className="rounded"
                />
                <span className="text-sm text-gray-700 capitalize">{action}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User Roles
          </label>
          <input
            type="text"
            value={Array.isArray(config.roles) ? config.roles.join(', ') : ''}
            onChange={(e) => updateNodeData('config.roles', e.target.value.split(',').map((r: string) => r.trim()).filter(Boolean))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="admin, user, trainer (comma-separated)"
          />
        </div>
      </div>
    );
  };

  const renderFormGroupNodeConfig = () => {
    const config = (node.data?.config as Record<string, unknown>) || {};
    
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Group Title
          </label>
          <input
            type="text"
            value={String(config.title || '')}
            onChange={(e) => updateNodeData('config.title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Layout Style
          </label>
          <select
            value={String((config.layout as Record<string, unknown>)?.style || 'tabs')}
            onChange={(e) => updateNodeData('config.layout.style', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="tabs">Tabs</option>
            <option value="accordion">Accordion</option>
            <option value="wizard">Wizard</option>
            <option value="grid">Grid</option>
          </select>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={Boolean((config.validation as Record<string, unknown>)?.validateAll)}
              onChange={(e) => updateNodeData('config.validation.validateAll', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700">Validate All Forms</span>
          </label>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={Boolean((config.submission as Record<string, unknown>)?.confirmBeforeSubmit)}
              onChange={(e) => updateNodeData('config.submission.confirmBeforeSubmit', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700">Confirm Before Submit</span>
          </label>
        </div>
      </div>
    );
  };

  const renderNodeConfiguration = () => {
    switch (node.type) {
      case 'tableNode':
        return renderTableNodeConfig();
      case 'formNode':
        return renderFormNodeConfig();
      case 'displayNode':
        return renderDisplayNodeConfig();
      case 'actionNode':
        return renderActionNodeConfig();
      case 'permissionNode':
        return renderPermissionNodeConfig();
      case 'formGroupNode':
        return renderFormGroupNodeConfig();
      default:
        return <div className="text-sm text-gray-500">No configuration available for this node type.</div>;
    }
  };

  const renderSection = (title: string, key: string, content: React.ReactNode) => (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={() => toggleSection(key)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
      >
        <span className="font-medium text-gray-800">{title}</span>
        {expandedSections[key] ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {expandedSections[key] && (
        <div className="p-3 border-t border-gray-200">
          {content}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {renderSection('Basic Properties', 'basic', renderBasicProperties())}
      {renderSection('Configuration', 'config', renderNodeConfiguration())}
      
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={onDeleteNode}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          <Trash2 size={16} />
          <span>Delete Node</span>
        </button>
      </div>
    </div>
  );
};

// Node palette items
const nodeTemplates = [
  {
    type: 'tableNode',
    label: 'Table',
    icon: Table,
    description: 'Display data in a grid format',
    color: 'bg-blue-500',
  },
  {
    type: 'formNode',
    label: 'Form',
    icon: FileText,
    description: 'Create input forms',
    color: 'bg-green-500',
  },
  {
    type: 'formGroupNode',
    label: 'Form Group',
    icon: Layers,
    description: 'Group multiple forms',
    color: 'bg-purple-500',
  },
  {
    type: 'displayNode',
    label: 'Display',
    icon: Eye,
    description: 'Show content and media',
    color: 'bg-orange-500',
  },
  {
    type: 'actionNode',
    label: 'Action',
    icon: MousePointer,
    description: 'Buttons and triggers',
    color: 'bg-red-500',
  },
  {
    type: 'permissionNode',
    label: 'Permission',
    icon: Shield,
    description: 'Access control',
    color: 'bg-gray-500',
  },
];

export default function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isPaletteOpen, setIsPaletteOpen] = useState(true);
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);

  // Handle new connections between nodes
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Handle node selection
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  // Handle adding new nodes from palette
  const addNode = useCallback((nodeType: string) => {
    const newNode: Node = {
      id: `${nodeType}-${Date.now()}`,
      type: nodeType,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: getDefaultNodeData(nodeType),
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  // Get default data for new nodes
  const getDefaultNodeData = (nodeType: string) => {
    switch (nodeType) {
      case 'tableNode':
        return {
          label: 'New Table',
          config: {
            title: 'New Table',
            columns: [
              { id: 'col1', label: 'Column 1', type: 'text', sortable: true }
            ],
            dataSource: 'static',
            pagination: true,
            pageSize: 10,
            sortable: true,
            filterable: true,
            searchable: true,
            selectable: false,
            exportable: true,
            refreshable: true,
            actions: []
          }
        };
      
      case 'formNode':
        return {
          label: 'New Form',
          config: {
            title: 'New Form',
            fields: [
              { id: 'field1', label: 'Field 1', type: 'text', required: false }
            ],
            layout: { columns: 1 },
            validation: { required: false },
            submitAction: 'save'
          }
        };
      
      case 'formGroupNode':
        return {
          label: 'New Form Group',
          config: {
            title: 'New Form Group',
            layout: { style: 'tabs' },
            validation: { validateAll: false },
            submission: { confirmBeforeSubmit: false }
          }
        };
      
      case 'displayNode':
        return {
          label: 'New Display',
          config: {
            title: 'New Display',
            content: { type: 'text', value: 'Sample content' },
            layout: { width: 'auto', alignment: 'left' }
          }
        };
      
      case 'actionNode':
        return {
          label: 'New Action',
          config: {
            label: 'Click Me',
            actionType: 'button',
            style: 'primary',
            target: '',
            confirmation: { enabled: false }
          }
        };
      
      case 'permissionNode':
        return {
          label: 'New Permission',
          config: {
            name: 'New Permission',
            resource: 'users',
            actions: ['read'],
            roles: ['user']
          }
        };
      
      default:
        return { label: 'New Node' };
    }
  };

  // Handle workflow actions
  const handleSave = useCallback(() => {
    const workflow = { nodes, edges };
    console.log('Saving workflow:', workflow);
    // TODO: Implement actual save functionality
  }, [nodes, edges]);

  const handleRun = useCallback(() => {
    console.log('Running workflow:', { nodes, edges });
    // TODO: Implement workflow execution
  }, [nodes, edges]);

  const handleExport = useCallback(() => {
    const workflow = { nodes, edges };
    const dataStr = JSON.stringify(workflow, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'workflow.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [nodes, edges]);

  const handleImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const workflow = JSON.parse(e.target?.result as string);
          setNodes(workflow.nodes || []);
          setEdges(workflow.edges || []);
        } catch (error) {
          console.error('Error importing workflow:', error);
        }
      };
      reader.readAsText(file);
    }
  }, [setNodes, setEdges]);

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Node Palette */}
      {isPaletteOpen && (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Node Palette</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {nodeTemplates.map((template) => (
                <button
                  key={template.type}
                  onClick={() => addNode(template.type)}
                  className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded ${template.color} text-white`}>
                      <template.icon size={16} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{template.label}</div>
                      <div className="text-xs text-gray-500">{template.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPaletteOpen(!isPaletteOpen)}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
            >
              <Plus size={20} />
            </button>
            <div className="h-6 w-px bg-gray-300" />
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Save size={16} />
              <span>Save</span>
            </button>
            <button
              onClick={handleRun}
              className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <Play size={16} />
              <span>Run</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExport}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
              title="Export Workflow"
            >
              <Download size={20} />
            </button>
            <label className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded cursor-pointer" title="Import Workflow">
              <Upload size={20} />
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
            <button
              onClick={() => setIsInspectorOpen(!isInspectorOpen)}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* React Flow Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-gray-50"
          >
            <Background />
            <Controls />
            <MiniMap 
              nodeColor={(node) => {
                const template = nodeTemplates.find(t => t.type === node.type);
                return template?.color.replace('bg-', '#') || '#6b7280';
              }}
              className="bg-white border border-gray-200"
            />
            
            {/* Canvas Panels */}
            <Panel position="top-left" className="bg-white p-2 rounded shadow-sm border border-gray-200">
              <div className="text-sm text-gray-600">
                Nodes: {nodes.length} | Edges: {edges.length}
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </div>

      {/* Inspector Panel */}
      {isInspectorOpen && (
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Inspector</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {selectedNode ? (
              <NodeInspector 
                node={selectedNode} 
                onUpdateNode={(updatedNode) => {
                  setNodes((nds) =>
                    nds.map((node) =>
                      node.id === selectedNode.id ? updatedNode : node
                    )
                  );
                  setSelectedNode(updatedNode);
                }}
                onDeleteNode={() => {
                  setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
                  setSelectedNode(null);
                }}
              />
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Settings size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Select a node to view its properties</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
























































