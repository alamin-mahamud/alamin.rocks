'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, AlertCircle, CheckCircle, Clock, ExternalLink } from 'lucide-react';

interface LivePreviewProps {
  pdfUrl: string | null;
  isCompiling: boolean;
  errors: string[];
  warnings: string[];
  compilationTime: number;
  onRefresh: () => void;
}

export function LivePreview({
  pdfUrl,
  isCompiling,
  errors,
  warnings,
  compilationTime,
  onRefresh
}: LivePreviewProps) {
  const [key, setKey] = useState(0);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.alamin.rocks';

  // Force iframe refresh when pdfUrl changes
  useEffect(() => {
    if (pdfUrl) {
      setKey(prev => prev + 1);
    }
  }, [pdfUrl]);

  return (
    <div className="h-full flex flex-col bg-gray-900 rounded-lg overflow-hidden">
      {/* Preview Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-200">PDF Preview</span>

          {isCompiling ? (
            <span className="flex items-center gap-1 text-xs text-yellow-400">
              <RefreshCw className="w-3 h-3 animate-spin" />
              Compiling...
            </span>
          ) : errors.length > 0 ? (
            <span className="flex items-center gap-1 text-xs text-red-400">
              <AlertCircle className="w-3 h-3" />
              {errors.length} error{errors.length > 1 ? 's' : ''}
            </span>
          ) : pdfUrl ? (
            <span className="flex items-center gap-1 text-xs text-green-400">
              <CheckCircle className="w-3 h-3" />
              Ready
            </span>
          ) : null}

          {compilationTime > 0 && !isCompiling && (
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              {compilationTime}ms
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {pdfUrl && (
            <a
              href={`${API_URL}${pdfUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          <button
            onClick={onRefresh}
            disabled={isCompiling}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors disabled:opacity-50"
            title="Refresh preview"
          >
            <RefreshCw className={`w-4 h-4 ${isCompiling ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Error/Warning Panel */}
      {(errors.length > 0 || warnings.length > 0) && (
        <div className="max-h-32 overflow-auto bg-gray-850 border-b border-gray-700">
          {errors.map((error, i) => (
            <div key={`error-${i}`} className="px-4 py-2 text-xs text-red-400 font-mono border-b border-gray-700 last:border-b-0">
              <span className="font-bold">Error:</span> {error}
            </div>
          ))}
          {warnings.map((warning, i) => (
            <div key={`warning-${i}`} className="px-4 py-2 text-xs text-yellow-400 font-mono border-b border-gray-700 last:border-b-0">
              <span className="font-bold">Warning:</span> {warning}
            </div>
          ))}
        </div>
      )}

      {/* PDF Viewer */}
      <div className="flex-1 bg-gray-800 flex items-center justify-center">
        {isCompiling ? (
          <div className="text-center text-gray-400">
            <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4" />
            <p>Compiling LaTeX...</p>
          </div>
        ) : errors.length > 0 ? (
          <div className="text-center text-red-400 p-8">
            <AlertCircle className="w-12 h-12 mx-auto mb-4" />
            <p className="font-medium mb-2">Compilation Failed</p>
            <p className="text-sm text-gray-400">
              Please fix the errors above and try again.
            </p>
          </div>
        ) : pdfUrl ? (
          <iframe
            key={key}
            src={`${API_URL}${pdfUrl}`}
            className="w-full h-full bg-white"
            title="PDF Preview"
          />
        ) : (
          <div className="text-center text-gray-400 p-8">
            <p className="mb-2">No PDF generated yet</p>
            <p className="text-sm">Start typing to compile your document</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LivePreview;
