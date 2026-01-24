'use client';

import { useState, useEffect } from 'react';
import { SectionEditor, FieldGroup, TextInput, TextArea } from '@/components/editors';
import { ArrayEditor, StringArrayEditor } from '@/components/editors/ArrayEditor';

interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  current: boolean;
}

const createExperience = (): Experience => ({
  id: crypto.randomUUID(),
  company: '',
  role: '',
  duration: '',
  location: '',
  description: '',
  achievements: [],
  technologies: [],
  current: false
});

export default function ExperienceEditorPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [originalExperiences, setOriginalExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.alamin.rocks'}/api/content/experiences`);
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
        setOriginalExperiences(data);
      }
    } catch (error) {
      console.log('Using empty experience list');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.alamin.rocks'}/api/content/experiences`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
      body: JSON.stringify(experiences)
    });

    if (!response.ok) {
      throw new Error('Failed to save experiences');
    }

    setOriginalExperiences(experiences);
  };

  const handleReset = () => {
    setExperiences(originalExperiences);
  };

  const hasChanges = JSON.stringify(experiences) !== JSON.stringify(originalExperiences);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
      </div>
    );
  }

  return (
    <SectionEditor
      title="Experience"
      description="Manage your work experience timeline"
      onSave={handleSave}
      onReset={handleReset}
      hasChanges={hasChanges}
    >
      <ArrayEditor
        items={experiences}
        onChange={setExperiences}
        createItem={createExperience}
        itemLabel="Experience"
        renderItem={(exp, index, onChange) => (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Company</label>
                <TextInput
                  value={exp.company}
                  onChange={(v) => onChange({ ...exp, company: v })}
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Role</label>
                <TextInput
                  value={exp.role}
                  onChange={(v) => onChange({ ...exp, role: v })}
                  placeholder="Job Title"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Duration</label>
                <TextInput
                  value={exp.duration}
                  onChange={(v) => onChange({ ...exp, duration: v })}
                  placeholder="e.g., Jan 2020 - Present"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Location</label>
                <TextInput
                  value={exp.location}
                  onChange={(v) => onChange({ ...exp, location: v })}
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1">Description</label>
              <TextArea
                value={exp.description}
                onChange={(v) => onChange({ ...exp, description: v })}
                placeholder="Brief description of your role..."
                rows={2}
              />
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1">Key Achievements</label>
              <StringArrayEditor
                items={exp.achievements}
                onChange={(achievements) => onChange({ ...exp, achievements })}
                placeholder="Achievement..."
                itemLabel="Achievement"
              />
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1">Technologies Used</label>
              <StringArrayEditor
                items={exp.technologies}
                onChange={(technologies) => onChange({ ...exp, technologies })}
                placeholder="Technology..."
                itemLabel="Technology"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`current-${index}`}
                checked={exp.current}
                onChange={(e) => onChange({ ...exp, current: e.target.checked })}
                className="rounded border-border"
              />
              <label htmlFor={`current-${index}`} className="text-sm text-muted-foreground">
                This is my current position
              </label>
            </div>
          </div>
        )}
      />
    </SectionEditor>
  );
}
