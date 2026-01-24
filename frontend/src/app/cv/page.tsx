'use client';

import { useState, useEffect, useCallback } from 'react';
import { Download, FileText, Code, ExternalLink, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CVData {
  id: string;
  name: string;
  pdf_url: string | null;
  is_active: boolean;
  version: number;
  updated_at: string;
}

interface CVSource {
  id: string;
  name: string;
  latex_source: string;
  is_active: boolean;
  version: number;
  updated_at: string;
}

export default function CVPage() {
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [cvSource, setCvSource] = useState<CVSource | null>(null);
  const [showSource, setShowSource] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(1);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const fetchCV = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/api/cv`);
      if (!response.ok) throw new Error('Failed to fetch CV');
      const data = await response.json();
      setCvData(data);
    } catch (err) {
      setError('CV not available yet. Please check back later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchCV();
  }, [fetchCV]);

  const fetchSource = async () => {
    if (cvSource) return;
    try {
      const response = await fetch(`${API_URL}/api/cv/source`);
      if (!response.ok) throw new Error('Failed to fetch CV source');
      const data = await response.json();
      setCvSource(data);
    } catch (err) {
      console.error('Failed to fetch source:', err);
    }
  };

  const handleToggleSource = async () => {
    if (!showSource) {
      await fetchSource();
    }
    setShowSource(!showSource);
  };

  const handleDownload = () => {
    if (cvData?.pdf_url) {
      window.open(`${API_URL}${cvData.pdf_url}`, '_blank');
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

  return (
    <main className="min-h-screen relative" style={{ background: 'hsl(var(--background))' }}>
      {/* Geometric Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 right-0 w-96 h-96 opacity-5" viewBox="0 0 400 400">
          <circle cx="300" cy="100" r="150" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-64 h-64 opacity-5" viewBox="0 0 200 200">
          <polygon points="100,10 190,190 10,190" fill="currentColor" />
        </svg>
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b sticky top-0 z-20" style={{
          borderColor: 'hsl(var(--border))',
          background: 'hsl(var(--background) / 0.9)',
          backdropFilter: 'blur(12px)'
        }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 transition-colors"
                  style={{ color: 'hsl(var(--muted-foreground))' }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Back</span>
                </Link>
                <div className="h-4 w-px" style={{ background: 'hsl(var(--border))' }} />
                <div>
                  <h1 className="text-lg font-semibold">{cvData?.name || 'Curriculum Vitae'}</h1>
                  {cvData && (
                    <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      Version {cvData.version} &bull; Updated {new Date(cvData.updated_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleSource}
                  className="btn btn-secondary flex items-center gap-2"
                >
                  {showSource ? (
                    <>
                      <FileText className="w-4 h-4" />
                      <span className="hidden sm:inline">View PDF</span>
                    </>
                  ) : (
                    <>
                      <Code className="w-4 h-4" />
                      <span className="hidden sm:inline">View Source</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownload}
                  disabled={!cvData?.pdf_url}
                  className="btn btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'hsl(var(--foreground))' }} />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <FileText className="w-16 h-16 mb-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
              <h2 className="text-xl font-semibold mb-2">CV Not Available</h2>
              <p className="mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>{error}</p>
              <div className="flex gap-4">
                <button onClick={fetchCV} className="btn btn-primary">
                  Try Again
                </button>
                <Link href="/" className="btn btn-secondary">
                  Go Home
                </Link>
              </div>
            </div>
          ) : showSource && cvSource ? (
            <div className="rounded-lg overflow-hidden" style={{
              background: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))'
            }}>
              <div className="px-4 py-3 border-b flex items-center justify-between" style={{
                background: 'hsl(var(--muted))',
                borderColor: 'hsl(var(--border))'
              }}>
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
                  <span className="font-mono text-sm">resume.tex</span>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(cvSource.latex_source)}
                  className="text-sm transition-colors"
                  style={{ color: 'hsl(var(--muted-foreground))' }}
                >
                  Copy
                </button>
              </div>
              <pre className="p-4 overflow-auto max-h-[calc(100vh-250px)] text-sm font-mono">
                <code>{cvSource.latex_source}</code>
              </pre>
            </div>
          ) : cvData?.pdf_url ? (
            <div className="rounded-lg overflow-hidden" style={{
              background: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))'
            }}>
              <div className="px-4 py-3 border-b flex items-center justify-between" style={{
                background: 'hsl(var(--muted))',
                borderColor: 'hsl(var(--border))'
              }}>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-1 rounded disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm">Page {currentPage} of {totalPages}</span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-1 rounded disabled:opacity-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={handleZoomOut} disabled={zoom <= 50} className="p-1 rounded disabled:opacity-50">
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-sm w-12 text-center">{zoom}%</span>
                  <button onClick={handleZoomIn} disabled={zoom >= 200} className="p-1 rounded disabled:opacity-50">
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>

                <a
                  href={`${API_URL}${cvData.pdf_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm"
                  style={{ color: 'hsl(var(--muted-foreground))' }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Open in new tab</span>
                </a>
              </div>

              <div className="flex justify-center p-4 min-h-[calc(100vh-250px)]" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
                <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
                  <iframe
                    src={`${API_URL}${cvData.pdf_url}`}
                    className="w-[800px] h-[1000px] bg-white shadow-lg"
                    title="CV PDF Viewer"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <FileText className="w-16 h-16 mb-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
              <h2 className="text-xl font-semibold mb-2">No PDF Available</h2>
              <p style={{ color: 'hsl(var(--muted-foreground))' }}>
                The CV has not been compiled yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
