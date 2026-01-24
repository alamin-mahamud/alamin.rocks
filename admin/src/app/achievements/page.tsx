'use client';

import { useState, useEffect } from 'react';
import { SectionEditor, TextInput, TextArea } from '@/components/editors';
import { ArrayEditor, StringArrayEditor } from '@/components/editors/ArrayEditor';

interface Achievement {
  id: string;
  title: string;
  value: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  details: string[];
}

const categories = ['Impact', 'Performance', 'Scale', 'Innovation', 'Leadership'];

const createAchievement = (): Achievement => ({
  id: crypto.randomUUID(),
  title: '',
  value: '',
  description: '',
  icon: 'trophy',
  color: '#F59E0B',
  category: 'Impact',
  details: []
});

export default function AchievementsEditorPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [originalAchievements, setOriginalAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.alamin.rocks'}/api/achievements`);
      if (response.ok) {
        const data = await response.json();
        setAchievements(data);
        setOriginalAchievements(data);
      }
    } catch (error) {
      console.log('Using empty achievements list');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.alamin.rocks'}/api/content/achievements`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
      body: JSON.stringify(achievements)
    });

    if (!response.ok) {
      throw new Error('Failed to save achievements');
    }

    setOriginalAchievements(achievements);
  };

  const handleReset = () => {
    setAchievements(originalAchievements);
  };

  const hasChanges = JSON.stringify(achievements) !== JSON.stringify(originalAchievements);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
      </div>
    );
  }

  return (
    <SectionEditor
      title="Achievements"
      description="Showcase your key achievements and metrics"
      onSave={handleSave}
      onReset={handleReset}
      hasChanges={hasChanges}
    >
      <ArrayEditor
        items={achievements}
        onChange={setAchievements}
        createItem={createAchievement}
        itemLabel="Achievement"
        renderItem={(achievement, index, onChange) => (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Title</label>
                <TextInput
                  value={achievement.title}
                  onChange={(v) => onChange({ ...achievement, title: v })}
                  placeholder="e.g., System Uptime"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Value</label>
                <TextInput
                  value={achievement.value}
                  onChange={(v) => onChange({ ...achievement, value: v })}
                  placeholder="e.g., 99.99%"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1">Description</label>
              <TextArea
                value={achievement.description}
                onChange={(v) => onChange({ ...achievement, description: v })}
                placeholder="Brief description of this achievement..."
                rows={2}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Category</label>
                <select
                  value={achievement.category}
                  onChange={(e) => onChange({ ...achievement, category: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Icon</label>
                <TextInput
                  value={achievement.icon}
                  onChange={(v) => onChange({ ...achievement, icon: v })}
                  placeholder="trophy"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={achievement.color}
                    onChange={(e) => onChange({ ...achievement, color: e.target.value })}
                    className="w-10 h-10 rounded border border-border cursor-pointer"
                  />
                  <TextInput
                    value={achievement.color}
                    onChange={(v) => onChange({ ...achievement, color: v })}
                    placeholder="#F59E0B"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1">Details</label>
              <StringArrayEditor
                items={achievement.details}
                onChange={(details) => onChange({ ...achievement, details })}
                placeholder="Add detail..."
                itemLabel="Detail"
              />
            </div>
          </div>
        )}
      />
    </SectionEditor>
  );
}
