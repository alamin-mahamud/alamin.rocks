'use client';

import { useState, useEffect } from 'react';
import { FileText, Check } from 'lucide-react';
import { cvApi } from '@/lib/api';

interface Template {
  id: string;
  name: string;
  description: string;
  preview_image: string | null;
  category: string;
}

interface TemplateSelectorProps {
  onSelect: (template: { id: string; latex_template: string }) => void;
  onClose: () => void;
}

export function TemplateSelector({ onSelect, onClose }: TemplateSelectorProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await cvApi.getTemplates();
      setTemplates(response.data);
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!selectedId) return;

    setApplying(true);
    try {
      const response = await cvApi.getTemplate(selectedId);
      onSelect({
        id: selectedId,
        latex_template: response.data.latex_template
      });
      onClose();
    } catch (error) {
      console.error('Failed to load template:', error);
    } finally {
      setApplying(false);
    }
  };

  const categoryColors: Record<string, string> = {
    professional: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    minimal: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    academic: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    modern: 'bg-green-500/10 text-green-400 border-green-500/20'
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-3xl max-h-[80vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Choose a Template</h2>
          <p className="text-sm text-gray-400 mt-1">
            Select a template to start with. You can customize it after.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-auto max-h-[50vh]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map(template => (
                <button
                  key={template.id}
                  onClick={() => setSelectedId(template.id)}
                  className={`relative p-4 rounded-lg border-2 text-left transition-all ${
                    selectedId === template.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  {selectedId === template.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{template.name}</h3>
                      <span className={`inline-flex px-2 py-0.5 text-xs rounded-full border ${categoryColors[template.category] || categoryColors.professional}`}>
                        {template.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400">{template.description}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={!selectedId || applying}
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {applying ? 'Applying...' : 'Use Template'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TemplateSelector;
