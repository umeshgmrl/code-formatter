import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { format } from 'prettier/standalone';
import * as prettierPluginBabel from 'prettier/plugins/babel';
import * as prettierPluginEstree from 'prettier/plugins/estree';
import * as prettierPluginHtml from 'prettier/plugins/html';
import * as prettierPluginPostcss from 'prettier/plugins/postcss';
import { Code2, Copy, Settings, Check } from 'lucide-react';

type Language = 'javascript' | 'html' | 'css' | 'json' | 'typescript' | 'jsx';

function App() {
  const [code, setCode] = useState('// Enter your code here');
  const [language, setLanguage] = useState<Language>('javascript');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatCode = async () => {
    try {
      setError(null);
      const parser = {
        javascript: 'babel',
        typescript: 'babel-ts',
        html: 'html',
        css: 'css',
        json: 'json',
        jsx: 'babel'
      }[language];

      const plugins = [
        prettierPluginBabel,
        prettierPluginEstree,
        prettierPluginHtml,
        prettierPluginPostcss
      ];

      const formatted = await format(code, {
        parser,
        plugins,
        semi: true,
        singleQuote: true
      });

      setCode(formatted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="border-b border-slate-700 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-blue-400" />
            <h1 className="text-xl font-bold">Code Formatter</h1>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="rounded-lg bg-slate-800 px-3 py-1 text-sm"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="jsx">JSX</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="json">JSON</option>
            </select>
            <button
              onClick={formatCode}
              className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-1 text-sm font-medium hover:bg-blue-600"
            >
              <Settings className="h-4 w-4" />
              Format
            </button>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-1 text-sm font-medium hover:bg-slate-600"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}
        <div className="rounded-lg border border-slate-700 bg-slate-800">
          <Editor
            height="70vh"
            defaultLanguage="javascript"
            language={language === 'jsx' ? 'javascript' : language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              padding: { top: 16 },
            }}
          />
        </div>
      </main>
    </div>
  );
}

export default App;