'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Save, Download, FileText, Layout, Layers, RefreshCw, CheckCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { cvApi } from '@/lib/api';
import { LivePreview } from '@/components/CV/LivePreview';
import { TemplateSelector } from '@/components/CV/TemplateSelector';

// Dynamically import Monaco editor to avoid SSR issues
const LaTeXEditor = dynamic(
  () => import('@/components/CV/LaTeXEditor').then(mod => mod.LaTeXEditor),
  {
    ssr: false,
    loading: () => (
      <div className="h-full flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }
);

const DEFAULT_LATEX = `\\documentclass[11pt,a4paper,sans]{moderncv}

\\moderncvstyle{classic}
\\moderncvcolor{blue}

\\usepackage[scale=0.85]{geometry}
\\usepackage[utf8]{inputenc}

% Personal data
\\name{Your}{Name}
\\title{Your Title}
\\address{City}{Country}
\\phone[mobile]{+1-XXX-XXX-XXXX}
\\email{your@email.com}
\\homepage{yourwebsite.com}

\\begin{document}

\\makecvtitle

\\section{Professional Summary}
Write your professional summary here.

\\section{Experience}
\\cventry{Year--Year}{Job Title}{Company}{City}{}{
\\begin{itemize}
\\item Achievement 1
\\item Achievement 2
\\end{itemize}}

\\section{Skills}
\\cvitem{Category}{Skill 1, Skill 2, Skill 3}

\\section{Education}
\\cventry{Year--Year}{Degree}{Institution}{City}{}{}

\\end{document}
`;

export default function CVEditorPage() {
  const [latexSource, setLatexSource] = useState(DEFAULT_LATEX);
  const [originalSource, setOriginalSource] = useState(DEFAULT_LATEX);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [compilationTime, setCompilationTime] = useState(0);
  const [showTemplates, setShowTemplates] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [cvName, setCvName] = useState('Resume');

  const compileTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load existing CV on mount
  useEffect(() => {
    loadCV();
  }, []);

  // Track changes
  useEffect(() => {
    setHasChanges(latexSource !== originalSource);
  }, [latexSource, originalSource]);

  // Debounced auto-compile
  useEffect(() => {
    if (compileTimeoutRef.current) {
      clearTimeout(compileTimeoutRef.current);
    }

    compileTimeoutRef.current = setTimeout(() => {
      compileLatex(latexSource);
    }, 1000); // 1 second debounce

    return () => {
      if (compileTimeoutRef.current) {
        clearTimeout(compileTimeoutRef.current);
      }
    };
  }, [latexSource]);

  const loadCV = async () => {
    try {
      const response = await cvApi.getCVSource();
      const data = response.data;
      setLatexSource(data.latex_source);
      setOriginalSource(data.latex_source);
      setCvName(data.name);
      // Compile on load
      compileLatex(data.latex_source);
    } catch (error) {
      console.log('No existing CV found, using default template');
      compileLatex(DEFAULT_LATEX);
    }
  };

  const compileLatex = async (source: string) => {
    setIsCompiling(true);
    setErrors([]);
    setWarnings([]);

    try {
      const response = await cvApi.compileCV(source, false);
      const result = response.data;

      if (result.success) {
        setPdfUrl(result.pdf_url);
        setErrors([]);
      } else {
        setErrors(result.errors || ['Compilation failed']);
      }
      setWarnings(result.warnings || []);
      setCompilationTime(result.compilation_time_ms || 0);
    } catch (error: any) {
      setErrors([error.message || 'Compilation failed']);
    } finally {
      setIsCompiling(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await cvApi.updateCVSource(latexSource, cvName);
      setOriginalSource(latexSource);
      setHasChanges(false);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = () => {
    if (pdfUrl) {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.alamin.rocks';
      window.open(`${API_URL}${pdfUrl}`, '_blank');
    }
  };

  const handleTemplateSelect = (template: { id: string; latex_template: string }) => {
    setLatexSource(template.latex_template);
  };

  const handleRefresh = useCallback(() => {
    compileLatex(latexSource);
  }, [latexSource]);

  return (
    <div className="h-screen flex flex-col bg-gray-950">
      {/* Header */}
      <header className="flex-shrink-0 h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <h1 className="text-lg font-semibold text-white">CV Editor</h1>
          </div>

          <div className="h-6 w-px bg-gray-700" />

          <input
            type="text"
            value={cvName}
            onChange={(e) => setCvName(e.target.value)}
            className="bg-transparent text-gray-300 text-sm border-b border-transparent hover:border-gray-600 focus:border-blue-500 focus:outline-none px-1"
          />

          {hasChanges && (
            <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded">
              Unsaved changes
            </span>
          )}

          {lastSaved && !hasChanges && (
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Saved {lastSaved.toLocaleTimeString()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTemplates(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Layers className="w-4 h-4" />
            Templates
          </button>

          <button
            onClick={handleRefresh}
            disabled={isCompiling}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isCompiling ? 'animate-spin' : ''}`} />
            Compile
          </button>

          <button
            onClick={handleDownload}
            disabled={!pdfUrl}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Download
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving || !hasChanges}
            className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </header>

      {/* Main Content - Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        <div className="w-1/2 border-r border-gray-800">
          <LaTeXEditor
            value={latexSource}
            onChange={setLatexSource}
            onSave={handleSave}
            height="100%"
          />
        </div>

        {/* Preview Panel */}
        <div className="w-1/2">
          <LivePreview
            pdfUrl={pdfUrl}
            isCompiling={isCompiling}
            errors={errors}
            warnings={warnings}
            compilationTime={compilationTime}
            onRefresh={handleRefresh}
          />
        </div>
      </div>

      {/* Template Selector Modal */}
      {showTemplates && (
        <TemplateSelector
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplates(false)}
        />
      )}
    </div>
  );
}
