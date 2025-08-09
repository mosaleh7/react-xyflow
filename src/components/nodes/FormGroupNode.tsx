/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Layers, ChevronRight, CheckCircle, AlertCircle, Grid, List } from 'lucide-react';
import { FormGroupNodeProps } from '@/types/nodes';

export const FormGroupNode: React.FC<FormGroupNodeProps> = ({ data, selected }) => {
  const config = data.config || {};
  const title = config.title || 'Form Group';
  const childForms = config.childForms || [];
  const layout = config.layout || { type: 'tabs' };
  const validation = config.validation;
  const navigation = config.navigation;
  
  // Create mock forms for display purposes
  const forms = childForms.map((id, index) => ({
    id,
    title: `Form ${index + 1}`,
    fields: [{ id: '1', label: 'Sample Field', type: 'text' }]
  }));

  const getLayoutIcon = () => {
    switch (layout?.type) {
      case 'tabs': return <Grid className="w-4 h-4" />;
      case 'accordion': return <List className="w-4 h-4" />;
      case 'stepper': return <ChevronRight className="w-4 h-4" />;
      default: return <Layers className="w-4 h-4" />;
    }
  };

  const getValidationStatus = (formIndex: number) => {
    if (validation?.validateOnChange) {
      return formIndex === 0 ? 'valid' : formIndex === 1 ? 'invalid' : 'pending';
    }
    return 'pending';
  };

  return (
    <div className={`bg-white border-2 rounded-lg shadow-lg min-w-[320px] max-w-[450px] ${
      selected ? 'border-purple-500' : 'border-gray-200'
    }`}>
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-purple-500 border-2 border-white"
      />
      
      {/* Node Header */}
      <div className="flex items-center gap-2 p-3 bg-purple-50 border-b border-gray-200 rounded-t-lg">
        <Layers className="w-5 h-5 text-purple-600" />
        <span className="font-semibold text-gray-800">{title || 'Form Group'}</span>
        <div className="ml-auto flex items-center gap-1">
          {getLayoutIcon()}
          <span className="text-xs text-purple-600 capitalize">{layout?.type || 'stack'}</span>
        </div>
      </div>

      {/* Layout Preview */}
      <div className="p-3">
        {layout?.type === 'tabs' && (
          <div className="space-y-2">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-200">
              {forms?.slice(0, 3).map((form, index) => (
                <button
                  key={index}
                  className={`px-3 py-2 text-xs font-medium border-b-2 ${
                    index === 0 
                      ? 'border-purple-500 text-purple-600 bg-purple-50' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {form.title}
                  {getValidationStatus(index) === 'valid' && (
                    <CheckCircle className="inline w-3 h-3 ml-1 text-green-500" />
                  )}
                  {getValidationStatus(index) === 'invalid' && (
                    <AlertCircle className="inline w-3 h-3 ml-1 text-red-500" />
                  )}
                </button>
              ))}
            </div>
            {/* Active Tab Content */}
            <div className="p-3 bg-gray-50 rounded border">
              <div className="text-xs text-gray-600">
                Form fields: {forms?.[0]?.fields?.length || 0}
              </div>
            </div>
          </div>
        )}

        {layout?.type === 'accordion' && (
          <div className="space-y-2">
            {forms?.slice(0, 3).map((form, index) => (
              <div key={index} className="border border-gray-200 rounded">
                <div className={`flex items-center justify-between p-2 cursor-pointer ${
                  index === 0 ? 'bg-purple-50' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-2">
                    <ChevronRight className={`w-3 h-3 transition-transform ${
                      index === 0 ? 'rotate-90' : ''
                    }`} />
                    <span className="text-sm font-medium">{form.title}</span>
                  </div>
                  {getValidationStatus(index) === 'valid' && (
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  )}
                  {getValidationStatus(index) === 'invalid' && (
                    <AlertCircle className="w-3 h-3 text-red-500" />
                  )}
                </div>
                {index === 0 && (
                  <div className="p-2 border-t border-gray-200 bg-white">
                    <div className="text-xs text-gray-600">
                      {form.fields?.length || 0} fields
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {layout?.type === 'stepper' && (
          <div className="space-y-3">
            {/* Stepper Progress */}
            <div className="flex items-center justify-between">
              {forms?.slice(0, 4).map((form, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    index === 0 ? 'bg-purple-500 text-white' :
                    index === 1 ? 'bg-purple-100 text-purple-600' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  {index < (forms?.length || 0) - 1 && index < 3 && (
                    <div className={`w-8 h-0.5 mx-1 ${
                      index === 0 ? 'bg-purple-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            {/* Current Step */}
            <div className="p-3 bg-purple-50 rounded border">
              <div className="font-medium text-sm text-purple-800">
                Step 1: {forms?.[0]?.title}
              </div>
              <div className="text-xs text-purple-600 mt-1">
                {forms?.[0]?.fields?.length || 0} fields to complete
              </div>
            </div>
          </div>
        )}

        {(!layout?.type || layout?.type === 'stack') && (
          <div className="space-y-2">
            {forms?.slice(0, 3).map((form, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{form.title}</span>
                  <div className="flex items-center gap-1">
                    {getValidationStatus(index) === 'valid' && (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    )}
                    {getValidationStatus(index) === 'invalid' && (
                      <AlertCircle className="w-3 h-3 text-red-500" />
                    )}
                    <span className="text-xs text-gray-500">
                      {form.fields?.length || 0} fields
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {forms && forms.length > 3 && (
          <div className="text-xs text-gray-500 text-center py-2 border-t border-gray-100 mt-2">
            +{forms.length - 3} more forms
          </div>
        )}
      </div>

      {/* Configuration Summary */}
      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>Forms: {forms?.length || 0}</div>
          <div>Layout: {layout?.type || 'stack'}</div>
          {validation?.validateOnChange && <div>Live validation</div>}
          {navigation?.showProgress && <div>Progress tracking</div>}
        </div>
      </div>

      {/* Navigation Controls */}
      {navigation?.showNavigation && (
        <div className="p-3 border-t border-gray-100 rounded-b-lg">
          <div className="flex justify-between">
            <button className="px-3 py-1 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 text-xs bg-purple-500 text-white rounded hover:bg-purple-600">
              Next
            </button>
          </div>
        </div>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-purple-500 border-2 border-white"
      />
    </div>
  );
};





