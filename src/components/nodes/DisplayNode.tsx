/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment */
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Monitor, Image, BarChart3, FileText, Code, Eye, Link } from 'lucide-react';
import { DisplayNodeProps } from '@/types/nodes';

export const DisplayNode: React.FC<DisplayNodeProps> = ({ data, selected }) => {
  const config = data.config || {};
  const title = config.title || 'Display';
  const content = config.content || { type: 'text', value: '' };
  const contentType = content.type || 'text';
  const styling = config.styling || {};
  const dataBinding = config.dataBinding;

  const getContentIcon = () => {
    switch (contentType) {
      case 'text': return <FileText className="w-4 h-4" />;
      case 'html': return <Code className="w-4 h-4" />;
      case 'markdown': return <FileText className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'chart': return <BarChart3 className="w-4 h-4" />;
      case 'iframe': return <Monitor className="w-4 h-4" />;
      case 'video': return <Monitor className="w-4 h-4" />;
      case 'template': return <Code className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const renderContentPreview = () => {
    switch (contentType) {
      case 'text':
        return (
          <div className="p-3 text-sm text-gray-700 leading-relaxed">
{(content as any)?.text || 'Sample text content will be displayed here...'}
          </div>
        );
      
      case 'html':
        return (
          <div className="p-3 bg-gray-50 border border-gray-200 rounded">
            <div className="text-xs text-gray-500 mb-2">HTML Content:</div>
            <div className="font-mono text-xs text-gray-700 bg-white p-2 rounded border">
              {content.value || '<div>HTML content preview</div>'}
            </div>
          </div>
        );
      
      case 'markdown':
        return (
          <div className="p-3 space-y-2">
            <div className="text-sm font-semibold text-gray-800">
              # Sample Heading
            </div>
            <div className="text-sm text-gray-700">
              **Bold text** and *italic text* with [links](example.com)
            </div>
            <div className="text-xs text-gray-500">
              Markdown content: {content.value?.length || 0} characters
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div className="p-3">
            <div className="w-full h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
              <div className="text-center">
                <Image className="w-6 h-6 mx-auto text-gray-400 mb-1" />
                <div className="text-xs text-gray-500">
                  {content.mediaConfig?.src ? 'Image loaded' : 'No image'}
                </div>
              </div>
            </div>
            {content.mediaConfig?.src && (
              <div className="text-xs text-gray-500 mt-1 truncate">
                {content.mediaConfig.src}
              </div>
            )}
          </div>
        );
      
      case 'chart':
        return (
          <div className="p-3">
            <div className="w-full h-24 bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 rounded flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-6 h-6 mx-auto text-blue-500 mb-1" />
                <div className="text-xs text-blue-600 font-medium">
                  {content.chartConfig?.type || 'Bar'} Chart
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Data source: {content.chartConfig?.dataSource || 'None'}
            </div>
          </div>
        );
      
      case 'iframe':
        return (
          <div className="p-3">
            <div className="w-full h-24 bg-gray-100 border border-gray-300 rounded flex items-center justify-center">
              <div className="text-center">
                <Monitor className="w-6 h-6 mx-auto text-gray-500 mb-1" />
                <div className="text-xs text-gray-600">
                  Embedded Content
                </div>
              </div>
            </div>
            {content.value && (
              <div className="text-xs text-gray-500 mt-1 truncate">
                {content.value}
              </div>
            )}
          </div>
        );
      
      case 'video':
        return (
          <div className="p-3">
            <div className="w-full h-24 bg-gray-100 border border-gray-300 rounded flex items-center justify-center">
              <div className="text-center">
                <Monitor className="w-6 h-6 mx-auto text-gray-500 mb-1" />
                <div className="text-xs text-gray-600">
                  Video Content
                </div>
              </div>
            </div>
            {content.mediaConfig?.src && (
              <div className="text-xs text-gray-500 mt-1 truncate">
                {content.mediaConfig.src}
              </div>
            )}
          </div>
        );

      case 'template':
        return (
          <div className="p-3">
            <div className="bg-gray-50 border border-gray-200 rounded">
              <div className="text-xs text-gray-500 mb-2">Template Content:</div>
              <div className="font-mono text-xs text-gray-700 bg-white p-2 rounded border">
                {content.template || 'Template: {{variable}}'}
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-3 text-center text-gray-500">
            <Eye className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm">Display content preview</div>
          </div>
        );
    }
  };

  return (
    <div className={`bg-white border-2 rounded-lg shadow-lg min-w-[280px] max-w-[400px] ${
      selected ? 'border-indigo-500' : 'border-gray-200'
    }`}>
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-indigo-500 border-2 border-white"
      />
      
      {/* Node Header */}
      <div className="flex items-center gap-2 p-3 bg-indigo-50 border-b border-gray-200 rounded-t-lg">
        <Monitor className="w-5 h-5 text-indigo-600" />
        <span className="font-semibold text-gray-800">{title || 'Display'}</span>
        <div className="ml-auto flex items-center gap-1">
          {getContentIcon()}
          <span className="text-xs text-indigo-600 capitalize">{contentType || 'text'}</span>
        </div>
      </div>

      {/* Content Preview */}
      <div className="min-h-[100px]">
        <div className="p-3 text-center text-gray-500">
          <div className="text-sm font-medium">{contentType} Content</div>
          <div className="text-xs mt-1">Preview: {String(content.value || 'No content')}</div>
        </div>
      </div>

      {/* Data Binding Info */}
      {dataBinding?.enabled && (
        <div className="px-3 py-2 bg-yellow-50 border-t border-yellow-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span className="text-xs text-yellow-700 font-medium">Data Bound</span>
            {dataBinding.source && (
              <span className="text-xs text-yellow-600">
                → {dataBinding.source}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Styling Configuration */}
      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>Type: {contentType || 'text'}</div>
          <div>Theme: {styling?.theme || 'default'}</div>
          {styling?.responsive && <div>Responsive</div>}
          {styling?.animation && <div>Animated</div>}
        </div>
        
        {styling?.customCSS && (
          <div className="mt-2 text-xs text-gray-500">
            Custom styling applied
          </div>
        )}
      </div>

      {/* Interactive Elements */}
      {data.interactive && (
        <div className="p-3 border-t border-gray-100 rounded-b-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Interactive</span>
            <div className="flex gap-1">
              {data.actions?.map((action, index) => (
                <button
                  key={index}
                  className="px-2 py-1 text-xs bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-indigo-500 border-2 border-white"
      />
    </div>
  );
};





















