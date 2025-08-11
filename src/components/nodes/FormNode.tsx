/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment */
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { FileText, Eye, EyeOff, Calendar, Hash, Mail, Type, CheckSquare } from 'lucide-react';
import { FormNodeProps } from '@/types/nodes';

export const FormNode: React.FC<FormNodeProps> = ({ data, selected }) => {
  const { title, fields, validation, layout, theme } = data;

  const getFieldIcon = (fieldType: string) => {
    switch (fieldType) {
      case 'email': return <Mail className="w-3 h-3" />;
      case 'number': return <Hash className="w-3 h-3" />;
      case 'date': return <Calendar className="w-3 h-3" />;
      case 'checkbox': return <CheckSquare className="w-3 h-3" />;
      case 'password': return <EyeOff className="w-3 h-3" />;
      default: return <Type className="w-3 h-3" />;
    }
  };

  return (
    <div className={`bg-white border-2 rounded-lg shadow-lg min-w-[280px] max-w-[400px] ${
      selected ? 'border-green-500' : 'border-gray-200'
    }`}>
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-green-500 border-2 border-white"
      />
      
      {/* Node Header */}
      <div className="flex items-center gap-2 p-3 bg-green-50 border-b border-gray-200 rounded-t-lg">
        <FileText className="w-5 h-5 text-green-600" />
        <span className="font-semibold text-gray-800">{String(title || 'Form')}</span>
        {Array.isArray(validation) && validation.some(rule => rule.type === 'required') && (
          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Required</span>
        )}
      </div>

      {/* Form Preview */}
      <div className="p-3 space-y-3">
        {Array.isArray(fields) && fields.slice(0, 4).map((field, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2">
              {getFieldIcon(field.type)}
              <label className="text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
            </div>
            
            {/* Field Preview */}
            <div className="relative">
              {field.type === 'textarea' ? (
                <div className="w-full h-16 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-xs text-gray-500">
                  {field.placeholder || 'Enter text...'}
                </div>
              ) : field.type === 'select' ? (
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-xs text-gray-500 flex items-center justify-between">
                  <span>{field.placeholder || 'Select option...'}</span>
                  <Eye className="w-3 h-3" />
                </div>
              ) : field.type === 'checkbox' ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-gray-300 rounded bg-gray-50"></div>
                  <span className="text-xs text-gray-500">{field.placeholder || 'Check this option'}</span>
                </div>
              ) : field.type === 'radio' ? (
                <div className="space-y-1">
                  {Array.isArray(field.options) && field.options.slice(0, 2).map((option: any, optIndex) => (
                    <div key={optIndex} className="flex items-center gap-2">
                      <div className="w-3 h-3 border border-gray-300 rounded-full bg-gray-50"></div>
                      <span className="text-xs text-gray-500">{option.label}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-xs text-gray-500">
                  {field.placeholder || `Enter ${field.type}...`}
                </div>
              )}
              
              {field.validation?.pattern && (
                <div className="absolute right-2 top-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" title="Has validation"></div>
                </div>
              )}
            </div>
          </div>
        ))}

        {fields && fields.length > 4 && (
          <div className="text-xs text-gray-500 text-center py-2 border-t border-gray-100">
            +{fields.length - 4} more fields
          </div>
        )}
      </div>

      {/* Form Configuration */}
      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600">Configuration</span>
          {layout?.columns && layout.columns > 1 && (
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
              {layout.columns} columns
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>Fields: {fields?.length || 0}</div>
          <div>Theme: {theme?.variant || 'default'}</div>
          {validation?.showErrors && <div>Live validation</div>}
          {data.submitAction && <div>Submit: {data.submitAction}</div>}
        </div>
      </div>

      {/* Submit Button Preview */}
      <div className="p-3 border-t border-gray-100 rounded-b-lg">
        <button className="w-full py-2 px-4 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 transition-colors">
          {data.submitLabel || 'Submit Form'}
        </button>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-green-500 border-2 border-white"
      />
    </div>
  );
};







