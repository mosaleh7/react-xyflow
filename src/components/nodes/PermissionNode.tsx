/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment */
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { 
  Shield, 
  User, 
  Users, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  Clock, 
  Smartphone, 
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { PermissionNodeProps } from '@/types/nodes';

export const PermissionNode: React.FC<PermissionNodeProps> = ({ data, selected }) => {
  const { title, rules, timeRestrictions, deviceRestrictions, auditLog } = data;

  const getPermissionIcon = (action: string) => {
    switch (action) {
      case 'read': return <Eye className="w-3 h-3" />;
      case 'write': return <Lock className="w-3 h-3" />;
      case 'delete': return <XCircle className="w-3 h-3" />;
      case 'admin': return <Shield className="w-3 h-3" />;
      default: return <User className="w-3 h-3" />;
    }
  };

  const getPermissionColor = (action: string) => {
    switch (action) {
      case 'read': return 'text-green-600 bg-green-50';
      case 'write': return 'text-blue-600 bg-blue-50';
      case 'delete': return 'text-red-600 bg-red-50';
      case 'admin': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRuleStatus = (rule: any) => {
    // Simulate rule evaluation for preview
    if (rule.action === 'admin') return 'denied';
    if (rule.action === 'read') return 'granted';
    return 'conditional';
  };

  return (
    <div className={`bg-white border-2 rounded-lg shadow-lg min-w-[300px] max-w-[400px] ${
      selected ? 'border-red-500' : 'border-gray-200'
    }`}>
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-red-500 border-2 border-white"
      />
      
      {/* Node Header */}
      <div className="flex items-center gap-2 p-3 bg-red-50 border-b border-gray-200 rounded-t-lg">
        <Shield className="w-5 h-5 text-red-600" />
        <span className="font-semibold text-gray-800">{String(title || 'Access Control')}</span>
        <div className="ml-auto">
          {data.enforced ? (
            <Lock className="w-4 h-4 text-red-600" />
          ) : (
            <Unlock className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </div>

      {/* Permission Rules */}
      <div className="p-3">
        <div className="space-y-2">
          {Array.isArray(rules) && rules.slice(0, 4).map((rule: any, index: number) => {
            const status = getRuleStatus(rule);
            return (
              <div key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded">
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded ${getPermissionColor(rule.action)}`}>
                    {getPermissionIcon(rule.action)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      {rule.action.charAt(0).toUpperCase() + rule.action.slice(1)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {rule.roles?.join(', ') || 'All users'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  {status === 'granted' && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  {status === 'denied' && (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  {status === 'conditional' && (
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
              </div>
            );
          })}

          {Array.isArray(rules) && rules.length > 4 && (
            <div className="text-xs text-gray-500 text-center py-1">
              +{rules.length - 4} more rules
            </div>
          )}
        </div>
      </div>

      {/* Time Restrictions */}
      {Boolean((timeRestrictions as Record<string, unknown>)?.enabled) && (
        <div className="px-3 pb-3">
          <div className="bg-blue-50 border border-blue-200 rounded p-2">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-3 h-3 text-blue-600" />
              <span className="text-xs font-medium text-blue-800">Time Restrictions</span>
            </div>
            <div className="text-xs text-blue-700">
              {timeRestrictions.allowedHours ? 
                `${timeRestrictions.allowedHours.start} - ${timeRestrictions.allowedHours.end}` :
                'Business hours only'
              }
            </div>
            {timeRestrictions.allowedDays && (
              <div className="text-xs text-blue-600 mt-1">
                Days: {timeRestrictions.allowedDays.join(', ')}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Device Restrictions */}
      {deviceRestrictions?.enabled && (
        <div className="px-3 pb-3">
          <div className="bg-purple-50 border border-purple-200 rounded p-2">
            <div className="flex items-center gap-2 mb-1">
              <Smartphone className="w-3 h-3 text-purple-600" />
              <span className="text-xs font-medium text-purple-800">Device Restrictions</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {deviceRestrictions.allowedDevices?.map((device, index) => (
                <span key={index} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                  {device}
                </span>
              ))}
            </div>
            {deviceRestrictions.ipWhitelist && (
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-purple-600" />
                <span className="text-xs text-purple-600">IP restricted</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* User Context Preview */}
      <div className="px-3 pb-3">
        <div className="bg-gray-50 border border-gray-200 rounded p-2">
          <div className="flex items-center gap-2 mb-1">
            <User className="w-3 h-3 text-gray-600" />
            <span className="text-xs font-medium text-gray-700">Current Context</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div>Role: {data.currentUser?.role || 'Guest'}</div>
            <div>Device: {data.currentUser?.device || 'Desktop'}</div>
            <div>Time: {new Date().toLocaleTimeString()}</div>
            <div>Location: {data.currentUser?.location || 'Unknown'}</div>
          </div>
        </div>
      </div>

      {/* Configuration Summary */}
      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>Rules: {rules?.length || 0}</div>
          <div>Mode: {data.mode || 'strict'}</div>
          {timeRestrictions?.enabled && <div>Time limits</div>}
          {deviceRestrictions?.enabled && <div>Device limits</div>}
        </div>
      </div>

      {/* Audit Log Info */}
      {auditLog?.enabled && (
        <div className="p-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-600">Audit logging active</span>
            </div>
            <span className="text-xs text-gray-500">
              {auditLog.retentionDays || 30} days retention
            </span>
          </div>
        </div>
      )}

      {/* Access Status */}
      <div className="p-3 border-t border-gray-100 rounded-b-lg">
        <div className={`flex items-center justify-center gap-2 py-2 px-3 rounded text-sm font-medium ${
          data.enforced 
            ? 'bg-red-100 text-red-700 border border-red-200'
            : 'bg-green-100 text-green-700 border border-green-200'
        }`}>
          {data.enforced ? (
            <>
              <Lock className="w-4 h-4" />
              <span>Access Restricted</span>
            </>
          ) : (
            <>
              <Unlock className="w-4 h-4" />
              <span>Access Granted</span>
            </>
          )}
        </div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-red-500 border-2 border-white"
      />
    </div>
  );
};







