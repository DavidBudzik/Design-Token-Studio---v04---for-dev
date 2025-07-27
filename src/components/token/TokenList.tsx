import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus, FolderPlus, Search } from 'lucide-react';
import { useTokenStore } from '@/stores/tokenStore';
import { TokenGroup } from './TokenGroup';
import { TokenItem } from './TokenItem';
import { TokenEditor } from './TokenEditor';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

export function TokenList() {
  const { 
    tokens, 
    groups, 
    selectedToken, 
    addGroup, 
    updateGroup, 
    selectToken 
  } = useTokenStore();
  
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredTokens = tokens.filter(token =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ungroupedTokens = filteredTokens.filter(token =>
    !groups.some(group => group.tokens.some(t => t.id === token.id))
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) {
      return;
    }

    // Handle group reordering
    const activeGroupIndex = groups.findIndex((group) => group.id === active.id);
    const overGroupIndex = groups.findIndex((group) => group.id === over.id);

    if (activeGroupIndex !== -1 && overGroupIndex !== -1) {
      const newGroups = arrayMove(groups, activeGroupIndex, overGroupIndex);
      // Update groups in store (would need to implement this method)
      console.log('Reorder groups:', newGroups);
    }
  };

  const handleAddGroup = () => {
    const groupName = prompt('Enter group name:');
    if (groupName) {
      addGroup(groupName, 'Primary');
    }
  };

  const handleAddToken = () => {
    selectToken(null);
    setIsEditorOpen(true);
  };

  const handleEditToken = (token: any) => {
    selectToken(token);
    setIsEditorOpen(true);
  };

  const activeToken = activeId ? tokens.find(t => t.id === activeId) : null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Design Tokens</h2>
              <p className="text-sm text-gray-600">
                {tokens.length} tokens • {groups.length} groups
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleAddGroup}>
                <FolderPlus className="h-4 w-4 mr-2" />
                Add Group
              </Button>
              <Button onClick={handleAddToken}>
                <Plus className="h-4 w-4 mr-2" />
                Add Token
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Token Groups */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={groups.map(g => g.id)}
          strategy={verticalListSortingStrategy}
        >
          {groups.map((group) => (
            <TokenGroup
              key={group.id}
              group={group}
              onAddToken={() => {
                selectToken(null);
                setIsEditorOpen(true);
              }}
            />
          ))}
        </SortableContext>

        <DragOverlay>
          {activeToken ? <TokenItem token={activeToken} /> : null}
        </DragOverlay>
      </DndContext>

      {/* Ungrouped Tokens */}
      {ungroupedTokens.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Ungrouped Tokens</h3>
              <span className="text-sm text-gray-500">
                {ungroupedTokens.length} tokens
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {ungroupedTokens.map((token) => (
                <TokenItem key={token.id} token={token} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {tokens.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Plus className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tokens yet
            </h3>
            <p className="text-gray-600 mb-4">
              Create your first design token to get started with your design system.
            </p>
            <Button onClick={handleAddToken}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Token
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Token Editor Modal */}
      {isEditorOpen && (
        <TokenEditor
          token={selectedToken}
          onClose={() => {
            setIsEditorOpen(false);
            selectToken(null);
          }}
        />
      )}
    </div>
  );
}