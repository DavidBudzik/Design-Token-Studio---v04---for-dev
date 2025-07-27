import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronDown, ChevronRight, GripVertical, Plus } from 'lucide-react';
import { TokenGroup as TokenGroupType } from '@/types/token';
import { useTokenStore } from '@/stores/tokenStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TokenItem } from './TokenItem';

interface TokenGroupProps {
  group: TokenGroupType;
  onAddToken: () => void;
}

export function TokenGroup({ group, onAddToken }: TokenGroupProps) {
  const { updateGroup } = useTokenStore();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: group.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const toggleCollapsed = () => {
    updateGroup(group.id, { collapsed: !group.collapsed });
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? 'opacity-50' : ''} mb-4`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
            >
              <GripVertical className="h-4 w-4 text-gray-400" />
            </div>
            
            <button
              onClick={toggleCollapsed}
              className="flex items-center space-x-2 hover:bg-gray-100 rounded p-1"
            >
              {group.collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              <span className="font-medium text-gray-900">{group.name}</span>
            </button>
            
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
              {group.category}
            </span>
            
            <span className="text-xs text-gray-500">
              {group.tokens.length} tokens
            </span>
          </div>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={onAddToken}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {!group.collapsed && (
          <div className="space-y-2">
            {group.tokens.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No tokens in this group</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onAddToken}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Token
                </Button>
              </div>
            ) : (
              group.tokens.map((token) => (
                <TokenItem key={token.id} token={token} />
              ))
            )}
          </div>
        )}
      </div>
    </Card>
  );
}