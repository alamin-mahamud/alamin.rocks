'use client';

import { useState, useEffect } from 'react';
import { SectionEditor, FieldGroup, TextInput, TextArea } from '@/components/editors';
import { StringArrayEditor } from '@/components/editors/ArrayEditor';

interface HeroData {
  name: string;
  roles: string[];
  description: string;
  metrics: Record<string, string>;
}

const defaultHero: HeroData = {
  name: 'Al-Amin Howlader',
  roles: ['Senior DevOps Engineer', 'SRE Specialist', 'Cloud Architect'],
  description: 'Building scalable infrastructure and reliable systems.',
  metrics: {
    'Years Experience': '8+',
    'Projects Delivered': '50+',
    'Uptime Achieved': '99.99%'
  }
};

export default function HeroEditorPage() {
  const [data, setData] = useState<HeroData>(defaultHero);
  const [originalData, setOriginalData] = useState<HeroData>(defaultHero);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.alamin.rocks'}/api/hero`);
      if (response.ok) {
        const heroData = await response.json();
        setData(heroData);
        setOriginalData(heroData);
      }
    } catch (error) {
      console.log('Using default hero data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.alamin.rocks'}/api/content/hero`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to save hero data');
    }

    setOriginalData(data);
  };

  const handleReset = () => {
    setData(originalData);
  };

  const hasChanges = JSON.stringify(data) !== JSON.stringify(originalData);

  const updateMetric = (key: string, value: string) => {
    setData(prev => ({
      ...prev,
      metrics: { ...prev.metrics, [key]: value }
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
      </div>
    );
  }

  return (
    <SectionEditor
      title="Hero Section"
      description="Edit the main hero section that appears at the top of your portfolio"
      onSave={handleSave}
      onReset={handleReset}
      hasChanges={hasChanges}
    >
      <FieldGroup label="Name" description="Your display name" required>
        <TextInput
          value={data.name}
          onChange={(value) => setData(prev => ({ ...prev, name: value }))}
          placeholder="Your Name"
        />
      </FieldGroup>

      <FieldGroup label="Roles" description="Your professional titles (shown as rotating text)">
        <StringArrayEditor
          items={data.roles}
          onChange={(roles) => setData(prev => ({ ...prev, roles }))}
          placeholder="e.g., Senior DevOps Engineer"
          itemLabel="Role"
          maxItems={5}
        />
      </FieldGroup>

      <FieldGroup label="Description" description="A brief tagline or description">
        <TextArea
          value={data.description}
          onChange={(value) => setData(prev => ({ ...prev, description: value }))}
          placeholder="Your professional tagline..."
          rows={2}
        />
      </FieldGroup>

      <FieldGroup label="Metrics" description="Key statistics to display">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(data.metrics).map(([key, value]) => (
            <div key={key}>
              <label className="block text-xs text-muted-foreground mb-1">{key}</label>
              <TextInput
                value={value}
                onChange={(v) => updateMetric(key, v)}
                placeholder="Value"
              />
            </div>
          ))}
        </div>
      </FieldGroup>
    </SectionEditor>
  );
}
