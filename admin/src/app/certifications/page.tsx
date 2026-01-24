'use client';

import { useState, useEffect } from 'react';
import { SectionEditor, TextInput, TextArea } from '@/components/editors';
import { ArrayEditor } from '@/components/editors/ArrayEditor';

interface Certification {
  id: string;
  name: string;
  organization: string;
  year: string;
  credential_id?: string;
  credential_url?: string;
  status: 'active' | 'expired' | 'in_progress';
  description?: string;
}

const createCertification = (): Certification => ({
  id: crypto.randomUUID(),
  name: '',
  organization: '',
  year: new Date().getFullYear().toString(),
  credential_id: '',
  credential_url: '',
  status: 'active',
  description: ''
});

export default function CertificationsEditorPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [originalCertifications, setOriginalCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.alamin.rocks'}/api/content/certifications`);
      if (response.ok) {
        const data = await response.json();
        setCertifications(data);
        setOriginalCertifications(data);
      }
    } catch (error) {
      console.log('Using empty certifications list');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.alamin.rocks'}/api/content/certifications`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
      body: JSON.stringify(certifications)
    });

    if (!response.ok) {
      throw new Error('Failed to save certifications');
    }

    setOriginalCertifications(certifications);
  };

  const handleReset = () => {
    setCertifications(originalCertifications);
  };

  const hasChanges = JSON.stringify(certifications) !== JSON.stringify(originalCertifications);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
      </div>
    );
  }

  return (
    <SectionEditor
      title="Certifications"
      description="Manage your professional certifications"
      onSave={handleSave}
      onReset={handleReset}
      hasChanges={hasChanges}
    >
      <ArrayEditor
        items={certifications}
        onChange={setCertifications}
        createItem={createCertification}
        itemLabel="Certification"
        renderItem={(cert, index, onChange) => (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Certification Name</label>
                <TextInput
                  value={cert.name}
                  onChange={(v) => onChange({ ...cert, name: v })}
                  placeholder="e.g., AWS Solutions Architect Professional"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Issuing Organization</label>
                <TextInput
                  value={cert.organization}
                  onChange={(v) => onChange({ ...cert, organization: v })}
                  placeholder="e.g., Amazon Web Services"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Year Obtained</label>
                <TextInput
                  value={cert.year}
                  onChange={(v) => onChange({ ...cert, year: v })}
                  placeholder="2024"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Credential ID</label>
                <TextInput
                  value={cert.credential_id || ''}
                  onChange={(v) => onChange({ ...cert, credential_id: v })}
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Status</label>
                <select
                  value={cert.status}
                  onChange={(e) => onChange({ ...cert, status: e.target.value as Certification['status'] })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="in_progress">In Progress</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1">Credential URL</label>
              <TextInput
                value={cert.credential_url || ''}
                onChange={(v) => onChange({ ...cert, credential_url: v })}
                placeholder="https://..."
                type="url"
              />
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1">Description (optional)</label>
              <TextArea
                value={cert.description || ''}
                onChange={(v) => onChange({ ...cert, description: v })}
                placeholder="Brief description of this certification..."
                rows={2}
              />
            </div>
          </div>
        )}
      />
    </SectionEditor>
  );
}
