'use client';

import { useRef, useCallback } from 'react';
import Editor, { OnMount, OnChange } from '@monaco-editor/react';
import type { editor, IPosition, languages } from 'monaco-editor';

interface LaTeXEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSave?: () => void;
  height?: string;
  readOnly?: boolean;
}

export function LaTeXEditor({
  value,
  onChange,
  onSave,
  height = '100%',
  readOnly = false
}: LaTeXEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorMount: OnMount = useCallback((editor, monaco) => {
    editorRef.current = editor;

    // Register LaTeX language if not already registered
    monaco.languages.register({ id: 'latex' });

    // LaTeX syntax highlighting
    monaco.languages.setMonarchTokensProvider('latex', {
      tokenizer: {
        root: [
          // Comments
          [/%.*$/, 'comment'],

          // Commands
          [/\\[a-zA-Z@]+/, 'keyword'],

          // Math mode
          [/\$\$/, { token: 'string', next: '@mathDisplay' }],
          [/\$/, { token: 'string', next: '@mathInline' }],

          // Braces
          [/[{}]/, 'delimiter.curly'],
          [/[\[\]]/, 'delimiter.square'],

          // Special characters
          [/[&~]/, 'delimiter'],

          // Numbers
          [/\d+/, 'number'],
        ],
        mathDisplay: [
          [/\$\$/, { token: 'string', next: '@pop' }],
          [/./, 'string'],
        ],
        mathInline: [
          [/\$/, { token: 'string', next: '@pop' }],
          [/./, 'string'],
        ],
      },
    });

    // LaTeX auto-completion
    monaco.languages.registerCompletionItemProvider('latex', {
      provideCompletionItems: (model: editor.ITextModel, position: IPosition) => {
        const suggestions = [
          // Document structure
          { label: '\\documentclass', insertText: '\\documentclass{${1:article}}', kind: monaco.languages.CompletionItemKind.Snippet },
          { label: '\\begin', insertText: '\\begin{${1:environment}}\n\t$0\n\\end{${1:environment}}', kind: monaco.languages.CompletionItemKind.Snippet },
          { label: '\\section', insertText: '\\section{${1:title}}', kind: monaco.languages.CompletionItemKind.Snippet },
          { label: '\\subsection', insertText: '\\subsection{${1:title}}', kind: monaco.languages.CompletionItemKind.Snippet },

          // Text formatting
          { label: '\\textbf', insertText: '\\textbf{${1:text}}', kind: monaco.languages.CompletionItemKind.Snippet },
          { label: '\\textit', insertText: '\\textit{${1:text}}', kind: monaco.languages.CompletionItemKind.Snippet },
          { label: '\\underline', insertText: '\\underline{${1:text}}', kind: monaco.languages.CompletionItemKind.Snippet },

          // Lists
          { label: '\\item', insertText: '\\item ${1:text}', kind: monaco.languages.CompletionItemKind.Snippet },
          { label: 'itemize', insertText: '\\begin{itemize}\n\t\\item ${1:item}\n\\end{itemize}', kind: monaco.languages.CompletionItemKind.Snippet },
          { label: 'enumerate', insertText: '\\begin{enumerate}\n\t\\item ${1:item}\n\\end{enumerate}', kind: monaco.languages.CompletionItemKind.Snippet },

          // ModernCV specific
          { label: '\\cventry', insertText: '\\cventry{${1:years}}{${2:job title}}{${3:employer}}{${4:city}}{}{${5:description}}', kind: monaco.languages.CompletionItemKind.Snippet },
          { label: '\\cvitem', insertText: '\\cvitem{${1:label}}{${2:description}}', kind: monaco.languages.CompletionItemKind.Snippet },
          { label: '\\name', insertText: '\\name{${1:first}}{${2:last}}', kind: monaco.languages.CompletionItemKind.Snippet },
          { label: '\\title', insertText: '\\title{${1:title}}', kind: monaco.languages.CompletionItemKind.Snippet },
          { label: '\\email', insertText: '\\email{${1:email}}', kind: monaco.languages.CompletionItemKind.Snippet },
          { label: '\\phone', insertText: '\\phone[mobile]{${1:number}}', kind: monaco.languages.CompletionItemKind.Snippet },
          { label: '\\social', insertText: '\\social[${1:platform}]{${2:username}}', kind: monaco.languages.CompletionItemKind.Snippet },
        ].map(item => ({
          ...item,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: {
            startLineNumber: position.lineNumber,
            startColumn: position.column,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          },
        }));

        return { suggestions };
      },
    });

    // Keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      onSave?.();
    });
  }, [onSave]);

  const handleChange: OnChange = useCallback((value) => {
    onChange(value || '');
  }, [onChange]);

  return (
    <Editor
      height={height}
      language="latex"
      value={value}
      onChange={handleChange}
      onMount={handleEditorMount}
      options={{
        readOnly,
        minimap: { enabled: false },
        fontSize: 14,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        lineNumbers: 'on',
        wordWrap: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        bracketPairColorization: { enabled: true },
        guides: { indentation: true },
        renderLineHighlight: 'line',
        quickSuggestions: true,
        suggestOnTriggerCharacters: true,
      }}
      theme="vs-dark"
    />
  );
}

export default LaTeXEditor;
