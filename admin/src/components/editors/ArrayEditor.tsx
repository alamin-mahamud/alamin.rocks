'use client';

import { useState, useCallback } from 'react';
import { Plus, Trash2, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';

interface ArrayEditorProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number, onChange: (item: T) => void) => React.ReactNode;
  createItem: () => T;
  itemLabel?: string;
  maxItems?: number;
  minItems?: number;
}

export function ArrayEditor<T>({
  items,
  onChange,
  renderItem,
  createItem,
  itemLabel = 'Item',
  maxItems,
  minItems = 0
}: ArrayEditorProps<T>) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleAdd = useCallback(() => {
    if (maxItems && items.length >= maxItems) return;
    onChange([...items, createItem()]);
  }, [items, onChange, createItem, maxItems]);

  const handleRemove = useCallback((index: number) => {
    if (items.length <= minItems) return;
    onChange(items.filter((_, i) => i !== index));
  }, [items, onChange, minItems]);

  const handleItemChange = useCallback((index: number, newItem: T) => {
    const newItems = [...items];
    newItems[index] = newItem;
    onChange(newItems);
  }, [items, onChange]);

  const handleMoveUp = useCallback((index: number) => {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    onChange(newItems);
  }, [items, onChange]);

  const handleMoveDown = useCallback((index: number) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    onChange(newItems);
  }, [items, onChange]);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newItems = [...items];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, removed);
    onChange(newItems);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          className={`group relative bg-background border border-border rounded-lg p-4 ${
            draggedIndex === index ? 'opacity-50' : ''
          }`}
        >
          <div className="flex items-start gap-3">
            {/* Drag handle */}
            <div className="flex-shrink-0 pt-1 cursor-grab active:cursor-grabbing text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              <GripVertical className="w-4 h-4" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {renderItem(item, index, (newItem) => handleItemChange(index, newItem))}
            </div>

            {/* Actions */}
            <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleMoveUp(index)}
                disabled={index === 0}
                className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move up"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleMoveDown(index)}
                disabled={index === items.length - 1}
                className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move down"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleRemove(index)}
                disabled={items.length <= minItems}
                className="p-1 text-muted-foreground hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Add button */}
      {(!maxItems || items.length < maxItems) && (
        <button
          onClick={handleAdd}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm text-muted-foreground hover:text-foreground border-2 border-dashed border-border hover:border-muted-foreground rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add {itemLabel}
        </button>
      )}
    </div>
  );
}

// Simple string array editor
interface StringArrayEditorProps {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  itemLabel?: string;
  maxItems?: number;
}

export function StringArrayEditor({
  items,
  onChange,
  placeholder = 'Enter value...',
  itemLabel = 'Item',
  maxItems
}: StringArrayEditorProps) {
  return (
    <ArrayEditor
      items={items}
      onChange={onChange}
      itemLabel={itemLabel}
      maxItems={maxItems}
      createItem={() => ''}
      renderItem={(item, index, onItemChange) => (
        <input
          type="text"
          value={item}
          onChange={(e) => onItemChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-card border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      )}
    />
  );
}

export default ArrayEditor;
