import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { 
  Zap, 
  Play, 
  Save, 
  Send, 
  Download, 
  Upload, 
  Trash2, 
  Edit, 
  Copy, 
  ExternalLink,
  AlertTriangle,
  Keyboard,
  Clock
} from 'lucide-react';
import { ActionNodeProps } from '@/types/nodes';

export const ActionNode: React.FC<ActionNodeProps> = ({ data, selected }) => {
  const { title, actions, permissions } = data.config || {};
  const confirmation = data.config?.behavior;
  const shortcuts = data.config?.behavior?.keyboardShortcuts;

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'submit': return <Send className="w-4 h-4" />;
      case 'save': return <Save className="w-4 h-4" />;
      case 'delete': return <Trash2 className="w-4 h-4" />;
      case 'edit': return <Edit className="w-4 h-4" />;
      case 'copy': return <Copy className="w-4 h-4" />;
      case 'download': return <Download className="w-4 h-4" />;
      case 'upload': return <Upload className="w-4 h-4" />;
      case 'navigate': return <ExternalLink className="w-4 h-4" />;
      case 'trigger': return <Play className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getActionColor = (actionType: string) => {
    switch (actionType) {
      case 'submit': return 'bg-green-500 hover:bg-green-600 text-white';
      case 'save': return 'bg-blue-500 hover:bg-blue-600 text-white';
      case 'delete': return 'bg-red-500 hover:bg-red-600 text-white';
      case 'edit': return 'bg-yellow-500 hover:bg-yellow-600 text-white';
      case 'copy': return 'bg-gray-500 hover:bg-gray-600 text-white';
      case 'download': return 'bg-indigo-500 hover:bg-indigo-600 text-white';
      case 'upload': return 'bg-purple-500 hover:bg-purple-600 text-white';
      case 'navigate': return 'bg-teal-500 hover:bg-teal-600 text-white';
      case 'trigger': return 'bg-orange-500 hover:bg-orange-600 text-white';
      default: return 'bg-gray-600 hover:bg-gray-700 text-white';
    }
  };

  const primaryAction = actions && Array.isArray(actions) && actions.length > 0 ? actions[0] : undefined;
  const secondaryActions = actions && Array.isArray(actions) ? actions.slice(1, 4) : [];

  return (
    <div className={`bg-white border-2 rounded-lg shadow-lg min-w-[250px] max-w-[350px] ${
      selected ? 'border-orange-500' : 'border-gray-200'
    }`}>
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-orange-500 border-2 border-white"
      />
      
      {/* Node Header */}
      <div className="flex items-center gap-2 p-3 bg-orange-50 border-b border-gray-200 rounded-t-lg">
        <Zap className="w-5 h-5 text-orange-600" />
        <span className="font-semibold text-gray-800">{typeof title === 'string' ? title : 'Actions'}</span>
        {permissions && permissions.enabled && (
          <div className="ml-auto">
            <div className="w-2 h-2 bg-yellow-400 rounded-full" title="Requires permissions"></div>
          </div>
        )}
      </div>

      {/* Primary Action */}
      {primaryAction && (
        <div className="p-3">
          <button className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
            getActionColor(primaryAction.type)
          }`}>
            {getActionIcon(primaryAction.type)}
            <span>{primaryAction.label}</span>
            {shortcuts?.enabled && primaryAction.shortcut && (
              <div className="ml-auto flex items-center gap-1">
                <Keyboard className="w-3 h-3" />
                <span className="text-xs opacity-75">{primaryAction.shortcut}</span>
              </div>
            )}
          </button>
          
          {confirmation?.enabled && primaryAction.requiresConfirmation && (
            <div className="mt-2 flex items-center gap-1 text-xs text-orange-600">
              <AlertTriangle className="w-3 h-3" />
              <span>Requires confirmation</span>
            </div>
          )}
        </div>
      )}

      {/* Secondary Actions */}
      {secondaryActions && secondaryActions.length > 0 && (
        <div className="px-3 pb-3">
          <div className="space-y-2">
            {secondaryActions.map((action, index) => (
              <button
                key={index}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors ${
                  action.type === 'delete' 
                    ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {getActionIcon(action.type)}
                <span className="flex-1 text-left">{action.label}</span>
                {shortcuts?.enabled && action.shortcut && (
                  <span className="text-xs opacity-60">{action.shortcut}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Configuration */}
      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>Actions: {actions?.length || 0}</div>
          <div>Type: {primaryAction?.type || 'custom'}</div>
          {confirmation?.enabled && <div>Confirmations</div>}
          {shortcuts?.enabled && <div>Shortcuts</div>}
        </div>

        {/* Timing Configuration */}
        {data.timing && (
          <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>
              {data.timing.delay ? `Delay: ${data.timing.delay}ms` : 'Immediate'}
            </span>
          </div>
        )}
      </div>

      {/* Confirmation Dialog Preview */}
      {confirmation?.enabled && confirmation.message && (
        <div className="p-3 border-t border-gray-100">
          <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-3 h-3 text-yellow-600" />
              <span className="text-xs font-medium text-yellow-800">Confirmation</span>
            </div>
            <div className="text-xs text-yellow-700">
              {confirmation.message}
            </div>
            <div className="flex gap-2 mt-2">
              <button className="px-2 py-1 text-xs bg-yellow-600 text-white rounded">
                {confirmation.confirmText || 'Confirm'}
              </button>
              <button className="px-2 py-1 text-xs border border-yellow-300 text-yellow-700 rounded">
                {confirmation.cancelText || 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Info */}
      {permissions?.required && (
        <div className="p-3 border-t border-gray-100 rounded-b-lg">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span>Requires: {permissions.roles?.join(', ') || 'Authentication'}</span>
          </div>
        </div>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-orange-500 border-2 border-white"
      />
    </div>
  );
};





