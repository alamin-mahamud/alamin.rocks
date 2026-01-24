'use client';

import { useState, useEffect } from 'react';
import { SectionEditor, FieldGroup, TextInput, TextArea } from '@/components/editors';
import { StringArrayEditor } from '@/components/editors/ArrayEditor';

interface AboutData {
  title: string;
  description: string[];
  skills: string[];
  quick_facts: Record<string, string>;
}

const defaultAbout: AboutData = {
  title: 'About Me',
  description: [
    'I am a passionate DevOps engineer with 8+ years of experience.',
    'I specialize in building and maintaining scalable cloud infrastructure.'
  ],
  skills: ['Kubernetes', 'AWS', 'Terraform', 'Python', 'CI/CD'],
  quick_facts: {
    'Location': 'Dhaka, Bangladesh',
    'Languages': 'English, Bengali',
    'Availability': 'Open to opportunities'
  }
};

export default function AboutEditorPage() {
  const [data, setData] = useState<AboutData>(defaultAbout);
  const [originalData, setOriginalData] = useState<AboutData>(defaultAbout);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.alamin.rocks'}/api/about`);
      if (response.ok) {
        const aboutData = await response.json();
        setData(aboutData);
        setOriginalData(aboutData);
      }
    } catch (error) {
      console.log('Using default about data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.alamin.rocks'}/api/content/about`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to save about data');
    }

    setOriginalData(data);
  };

  const handleReset = () => {
    setData(originalData);
  };

  const hasChanges = JSON.stringify(data) !== JSON.stringify(originalData);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
      </div>
    );
  }

  return (
    <SectionEditor
      title="About Section"
      description="Edit the about section of your portfolio"
      onSave={handleSave}
      onReset={handleReset}
      hasChanges={hasChanges}
    >
      <FieldGroup label="Section Title" required>
        <TextInput
          value={data.title}
          onChange={(value) => setData(prev => ({ ...prev, title: value }))}
          placeholder="About Me"
        />
      </FieldGroup>

      <FieldGroup label="Description Paragraphs" description="Add multiple paragraphs about yourself">
        <StringArrayEditor
          items={data.description}
          onChange={(description) => setData(prev => ({ ...prev, description }))}
          placeholder="Write a paragraph about yourself..."
          itemLabel="Paragraph"
        />
      </FieldGroup>

      <FieldGroup label="Core Skills" description="Key skills to highlight">
        <StringArrayEditor
          items={data.skills}
          onChange={(skills) => setData(prev => ({ ...prev, skills }))}
          placeholder="e.g., Kubernetes"
          itemLabel="Skill"
          maxItems={10}
        />
      </FieldGroup>

      <FieldGroup label="Quick Facts" description="Brief facts displayed alongside your about section">
        <div className="space-y-3">
          {Object.entries(data.quick_facts).map(([key, value]) => (
            <div key={key} className="flex gap-3">
              <TextInput
                value={key}
                onChange={() => {}}
                placeholder="Label"
                disabled
              />
              <TextInput
                value={value}
                onChange={(v) => setData(prev => ({
                  ...prev,
                  quick_facts: { ...prev.quick_facts, [key]: v }
                }))}
                placeholder="Value"
              />
            </div>
          ))}
        </div>
      </FieldGroup>
    </SectionEditor>
  );
}
