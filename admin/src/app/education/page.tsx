'use client';

import { useState, useEffect } from 'react';
import { SectionEditor, TextInput, TextArea } from '@/components/editors';
import { ArrayEditor } from '@/components/editors/ArrayEditor';

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  location: string;
  description: string;
  gpa?: string;
}

const createEducation = (): Education => ({
  id: crypto.randomUUID(),
  institution: '',
  degree: '',
  field: '',
  duration: '',
  location: '',
  description: '',
  gpa: ''
});

export default function EducationEditorPage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [originalEducation, setOriginalEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.alamin.rocks'}/api/content/education`);
      if (response.ok) {
        const data = await response.json();
        setEducation(data);
        setOriginalEducation(data);
      }
    } catch (error) {
      console.log('Using empty education list');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.alamin.rocks'}/api/content/education`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
      body: JSON.stringify(education)
    });

    if (!response.ok) {
      throw new Error('Failed to save education');
    }

    setOriginalEducation(education);
  };

  const handleReset = () => {
    setEducation(originalEducation);
  };

  const hasChanges = JSON.stringify(education) !== JSON.stringify(originalEducation);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
      </div>
    );
  }

  return (
    <SectionEditor
      title="Education"
      description="Manage your educational background"
      onSave={handleSave}
      onReset={handleReset}
      hasChanges={hasChanges}
    >
      <ArrayEditor
        items={education}
        onChange={setEducation}
        createItem={createEducation}
        itemLabel="Education"
        renderItem={(edu, index, onChange) => (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Institution</label>
                <TextInput
                  value={edu.institution}
                  onChange={(v) => onChange({ ...edu, institution: v })}
                  placeholder="University Name"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Degree</label>
                <TextInput
                  value={edu.degree}
                  onChange={(v) => onChange({ ...edu, degree: v })}
                  placeholder="e.g., Bachelor of Science"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Field of Study</label>
                <TextInput
                  value={edu.field}
                  onChange={(v) => onChange({ ...edu, field: v })}
                  placeholder="e.g., Computer Science"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Duration</label>
                <TextInput
                  value={edu.duration}
                  onChange={(v) => onChange({ ...edu, duration: v })}
                  placeholder="e.g., 2014 - 2018"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Location</label>
                <TextInput
                  value={edu.location}
                  onChange={(v) => onChange({ ...edu, location: v })}
                  placeholder="City, Country"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">GPA (optional)</label>
                <TextInput
                  value={edu.gpa || ''}
                  onChange={(v) => onChange({ ...edu, gpa: v })}
                  placeholder="e.g., 3.8/4.0"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1">Description (optional)</label>
              <TextArea
                value={edu.description}
                onChange={(v) => onChange({ ...edu, description: v })}
                placeholder="Notable achievements, coursework, activities..."
                rows={2}
              />
            </div>
          </div>
        )}
      />
    </SectionEditor>
  );
}
