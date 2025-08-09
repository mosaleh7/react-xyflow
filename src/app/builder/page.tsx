'use client';

import React, { useState, useCallback, useMemo } from 'react';
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
import { WorkflowNode } from '@/types/workflow';
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
  Copy, 
  Undo, 
  Redo,
  Table,
  FileText,
  Layers,
  Eye,
  MousePointer,
  Shield,
  Download,
  Upload
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
        columns: [
          { id: 'name', label: 'Name', type: 'text', sortable: true },
          { id: 'email', label: 'Email', type: 'email', sortable: true },
          { id: 'status', label: 'Status', type: 'select', sortable: true }
        ],
        pagination: { enabled: true, pageSize: 10 },
        actions: [
          { id: 'edit', label: 'Edit', type: 'button', variant: 'primary' },
          { id: 'delete', label: 'Delete', type: 'button', variant: 'danger' }
        ],
        dataSource: { type: 'static', data: [] },
        styling: { theme: 'default' }
      }
    } as TableNodeData,
  },
];

const initialEdges: Edge[] = [];

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
          columns: [
            { id: 'col1', label: 'Column 1', type: 'text', sortable: true }
          ],
          pagination: { enabled: true, pageSize: 10 },
          actions: []
        } as TableNodeData;
      
      case 'formNode':
        return {
          label: 'New Form',
          fields: [
            { id: 'field1', label: 'Field 1', type: 'text', required: false }
          ],
          layout: { columns: 1 },
          validation: { enabled: true }
        } as FormNodeData;
      
      case 'formGroupNode':
        return {
          label: 'New Form Group',
          forms: [],
          layout: { type: 'tabs' },
          validation: { enabled: true }
        } as FormGroupNodeData;
      
      case 'displayNode':
        return {
          label: 'New Display',
          contentType: 'text',
          content: { value: 'Sample content' },
          styling: { theme: 'default' }
        } as DisplayNodeData;
      
      case 'actionNode':
        return {
          label: 'New Action',
          actions: [
            { id: 'action1', label: 'Click Me', type: 'button', variant: 'primary' }
          ],
          layout: { arrangement: 'horizontal' }
        } as ActionNodeData;
      
      case 'permissionNode':
        return {
          label: 'New Permission',
          rules: [
            { id: 'rule1', type: 'grant', condition: 'always', resource: '*' }
          ],
          context: { userRequired: true }
        } as PermissionNodeData;
      
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
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Node ID
                  </label>
                  <input
                    type="text"
                    value={selectedNode.id}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Node Type
                  </label>
                  <input
                    type="text"
                    value={selectedNode.type || 'default'}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={selectedNode.data?.label || ''}
                    onChange={(e) => {
                      setNodes((nds) =>
                        nds.map((node) =>
                          node.id === selectedNode.id
                            ? { ...node, data: { ...node.data, label: e.target.value } }
                            : node
                        )
                      );
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                      value={selectedNode.position.x}
                      onChange={(e) => {
                        setNodes((nds) =>
                          nds.map((node) =>
                            node.id === selectedNode.id
                              ? { ...node, position: { ...node.position, x: parseInt(e.target.value) || 0 } }
                              : node
                          )
                        );
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="number"
                      placeholder="Y"
                      value={selectedNode.position.y}
                      onChange={(e) => {
                        setNodes((nds) =>
                          nds.map((node) =>
                            node.id === selectedNode.id
                              ? { ...node, position: { ...node.position, y: parseInt(e.target.value) || 0 } }
                              : node
                          )
                        );
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
                      setSelectedNode(null);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    <Trash2 size={16} />
                    <span>Delete Node</span>
                  </button>
                </div>
              </div>
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

