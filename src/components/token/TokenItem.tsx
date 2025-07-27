import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Edit, Copy, Trash2 } from 'lucide-react';
import { Token } from '@/types/token';
import { useTokenStore } from '@/stores/tokenStore';
import { Button } from '@/components/ui/Button';

interface TokenItemProps {
  token: Token;
}

export function TokenItem({ token }: TokenItemProps) {
  const { selectToken, deleteToken } = useTokenStore();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: token.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEdit = () => {
    selectToken(token);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(token.value);
    } catch (err) {
      console.error('Failed to copy token value:', err);
    }
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${token.name}"?`)) {
      deleteToken(token.id);
    }
  };

  const renderTokenPreview = () => {
    switch (token.type) {
      case 'color':
        return (
          <div
            className="w-8 h-8 rounded border-2 border-gray-200"
            style={{ backgroundColor: token.value }}
          />
        );
      case 'spacing':
        return (
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded text-xs font-mono text-blue-600">
            {token.value}
          </div>
        );
      case 'typography':
        return (
          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded text-xs font-mono text-green-600">
            Aa
          </div>
        );
      case 'borderRadius':
        return (
          <div 
            className="w-8 h-8 bg-purple-100 border-2 border-purple-300"
            style={{ borderRadius: token.value }}
          />
        );
      case 'shadow':
        return (
          <div 
            className="w-8 h-8 bg-white border border-gray-200"
            style={{ boxShadow: token.value }}
          />
        );
      default:
        return (
          <div className="w-8 h-8 bg-gray-100 rounded border border-gray-200" />
        );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center space-x-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
        >
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>
        
        {renderTokenPreview()}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {token.name}
            </h4>
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
              {token.type}
            </span>
          </div>
          <p className="text-xs text-gray-500 font-mono truncate">
            {token.value}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={handleEdit}
          className="h-8 w-8 p-0"
        >
          <Edit className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCopy}
          className="h-8 w-8 p-0"
        >
          <Copy className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleDelete}
          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}