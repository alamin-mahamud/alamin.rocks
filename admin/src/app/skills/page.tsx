'use client';

import { useState, useEffect } from 'react';
import { SectionEditor, FieldGroup, TextInput } from '@/components/editors';
import { ArrayEditor } from '@/components/editors/ArrayEditor';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon: string;
  color: string;
}

const categories = [
  'Cloud & Infrastructure',
  'Containers & Orchestration',
  'CI/CD & Automation',
  'Monitoring & Observability',
  'Programming Languages',
  'Databases',
  'Security',
  'Other'
];

const createSkill = (): Skill => ({
  id: crypto.randomUUID(),
  name: '',
  category: 'Cloud & Infrastructure',
  level: 80,
  icon: 'code',
  color: '#3B82F6'
});

export default function SkillsEditorPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [originalSkills, setOriginalSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.alamin.rocks'}/api/techstack`);
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
        setOriginalSkills(data);
      }
    } catch (error) {
      console.log('Using empty skills list');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.alamin.rocks'}/api/content/skills`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
      body: JSON.stringify(skills)
    });

    if (!response.ok) {
      throw new Error('Failed to save skills');
    }

    setOriginalSkills(skills);
  };

  const handleReset = () => {
    setSkills(originalSkills);
  };

  const hasChanges = JSON.stringify(skills) !== JSON.stringify(originalSkills);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
      </div>
    );
  }

  return (
    <SectionEditor
      title="Skills & Tech Stack"
      description="Manage your technical skills and proficiency levels"
      onSave={handleSave}
      onReset={handleReset}
      hasChanges={hasChanges}
    >
      <ArrayEditor
        items={skills}
        onChange={setSkills}
        createItem={createSkill}
        itemLabel="Skill"
        renderItem={(skill, index, onChange) => (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Skill Name</label>
                <TextInput
                  value={skill.name}
                  onChange={(v) => onChange({ ...skill, name: v })}
                  placeholder="e.g., Kubernetes"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Category</label>
                <select
                  value={skill.category}
                  onChange={(e) => onChange({ ...skill, category: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">
                  Proficiency Level: {skill.level}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={(e) => onChange({ ...skill, level: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Icon Name</label>
                <TextInput
                  value={skill.icon}
                  onChange={(v) => onChange({ ...skill, icon: v })}
                  placeholder="e.g., server"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={skill.color}
                    onChange={(e) => onChange({ ...skill, color: e.target.value })}
                    className="w-10 h-10 rounded border border-border cursor-pointer"
                  />
                  <TextInput
                    value={skill.color}
                    onChange={(v) => onChange({ ...skill, color: v })}
                    placeholder="#3B82F6"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      />
    </SectionEditor>
  );
}
