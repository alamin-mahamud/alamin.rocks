'use client';

import { useState, useEffect } from 'react';
import { SectionEditor, FieldGroup, TextInput } from '@/components/editors';

interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  social_links: Record<string, string>;
}

const defaultContactInfo: ContactInfo = {
  email: 'contact@alamin.rocks',
  phone: '+880-XXX-XXXXXXX',
  location: 'Dhaka, Bangladesh',
  social_links: {
    linkedin: 'https://linkedin.com/in/alamin-howlader',
    github: 'https://github.com/alamin-rocks',
    twitter: 'https://twitter.com/alamin_rocks'
  }
};

const socialPlatforms = [
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/...' },
  { key: 'github', label: 'GitHub', placeholder: 'https://github.com/...' },
  { key: 'twitter', label: 'Twitter/X', placeholder: 'https://twitter.com/...' },
  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/...' },
  { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/...' },
  { key: 'medium', label: 'Medium', placeholder: 'https://medium.com/@...' },
  { key: 'dev', label: 'Dev.to', placeholder: 'https://dev.to/...' },
  { key: 'website', label: 'Personal Website', placeholder: 'https://...' }
];

export default function ContactInfoEditorPage() {
  const [data, setData] = useState<ContactInfo>(defaultContactInfo);
  const [originalData, setOriginalData] = useState<ContactInfo>(defaultContactInfo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.alamin.rocks'}/api/contact-info`);
      if (response.ok) {
        const contactData = await response.json();
        setData(contactData);
        setOriginalData(contactData);
      }
    } catch (error) {
      console.log('Using default contact info');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.alamin.rocks'}/api/content/contact-info`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to save contact info');
    }

    setOriginalData(data);
  };

  const handleReset = () => {
    setData(originalData);
  };

  const updateSocialLink = (key: string, value: string) => {
    setData(prev => ({
      ...prev,
      social_links: { ...prev.social_links, [key]: value }
    }));
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
      title="Contact Information"
      description="Manage your contact details and social media links"
      onSave={handleSave}
      onReset={handleReset}
      hasChanges={hasChanges}
    >
      <FieldGroup label="Primary Contact" description="Your main contact information">
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Email Address</label>
            <TextInput
              value={data.email}
              onChange={(value) => setData(prev => ({ ...prev, email: value }))}
              placeholder="your@email.com"
              type="email"
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Phone Number</label>
            <TextInput
              value={data.phone}
              onChange={(value) => setData(prev => ({ ...prev, phone: value }))}
              placeholder="+1-XXX-XXX-XXXX"
              type="tel"
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Location</label>
            <TextInput
              value={data.location}
              onChange={(value) => setData(prev => ({ ...prev, location: value }))}
              placeholder="City, Country"
            />
          </div>
        </div>
      </FieldGroup>

      <FieldGroup label="Social Media Links" description="Your social media and professional profiles">
        <div className="space-y-4">
          {socialPlatforms.map(platform => (
            <div key={platform.key}>
              <label className="block text-xs text-muted-foreground mb-1">{platform.label}</label>
              <TextInput
                value={data.social_links[platform.key] || ''}
                onChange={(value) => updateSocialLink(platform.key, value)}
                placeholder={platform.placeholder}
                type="url"
              />
            </div>
          ))}
        </div>
      </FieldGroup>
    </SectionEditor>
  );
}
