'use client';

import { useState, ReactNode } from 'react';
import { Save, RotateCcw, AlertCircle, CheckCircle } from 'lucide-react';

interface SectionEditorProps {
  title: string;
  description?: string;
  children: ReactNode;
  onSave: () => Promise<void>;
  onReset?: () => void;
  hasChanges?: boolean;
  saving?: boolean;
  error?: string | null;
  success?: string | null;
}

export function SectionEditor({
  title,
  description,
  children,
  onSave,
  onReset,
  hasChanges = false,
  saving = false,
  error = null,
  success = null
}: SectionEditorProps) {
  const [localSaving, setLocalSaving] = useState(false);
  const [localSuccess, setLocalSuccess] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const isSaving = saving || localSaving;
  const displayError = error || localError;
  const displaySuccess = success || localSuccess;

  const handleSave = async () => {
    setLocalSaving(true);
    setLocalError(null);
    setLocalSuccess(null);

    try {
      await onSave();
      setLocalSuccess('Changes saved successfully');
      setTimeout(() => setLocalSuccess(null), 3000);
    } catch (err: any) {
      setLocalError(err.message || 'Failed to save changes');
    } finally {
      setLocalSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {hasChanges && (
              <span className="text-xs text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-1 rounded">
                Unsaved changes
              </span>
            )}

            {onReset && (
              <button
                onClick={onReset}
                disabled={isSaving || !hasChanges}
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors disabled:opacity-50"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            )}

            <button
              onClick={handleSave}
              disabled={isSaving || !hasChanges}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Status Messages */}
        {displayError && (
          <div className="mt-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 px-4 py-3 rounded-md">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {displayError}
          </div>
        )}

        {displaySuccess && (
          <div className="mt-4 flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-4 py-3 rounded-md">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            {displaySuccess}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}

// Field components
interface FieldGroupProps {
  label: string;
  description?: string;
  children: ReactNode;
  required?: boolean;
}

export function FieldGroup({ label, description, children, required }: FieldGroupProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <label className="block text-sm font-medium text-foreground mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {description && (
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      )}
      {children}
    </div>
  );
}

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: 'text' | 'email' | 'url' | 'tel';
}

export function TextInput({
  value,
  onChange,
  placeholder,
  disabled,
  type = 'text'
}: TextInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50"
    />
  );
}

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
}

export function TextArea({
  value,
  onChange,
  placeholder,
  disabled,
  rows = 4
}: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50 resize-y"
    />
  );
}

export default SectionEditor;
