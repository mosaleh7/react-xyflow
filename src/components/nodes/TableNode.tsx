/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment */
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Table, ChevronDown, Filter, Search, MoreHorizontal } from 'lucide-react';
import { TableNodeProps } from '@/types/nodes';

export const TableNode: React.FC<TableNodeProps> = ({ data, selected }) => {
  const { title, columns, pagination, sorting, filtering, actions } = data;

  return (
    <div className={`bg-white border-2 rounded-lg shadow-lg min-w-[300px] ${
      selected ? 'border-blue-500' : 'border-gray-200'
    }`}>
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
      
      {/* Node Header */}
      <div className="flex items-center gap-2 p-3 bg-blue-50 border-b border-gray-200 rounded-t-lg">
        <Table className="w-5 h-5 text-blue-600" />
        <span className="font-semibold text-gray-800">{title || 'Data Table'}</span>
      </div>

      {/* Table Controls */}
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          {filtering?.enabled && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Filter className="w-3 h-3" />
              <span>Filterable</span>
            </div>
          )}
          {sorting?.enabled && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <ChevronDown className="w-3 h-3" />
              <span>Sortable</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Search className="w-3 h-3" />
            <span>Search</span>
          </div>
        </div>
      </div>

      {/* Table Preview */}
      <div className="p-3">
        <div className="border border-gray-200 rounded">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="flex">
              {columns?.slice(0, 3).map((column, index) => (
                <div key={index} className="flex-1 p-2 text-xs font-medium text-gray-700 border-r border-gray-200 last:border-r-0">
                  {column.label}
                  {sorting?.enabled && column.sortable && (
                    <ChevronDown className="inline w-3 h-3 ml-1" />
                  )}
                </div>
              ))}
              {actions && actions.length > 0 && (
                <div className="w-12 p-2 text-xs font-medium text-gray-700 text-center">
                  <MoreHorizontal className="w-3 h-3 mx-auto" />
                </div>
              )}
            </div>
          </div>
          
          {/* Table Rows Preview */}
          {[1, 2, 3].map((row) => (
            <div key={row} className="flex border-b border-gray-100 last:border-b-0">
              {columns?.slice(0, 3).map((column, index) => (
                <div key={index} className="flex-1 p-2 text-xs text-gray-600 border-r border-gray-100 last:border-r-0">
                  {column.type === 'number' ? '123' : 
                   column.type === 'date' ? '2024-01-01' :
                   column.type === 'boolean' ? '✓' : 'Sample data'}
                </div>
              ))}
              {actions && actions.length > 0 && (
                <div className="w-12 p-2 text-center">
                  <MoreHorizontal className="w-3 h-3 mx-auto text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination Info */}
        {pagination?.enabled && (
          <div className="mt-2 text-xs text-gray-500 text-center">
            Showing 1-{pagination.pageSize || 10} of {pagination.totalItems || 100} items
          </div>
        )}
      </div>

      {/* Configuration Summary */}
      <div className="p-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <div className="text-xs text-gray-600">
          <div>Columns: {columns?.length || 0}</div>
          {actions && <div>Actions: {actions.length}</div>}
          {data.dataSource && <div>Source: {data.dataSource}</div>}
        </div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
    </div>
  );
};



